'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

import themes from '@/configs/themes'
// import { AuthConfig } from '@/lib/auth'

import { Button } from '@/components/ui/button'
import { BiMenu, BiX } from 'react-icons/bi'

// import { AuthConfig } from '@/auth';

import useUserStore from '@/store/useUserStore'

import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'

function NavBar({ path }) {
  const router = useRouter()
  const pathname = usePathname()
  // const user = useUserStore((state) => state.user)

  const [burgerIconOpen, setBurgerIconOpen] = useState(false)

  const { isSignedIn, user, isLoaded } = useUser()

  // useEffect(() => {
  //   console.log(user)
  // }, [user])

  const navLinks = [
    {
      path: '/',
      label: 'Home',
    },
    {
      path: '/#products',
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

  const handlenavBurgerIcon = () => {
    setBurgerIconOpen((prev) => !prev)
  }

  return (
    <>
      <div className='bg-white shadow-sm sticky top-0 z-50'>
        <nav className={`hidden md:flex justify-evenly px-3 items-center max-w-7xl mx-auto default-nav-height`}>
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
              // <Button
              //   className={`${pathname === '/login' ? 'invisible' : 'visible'}`}
              //   onClick={() => router.replace('/login')}
              //   // variant='contained'
              //   // size='small'
              // >
              //   Login
              // </Button>

              <>
                <SignedOut>
                  <SignInButton />
                </SignedOut>
              </>
            ) : (
              <>
                <Link href='/dashboard' className='text-sm text-primary font-semibold'>
                  Go To Dashboard
                </Link>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </>
            )}
          </div>
        </nav>

        <nav className='p-6 md:hidden relative'>
          <div className='flex justify-between '>
            <div>
              <span className='font-extrabold text-[#616161]'>KAPE=SHOP</span>
            </div>
            <div>
              <button onClick={handlenavBurgerIcon}>{burgerIconOpen ? <BiX size={28} /> : <BiMenu size={28} />}</button>
            </div>
          </div>
          {burgerIconOpen && (
            <div className='absolute w-full bg-white left-0 px-6 py-6'>
              <ul className='space-y-3'>
                {path === 'login' ? (
                  <li>
                    <Link href={navLinks[0].path} className='text-sm hover:text-primary/90'>
                      Back To Home Page
                    </Link>
                  </li>
                ) : (
                  navLinks.map((nav) => {
                    return (
                      <li key={nav.label}>
                        <Link href={nav.path} className='text-sm hover:text-primary/90'>
                          {nav.label}
                        </Link>
                      </li>
                    )
                  })
                )}

                {!user ? (
                  <li>
                    {' '}
                    <Button
                      className={`${pathname === '/login' ? 'invisible' : 'visible'} w-full`}
                      onClick={() => router.replace('/login')}
                      // variant='contained'
                      // size='small'
                    >
                      Login
                    </Button>
                  </li>
                ) : (
                  <li>
                    <Link href='/dashboard' className='text-sm text-primary font-semibold'>
                      Go To Dashboard
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </nav>
      </div>
    </>
  )
}

export default NavBar
