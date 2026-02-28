'use client'

import { Button } from "@/components/ui/button";
import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useAuth } from "@clerk/nextjs";
import { id } from "date-fns/locale";
import { toast } from "sonner";

function CreateAgentSection() {
  const [openDialog, setOpenDialog] = useState(false)
  const CreateAgentMutation = useMutation(api.agent.CreateAgent)
  const [agentName, setAgentName] = useState<string>()
  const router = useRouter();
  const [loader, setLoader] = useState(false)
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { has } = useAuth();
  const isPaidUser = has && has({ plan: 'unlimited_plan' })

  const CreateAgent = async () => {
    if (!isPaidUser && userDetail && userDetail.remainingCredits <= 0) {
      toast.error("You have reached the limit of free agents. Please Upgrade your plan")
    }

    setLoader(true)
    const agentId = uuidv4();//generate unique agent id
    const result = await CreateAgentMutation({
      agentId: agentId,
      name: agentName ?? '',
      userId: userDetail?._id
    })
    console.log(result)
    setOpenDialog(false)
    setLoader(false)
    //Navigate to agent builder screen
    router.push('/agent-builder/' + agentId)
  }

  return (
    <div className="space-y-2 flex flex-col justify-center items-center mt-24">
      <h2 className="font-bold text-xl">Create AI Agent</h2>
      <p className="text-lg">
        Build a AI Agent workflow with custom logic and tools
      </p>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button size={"lg"} onClick={() => setOpenDialog(true)} >Create</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Agent Name</DialogTitle>
            <DialogDescription>
              <Input placeholder="Agent Name" onChange={(event) => setAgentName(event.target.value)} />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"ghost"}>Cancel</Button>
            </DialogClose>

            <Button onClick={() => CreateAgent()} disabled={loader}>
              {loader && <Loader2Icon className="animate-spin" />}Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateAgentSection;
