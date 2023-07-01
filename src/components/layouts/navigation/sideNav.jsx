'use client'
import React from 'react'
import { Sidebar, Menu, SubMenu, MenuItem, useProSidebar } from 'react-pro-sidebar'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

import {
  MdOutlineDashboard,
  MdOutlineProductionQuantityLimits,
  MdOutlineAddchart,
  MdOutlineRemove,
  MdOutlineShoppingCart,
  MdWorkspacesOutline,
  MdOutlineBarChart,
  MdOutlineSell,
  MdOutlineManageAccounts,
  MdOutlineBrandingWatermark,
  MdOutlineCategory,
} from 'react-icons/md'

export default function SideNav() {
  const { collapsed } = useProSidebar()
  const router = useRouter()
  const pathname = usePathname()

  const navss = [
    { path: '/dashboard', label: 'Dashboard', icon: <MdOutlineBarChart className='text-xl' /> },
    {
      path: '',
      label: 'Categories',
      icon: <MdOutlineCategory className='text-xl' />,
      children: [{ path: '/categories', label: 'Categories', icon: <MdOutlineRemove className='text-sm' /> }],
    },
    {
      path: '',
      label: 'Brands',
      icon: <MdOutlineBrandingWatermark className='text-xl' />,
      children: [{ path: '/brands', label: 'Brands', icon: <MdOutlineRemove className='text-sm' /> }],
    },
    {
      path: '',
      label: 'Products',
      icon: <MdWorkspacesOutline className='text-xl' />,
      children: [
        { path: '/products', label: 'Products', icon: <MdOutlineRemove className='text-sm' /> },
        // {
        //   path: '/products/new',
        //   label: 'Add Product',
        //   icon: <MdOutlineRemove className='text-sm' />,
        // },
      ],
    },
    {
      path: '',
      label: 'Purchases',
      icon: <MdOutlineShoppingCart className='text-xl' />,
      children: [{ path: '/purchases', label: 'Purchases', icon: <MdOutlineRemove className='text-sm' /> }],
    },
    {
      path: '',
      label: 'Sales',
      icon: <MdOutlineSell className='text-xl' />,
      children: [{ path: '/sales', label: 'Sales', icon: <MdOutlineRemove className='text-sm' /> }],
    },
    {
      path: '',
      label: 'Users',
      icon: <MdOutlineManageAccounts className='text-xl' />,
      children: [{ path: '/users', label: 'Users', icon: <MdOutlineRemove className='text-sm' /> }],
    },
    {
      path: '',
      label: 'Settings',
      icon: <MdOutlineManageAccounts className='text-xl' />,
      children: [{ path: '/settings', label: 'Settings', icon: <MdOutlineRemove className='text-sm' /> }],
    },
  ]

  return (
    <>
      <Sidebar backgroundColor='#FAFAFA'>
        <div className='flex justify-center items-center'>
          <img
            src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/applogo/favicon.png`}
            alt='App Logo'
            className={`${!collapsed ? 'w-1/2 h-20' : ''} drop-shadow-xl`}
          />
        </div>
        <Menu
          menuItemStyles={{
            button: {
              [`&.${'ps-disabled'}`]: {},
              '&': {
                fontSize: '0.85em',
                // color: '#fff',
              },
            },
          }}
        >
          {navss.map((nav, i) => {
            return nav.hasOwnProperty('children') ? (
              <SubMenu
                key={i}
                icon={nav.icon}
                label={nav.label}
                className={`${
                  pathname === nav?.children?.filter((item) => item.path === pathname)[0]?.path ? 'bg-gray-100' : ''
                } text-[#333333]`}
                defaultOpen={
                  pathname === nav?.children?.filter((item) => item.path === pathname)[0]?.path ? true : false
                }
              >
                {nav.children.map((child, j) => {
                  return (
                    <MenuItem
                      key={j}
                      icon={child.icon}
                      component={<Link href={child.path}></Link>}
                      className={`${pathname === child.path ? 'bg-gray-100' : ''} text-[#333333]`}
                    >
                      {child.label}
                    </MenuItem>
                  )
                })}
              </SubMenu>
            ) : (
              <MenuItem
                key={i}
                icon={nav.icon}
                component={<Link href={nav.path}></Link>}
                className={`${pathname === nav.path ? 'bg-gray-100' : ''} text-[#333333]`}
              >
                {nav.label}
              </MenuItem>
            )
          })}
        </Menu>
      </Sidebar>
    </>
  )
}
