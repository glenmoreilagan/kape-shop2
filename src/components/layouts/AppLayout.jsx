'use client'
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// components
// import SideNav from './navigation/sideNav'
import HeadNav from '@/components/layouts/navigation/HeadNav'
import UserNotLogged from '../UserNotLogged'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

import useUserStore from '@/store/useUserStore'

// https://stackoverflow.com/questions/64622494/usepreventscroll-causes-uselayouteffect-warning-in-nextjs
const SideNav = dynamic(() => import('./navigation/SideNav'), { ssr: false })

import { usersAPI } from '@/api/users'

import { Toaster } from '@/components/ui/sonner'

export default function AppLayout({ children }) {
  const { isLoading, error, data: users } = usersAPI()
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  const router = useRouter()

  // if (error) return <UserNotLogged/>

  useEffect(() => {
    // const id = new Promise((resole))
    // if (!user) {
    //   router.push('/')
    //   return
    // }
  }, [user])

  return (
    <>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <SideNav />
        </div>
        <div className='_content bg-[#FAFAFA]' style={{ width: '100%' }}>
          <HeadNav />
          <div className='p-5'>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <div className=''>{children}</div>
            </LocalizationProvider>
          </div>
        </div>
      </div>
      <Toaster position='top-right' richColors />
    </>
  )
}
