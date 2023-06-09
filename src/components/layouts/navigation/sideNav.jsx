'use client'
import React from 'react'
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

import { MdOutlineDashboard, MdOutlineProductionQuantityLimits, MdOutlineAddchart } from 'react-icons/md'

export default function SideNav() {
  const { collapsed } = useProSidebar()
  const router = useRouter()
  const pathname = usePathname()

  const navs = [
    { path: '/dashboard', label: 'Dashboard', icon: <MdOutlineDashboard className='text-xl' /> },
    {
      path: '/products',
      label: 'Products',
      icon: <MdOutlineProductionQuantityLimits className='text-xl' />,
    },
    { path: '/sales', label: 'Sales', icon: <MdOutlineAddchart className='text-xl' /> },
  ]

  return (
    <>
      <Sidebar backgroundColor='#FAFAFA'>
        <div className='flex justify-center items-center'>
          <img
            src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/applogo/${!collapsed ? 'logo.png' : 'favicon.png'}`}
            alt='App Logo'
            className={!collapsed ? 'w-full h-40' : ''}
          />
          {/* <h1 className='text-2xl font-bold text-[#333333]'>KAPE SHOP</h1> */}
        </div>
        <Menu>
          {navs.map((nav, i) => {
            return (
              <MenuItem
                key={i}
                icon={nav.icon}
                component={<Link href={nav.path}></Link>}
                className={`${pathname == nav.path ? 'bg-gray-100' : ''} text-[#333333]`}
              >
                {' '}
                {nav.label}
              </MenuItem>
            )
          })}
        </Menu>
      </Sidebar>
    </>
  )
}
