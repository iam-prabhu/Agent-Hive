import { PricingTable } from '@clerk/nextjs'
import React from 'react'

function Pricing() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
        <h2 className='my-10 text-center text-3xl font-bold'>Pricing Plans</h2>
      <PricingTable />
    </div>
  )
}

export default Pricing