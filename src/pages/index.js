import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Hero from '@/components/home/Hero'
import NavBar from '@/components/NavBar'
import Products from '@/components/home/Products'
import Footer from '@/components/Footer'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <div style={{ minHeight: 'calc(100vh - var(--const-default-nav-height))' }}>
        <NavBar />
        <Hero />
        {/* <OurServices /> */}
        <Products />
      </div>

      <Footer />
    </>
  )
}
