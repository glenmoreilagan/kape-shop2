'use client'
import React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import SideNav from './navigation/sideNav'
import HeadNav from './navigation/headNav'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

export default function AppLayout({ children }) {
  const router = useRouter()

  // console.log('AppLayout')

  return (
    <>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <SideNav />
        </div>
        <div className="_content bg-[#FAFAFA]" style={{ width: '100%' }}>
          <HeadNav />
          <div className="p-5">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <div className="">{children}</div>
            </LocalizationProvider>
          </div>
        </div>
      </div>
    </>
  )
}
