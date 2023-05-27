'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

import themes from '@/configs/themes'
import { AuthConfig } from '@/lib/auth'

import { Button } from '@mui/material'
// import { AuthConfig } from '@/auth';

function NavBar() {
  const router = useRouter()
  const pathname = usePathname()
  const token = AuthConfig().token

  // if (!token) {
  //   return null;
  // }

  const navLinks = [
    {
      path: '/home',
      label: 'Home',
    },
    {
      path: '/home#services',
      label: 'Services',
    },
    {
      path: '/about',
      label: 'About',
    },
    {
      path: '/contact',
      label: 'Contact',
    },
  ]

  return (
    <>
      <div
        className="hidden md:flex justify-center bg-white shadow-sm sticky top-0 z-50" //backdrop-blur-lg
        style={{ height: themes.navHeight }}
      >
        <nav className={`flex justify-evenly px-5 items-center w-11/12`}>
          <div className="flex-1">
            <h1 className="font-extrabold text-[#616161]">KAPE-SHOP</h1>
          </div>
          <div className="flex justify-around items-center w-1/3 font-light text-[#B3B3B3]">
            {navLinks.map((nav) => {
              return (
                <div key={nav.label}>
                  <Link href={nav.path} className="text-sm hover:text-[#333333]">
                    {nav.label}
                  </Link>
                </div>
              )
            })}

            <Button
              className={`${pathname === '/login' ? 'invisible' : 'visible'}`}
              onClick={() => router.replace('/login')}
              variant="contained"
              style={{ backgroundColor: '#333333', color: '#fff' }}
              size="small"
            >
              Login
            </Button>
          </div>
        </nav>
      </div>
    </>
  )
}

export default NavBar
