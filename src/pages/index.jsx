import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Hero from '@/components/home/Hero'
import NavBar from '@/components/NavBar'
import Products from '@/components/home/Products'
import Footer from '@/components/Footer'

import Testimony from '@/components/Testimony'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <div style={{ minHeight: 'calc(100vh - var(--const-default-nav-height))' }}>
        <NavBar />
        <Hero />
        {/* <OurServices /> */}
        <Products />

        <div className='bg-[#FAFAFA] py-20'>
          <div className='max-w-7xl mx-auto px-3'>
            <div className='h-24'>
              <h1 className='uppercase font-bold text-2xl text-default-foreground text-center'>What clients say</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
              {Array.from({ length: 6 }).map((item, i) => (
                <Testimony key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
