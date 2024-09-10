'use client'
import React, { useState, useEffect } from 'react'
import { useProSidebar } from 'react-pro-sidebar'
import { useRouter } from 'next/router'

import { BiUser, BiMenuAltLeft, BiBell } from 'react-icons/bi'

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

// import { logout } from '@/hooks/auth'

import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import useEcho from '@/hooks/echo'
import UnReadNotification from '@/hooks/un-read-notification'

export default function HeadNav() {
  const { collapseSidebar } = useProSidebar()
  const { isSignedIn, user, isLoaded } = useUser()

  const router = useRouter()

  const unReadNotif = UnReadNotification()

  // const user = useUserStore((state) => state.user)
  // const setUser = useUserStore((state) => state.setUser)

  // const [anchorEl, setAnchorEl] = useState(null)
  // const open = Boolean(anchorEl)

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget)
  // }

  // const handleClose = () => {
  //   setAnchorEl(false)
  // }

  // const handleProfile = () => {
  //   alert('Profile')
  //   setAnchorEl(null)
  // }

  // const handleLogout = async () => {
  //   await logout()
  //   setAnchorEl(null)
  // }

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
            {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='icon'> */}
            {/* {user?.name} */}
            {/* <BiUser />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'> */}
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuItem disabled>API</DropdownMenuItem> */}
            {/* <DropdownMenuItem onClick={handleProfile}>Profile</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
            <div className='flex gap-2'>
              <div className='relative h-[2.75rem] w-[2.75rem] rounded-full bg-[#F3F3F3] hover:bg-gray-200 p-2 group'>
                <BiBell className='text-[#333333] w-full h-full group-hover:scale-110 transition-transform duration-500 ease-in-out' />
                <span className='absolute -top-[.5rem] -right-[.5rem] inline-flex items-center rounded-full bg-pink-600 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-pink-700/10'>
                  {unReadNotif > 99 ? '99+' : unReadNotif}
                </span>
              </div>
              <SignedIn className='h-24'>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
