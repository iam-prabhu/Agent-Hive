import { Input } from '@/components/ui/input'
import { Handle, Position } from '@xyflow/react'
import { Merge } from 'lucide-react'
import React from 'react'


const handleStyle = { top: 110 }

function IfElseNode({ data }: any) {

  return (
    <div className='bg-white rounded-2xl p-2 px-3 border'>
      <div className='flex gap-2'>
        <Merge className='p-2 rounded-lg h-8 w-8' style={{ backgroundColor: data?.bgColor }} />
        <h2>If/Else</h2>
      </div>
      <div className='max-w-[140px] flex flex-col gap-2 mt-2'>
        <Input placeholder='If Condition' className='text-sm bg-white' disabled />
        <Input placeholder='Else Condition' className='text-sm bg-white' disabled />
      </div>
      <Handle type='target' position={Position.Left} />
      <Handle type='source' position={Position.Right} id={'if'} />
      <Handle type='source' position={Position.Right} id={'else'}
        style={handleStyle} />
    </div>
  )
}

export default IfElseNode