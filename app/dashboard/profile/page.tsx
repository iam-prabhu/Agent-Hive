import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function Profile() {
  return (
    <div className='p-5'>
      <h2 className='font-bold text-2xl '>

        <UserProfile routing="hash" />
      </h2>
    </div>
  )
}

export default Profile