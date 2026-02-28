import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import schema from '@/convex/schema'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function EndSettings({selectedNode,updateFormData}:any) {
    const [formData,setFormData]=useState({schema:''})
    useEffect(()=>{
        selectedNode && setFormData(selectedNode?.data.settings)
    },[selectedNode])
  return (
    <div>
        <h2 className="font-bold">End</h2>
        <p className="text-gray-400 mt-1">Choose the workflow Output</p>
        <div className='mt-2 space-y-2'>
            <Label>
                Output
            </Label>
            <Textarea placeholder='{name:string}' 
            value={formData?.schema}
            onChange={(e)=>setFormData({schema:e.target.value})}/>
        </div>
        <Button className='w-full mt-5' 
        onClick={()=>{updateFormData(formData);toast.success('Saved!')}}>Save</Button>
    </div>
  )
}

export default EndSettings