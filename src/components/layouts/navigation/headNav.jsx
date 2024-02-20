'use client'
import React, { useState, useEffect } from 'react'
import { useProSidebar } from 'react-pro-sidebar'
import { useRouter } from 'next/router'

import { BiUser, BiMenuAltLeft } from 'react-icons/bi'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import useUserStore from '@/store/useUserStore'

import { logout } from '@/api/auth'

export default function HeadNav() {
  const { collapseSidebar } = useProSidebar()
  const router = useRouter()
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(false)
  }

  const handleProfile = () => {
    alert('Profile')
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    await logout()
    setAnchorEl(null)
  }

  return (
    <>
      <div className='bg-white shadow-sm'>
        <div
          style={{
            height: '4em',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '98%',
            margin: 'auto',
          }}
        >
          <div>
            <Button
              variant='ghost'
              size='icon'
              className='text-[#333333] text-xl cursor-pointer'
              onClick={() => collapseSidebar()}
            >
              <BiMenuAltLeft />
            </Button>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon'>
                  {/* {user?.name} */}
                  <BiUser />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56'>
                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                {/* <DropdownMenuSeparator /> */}
                {/* <DropdownMenuItem disabled>API</DropdownMenuItem> */}
                <DropdownMenuItem onClick={handleProfile}>Profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  )
}
