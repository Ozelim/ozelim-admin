import React from 'react'
import { Outlet } from 'react-router-dom'

export const Layout = ({sidebarSlot,  headerSlot, footerSlot}) => {
  return (
    <div className='grid grid-rows-[auto_1fr_auto] min-h-screen '>
      <div className='w-full h-full border-b'>
        {headerSlot}
      </div>
      <div className='grid md:grid-cols-[200px_auto] grid-cols-1'>
        <div className='border-r'>
          {sidebarSlot}
        </div>
        <div className='w-full h-full bg-zinc-50'>
          <Outlet/>
        </div>
      </div>
      <div className='w-full h-full border-t pt-5'>
        {footerSlot}
      </div>
    </div>
  )
}
