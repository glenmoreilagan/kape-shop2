'use client'
import React from 'react'
import Hero from '@/components/home/Hero'
import OurServices from '@/components/home/OurServices'
import TopSeller from '@/components/home/TopSeller'
import NavBar from '@/components/NavBar'
import Products from '@/components/home/Products'

export default function HomePage() {
  return (
    <>
      <NavBar />
      <Hero />
      {/* <OurServices /> */}
      <Products />
    </>
  )
}
