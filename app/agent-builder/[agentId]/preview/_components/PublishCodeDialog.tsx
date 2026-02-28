import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CodeBlock, CodeBlockCopyButton } from '@/components/ai/code-block';


type Props = {
    openDialog: boolean,
    setOpenDialog: (open: boolean) => void;
}

function PublishCodeDialog({ openDialog, setOpenDialog }: Props) {
    const code = `const res = await fetch('https:/agent-hive.com/api/agent-chat', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                agentId:<agentId>,
                userId:<userId>,
                userInput:<userInput>
                
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
                console.log(decoder.decode(value));
                const chunk = decoder.decode(value);
                //Process Chunk...
            }
        } `
    
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>

            <DialogContent className='min-w-3xl'>
                <DialogHeader>
                    <DialogTitle>Get Code?</DialogTitle>
                    <DialogDescription>
                        <CodeBlock code={code} language="jsx">
                            <CodeBlockCopyButton
                                onCopy={() => console.log("Copied code to clipboard")}
                                onError={() => console.error("Failed to copy code to clipboard")}
                            />
                        </CodeBlock>

                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default PublishCodeDialog