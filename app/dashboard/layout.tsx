import React from 'react'
import DashboardProvider from './provider'

const DashboardLayout = ({ children }: any) => {
    return (

        <div><DashboardProvider>
            {children}
        </DashboardProvider></div>
        
        
    )
}

export default DashboardLayout