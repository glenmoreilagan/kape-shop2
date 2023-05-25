'use client'
import React from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

import { MdOutlineDashboard, MdOutlineProductionQuantityLimits, MdOutlineAddchart } from 'react-icons/md'

export default function SideNav() {
  const router = useRouter()
  const pathname = usePathname()

  const navs = [
    { path: '/dashboard', label: 'Dashboard', icon: <MdOutlineDashboard className="text-[#865A31] text-xl" /> },
    {
      path: '/products',
      label: 'Products',
      icon: <MdOutlineProductionQuantityLimits className="text-[#865A31] text-xl" />,
    },
    { path: '/sales', label: 'Sales', icon: <MdOutlineAddchart className="text-[#865A31] text-xl" /> },
  ]

  return (
    <>
      <Sidebar backgroundColor="#FAFAFA">
        <Menu>
          {navs.map((nav, i) => {
            return (
              <MenuItem
                key={i}
                icon={nav.icon}
                component={<Link href={nav.path}></Link>}
                className={pathname == nav.path ? 'bg-gray-100' : ''}
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
