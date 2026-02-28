import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { streamText, tool as createTool } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

// Create an OpenAI-compatible provider instance pointing to Hugging Face

export async function POST(req: NextRequest) {
  try {
    const hf = createOpenAI({
      baseURL: "https://router.huggingface.co/v1/",
      apiKey: process.env.HF_TOKEN || process.env.HUGGINGFACE_API_KEY,
    });
    const { input, tools, agents, conversationId, agentName } =
      await req.json();

    // Map all client tools to Vercel AI SDK tools
    const generatedTools: Record<string, any> = {};
    if (tools && Array.isArray(tools)) {
      tools.forEach((t: any) => {
        // Dynamically build zod object for parameters
        const paramSchema = z.object(
          Object.fromEntries(
            Object.entries(t.parameters || {}).map(([key, type]) => {
              if (type === "string") return [key, z.string()];
              if (type === "number") return [key, z.number()];
              return [key, z.any()];
            }),
          ),
        );

        generatedTools[t.name] = createTool({
          description: t.description,
          parameters: paramSchema,
          // @ts-ignore
          execute: async (params: Record<string, any>) => {
            // Replace placeholders in URL
            let url = t.url;
            for (const key in params) {
              url = url.replace(`{{${key}}}`, encodeURIComponent(params[key]));
            }
            if (t.includeApiKey && t.apikey) {
              url += url.includes("?")
                ? `&key=${t.apikey}`
                : `?key=${t.apikey}`;
            }
            // Make API request
            const response = await fetch(url);
            const data = await response.json();
            return data;
          },
        });
      });
    }

    // Combine all agent instructions into a single system prompt
    let systemPrompt = `You are an AI assistant orchestrator named ${agentName}.\n\n`;
    systemPrompt += `You determine which agent to use based on the user query and have access to the provided tools.\n`;

    if (agents && agents.length > 0) {
      systemPrompt += `\nYour capabilities incorporate the roles of the following sub-agents:\n`;
      agents.forEach((agent: any) => {
        systemPrompt += `- ${agent.name}:\n  Instructions: ${agent.instructions}\n\n`;
      });
      systemPrompt += `Act according to these instructions based on the user's intent to fulfill their request. Use the tools provided if needed.`;
    }

    // Call the model via Vercel AI SDK
    const result = streamText({
      // We use Llama 3.3 70B Instruct as it supports tool calling natively on Hugging Face API
      model: hf("meta-llama/Llama-3.3-70B-Instruct"),
      system: systemPrompt,
      prompt: input,
      tools:
        Object.keys(generatedTools).length > 0 ? generatedTools : undefined,
      // @ts-ignore
      maxSteps: 5, // allows the model to call tools in a loop automatically
    });

    // Return the response as a simple Text Stream to match existing ChatUi reader
    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error in agent-chat route API:", error);
    return NextResponse.json(
      { error: "An error occurred during chat processing" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  // We no longer use OpenAI conversations, so we generate a standard UUID
  const conversationId = crypto.randomUUID();
  return NextResponse.json(conversationId);
}
