'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

import themes from '@/configs/themes'
// import { AuthConfig } from '@/lib/auth'

import { Button } from '@/components/ui/button'
// import { AuthConfig } from '@/auth';

import useUserStore from '@/store/useUserStore'

function NavBar({ path }) {
  const router = useRouter()
  const pathname = usePathname()
  const user = useUserStore((state) => state.user)

  // useEffect(() => {
  //   console.log(user)
  // }, [user])

  const navLinks = [
    {
      path: '/',
      label: 'Home',
    },
    {
      path: '#products',
      label: 'Products',
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
      <div className='hidden md:block bg-white shadow-sm sticky top-0 z-50'>
        <nav className={`flex justify-evenly px-3 items-center max-w-7xl mx-auto default-nav-height`}>
          <div className='flex-1'>
            <h1 className='font-extrabold text-[#616161]'>KAPE-SHOP</h1>
          </div>
          <div className='flex justify-around items-center gap-3 text-[#191919]'>
            {path === 'login' ? (
              <div>
                <Link href={navLinks[0].path} className='text-sm hover:text-primary/90'>
                  Back To Home Page
                </Link>
              </div>
            ) : (
              navLinks.map((nav) => {
                return (
                  <div key={nav.label}>
                    <Link href={nav.path} className='text-sm hover:text-primary/90'>
                      {nav.label}
                    </Link>
                  </div>
                )
              })
            )}

            {!user ? (
              <Button
                className={`${pathname === '/login' ? 'invisible' : 'visible'}`}
                onClick={() => router.replace('/login')}
                // variant='contained'
                // size='small'
              >
                Login
              </Button>
            ) : (
              <Link href='/dashboard' className='text-sm text-[#333333] font-semibold'>
                Dashboard
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  )
}

export default NavBar
