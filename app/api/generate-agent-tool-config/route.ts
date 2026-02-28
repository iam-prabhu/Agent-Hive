// import { NextRequest, NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const PROMPT = `
Generate ONLY valid JSON using this structure:
{
  systemPrompt: "Overall systemic instructions here",
  primaryAgentName: "Name of the first agent",
  agents: [{
    id: "agent id",
    name: "agent name",
    model: "model name (extract from the agent's settings if available, e.g., gemini-1.5-flash)",
    includeHistory: true|false,
    output: "text|json|etc",
    tools: ["tool ids"],
    instruction: "Write a detailed, comprehensive prompt/instruction for this specific agent explaining its persona, role, and what it needs to accomplish based on the workflow context."
  }],
  tools: [{ id: "tool id", name: "tool name", description: "description", method: "GET|POST", url: "url", includeApiKey: true|false, apiKey: "key", parameters: {}, usage: [], assignedAgent: "agent id" }]
}

IMPORTANT Instructions:
1. For each agent, populate the "instruction" field with a highly detailed, descriptive system prompt explaining exactly what its role is, what it needs to do, and how it should behave. DO NOT just write the model name.
2. For each agent, populate the "model" field using the correct model string from its configuration settings (e.g., "gemini-1.5-flash"). DO NOT use "AgentNode".
3. The tools array should contain the definitions of the tools assigned to the agent.
4. No explanations. JSON only.
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const jsonConfig = body?.jsonConfig;

    if (!jsonConfig) {
      return NextResponse.json(
        { error: "Missing workflow config" },
        { status: 400 },

      );
    }

    const HF_KEY = process.env.HUGGINGFACE_API_KEY;
    if (!HF_KEY) {
      return NextResponse.json(
        { error: "Missing HuggingFace API key" },
        { status: 500 },
      );
    }

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/Meta-Llama-3-8B-Instruct",
          messages: [
            {
              role: "system",
              content: "You are a JSON generator.",
            },
            {
              role: "user",
              content: `Workflow:\n${JSON.stringify(jsonConfig)}\n\n${PROMPT}`,
            },
          ],
          temperature: 0.2,
          max_tokens: 1500,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText },
        { status: response.status },
      );
    }

    const data = await response.json();

    // Check for text response
    const text =
      data.choices?.[0]?.message?.content || data.choices?.[0]?.text || "";

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsedJson;
    try {
      parsedJson = JSON.parse(cleaned);
    } catch (err) {
      console.error("Router JSON parse failed:", cleaned);
      return NextResponse.json(
        { error: "Failed to parse JSON from model", details: cleaned },
        { status: 500 },
      );
    }

    return NextResponse.json(parsedJson);
  } catch (error: any) {
    console.error("Router API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
