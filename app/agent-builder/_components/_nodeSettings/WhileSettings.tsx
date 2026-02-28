import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function WhileSettings({selectedNode,updateFormData}:any) {
    const [formData,setFormData]=useState({whileCondition:''})
        useEffect(()=>{
            selectedNode && setFormData(selectedNode?.data.settings)
        },[selectedNode])
  return (
    <div>
      <h2 className="font-bold">While</h2>
      <p className="text-gray-400 mt-1">Loop your Logic</p>
      <div className="mt-3">
        <Label>While</Label>
        <Input placeholder="Enter Condition e.g output==`any condition`" value={formData?.whileCondition} className="mt-2" 
        onChange={(e)=>setFormData({whileCondition:e.target.value})}/>
      </div>

      <Button className="w-full mt-5" onClick={()=>{updateFormData(formData);toast.success('Saved!')}}>Save</Button>
    </div>
  );
}

export default WhileSettings;
