import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function IfElseSettings({selectedNode,updateFormData}:any) {
    const [formData,setFormData]=useState({ifCondition:''})
        useEffect(()=>{
            selectedNode && setFormData(selectedNode?.data.settings ?? '')
        },[selectedNode])
  return (
    <div>
      <h2 className="font-bold">If / Else</h2>
      <p className="text-gray-400 mt-1">Create Condition to branch your workflow</p>
      <div className="mt-3">
        <Label>If</Label>
        <Input placeholder="Enter Condition e.g output==`any condition`" value={formData?.ifCondition} className="mt-2" 
        onChange={(e)=>setFormData({ifCondition:e.target.value})}/>
      </div>

      <Button className="w-full mt-5" onClick={()=>{updateFormData(formData);toast.success('Saved!')}}>Save</Button>
    </div>
  );
}

export default IfElseSettings;
