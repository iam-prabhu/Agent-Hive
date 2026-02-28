import { Button } from "@/components/ui/button";
import { Agent } from "@/types/AgentType";
import { set } from "date-fns";
import { Loader2Icon, RefreshCcwIcon, Send } from "lucide-react";
import React, { useState } from "react";
import Markdown from 'react-markdown'


type Props = {
    GenerateAgentToolConfig: () => void,
    loading: boolean,
    agentDetail: Agent,
    conversationId: string | null
}

function ChatUi({ GenerateAgentToolConfig, loading, agentDetail, conversationId }: Props) {

    const [userInput, setUserInput] = useState<string>('');
    const [loadingMsg, setLoadingMsg] = useState(false);
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
    const OnSendMsg = async () => {
        setLoadingMsg(true)

        setMessages([...messages, { role: 'user', content: userInput }])
        setUserInput('')

        const res = await fetch(`/api/agent-chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                agentName: agentDetail?.name,
                agents: agentDetail?.config?.agents || [],
                tools: agentDetail?.config?.tools || [],
                conversationId: conversationId,
                input: userInput
            })
        })

        if (!res.body) return;
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let done = false;

        setMessages((prev) => [...prev, { role: 'assistant', content: '' }])
        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            if (value) {
                // console.log(decoder.decode(value));
                const chunk = decoder.decode(value);
                setMessages((prev) => {

                    const updated = [...prev];
                    updated[updated.length - 1] = { role: 'assistant', content: (updated[updated.length - 1].content || '') + chunk }
                    return updated;
                })
            }
        }
        setLoadingMsg(false)
    }

    return (
        <div className="flex flex-col h-[80vh] w-full">
            <div className="flex justify-between items-center border-b p-4 shrink-0">
                <h2>{agentDetail.name}</h2>
                <Button onClick={GenerateAgentToolConfig} disabled={loading}>
                    {" "}
                    <RefreshCcwIcon className={`${loading && "animate-spin"} mr-2 h-4 w-4`} /> Reboot
                    Agent
                </Button>{" "}
            </div>
            <div className="flex-1 flex flex-col min-h-0">
                {/* Message Section */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col">
                    {messages.map((msg, index) => (

                        <div key={index} className={`flex  p-2 rounded-lg max-w-[80%]
                            ${msg.role == 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'}`}>
                            {" "}
                            {/* <p className="text-sm break-words whitespace-pre-wrap">{msg.content} </p>{" "} */}
                            <div className="text-sm break-words whitespace-pre-wrap overflow-hidden">
                                <Markdown  >{msg.content}</Markdown>
                            </div>
                        </div>

                    ))}


                    {/* Loading state */}
                    {loadingMsg && <div className="flex justify-center items-center p-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-h-2 border-b-2 border-zinc-800"></div>{" "}
                        <span className="ml-2 text-zinc-800">
                            Thinking... Working on your request
                        </span>
                    </div>}
                </div>
                {/* Footer Input */}
                <div className="p-4 border-t flex items-center gap-2 shrink-0 bg-background">
                    <textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();   // prevent new line
                                if (!loadingMsg && userInput.trim().length) {
                                    OnSendMsg();
                                }
                            }
                        }}
                        placeholder="Type your message here..."
                        className="flex-1 resize-none border rounded-lg px-3 py-2 min-h-[44px] max-h-32 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        rows={1}
                    />
                    <Button onClick={OnSendMsg} disabled={loadingMsg || !userInput.trim().length} className="shrink-0">
                        {loadingMsg ? <Loader2Icon className="animate-spin h-4 w-4" /> : <Send className="h-4 w-4" />}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ChatUi;
