'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// components
// import SideNav from './navigation/sideNav'
import HeadNav from './navigation/headNav';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

// https://stackoverflow.com/questions/64622494/usepreventscroll-causes-uselayouteffect-warning-in-nextjs
const SideNav = dynamic(() => import('./navigation/sideNav'), { ssr: false });

export default function AppLayout({ children }) {
  const router = useRouter();

  // console.log('AppLayout')

  return (
    <>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ display: 'flex' }}>
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
    </>
  );
}
