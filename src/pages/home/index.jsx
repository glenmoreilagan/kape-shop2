'use client'
import React from 'react'
import Hero from '@/components/home/Hero'
import OurServices from '@/components/home/OurServices'
import TopSeller from '@/components/home/TopSeller'
import NavBar from '@/components/NavBar'
import Products from '@/components/home/Products'
import Footer from '@/components/Footer'

export default function HomePage() {
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
