import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Hero from '@/components/home/Hero'
import NavBar from '@/components/NavBar'
import Products from '@/components/home/Products'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <NavBar />
      <Hero />
      <Products />
    </>
  )
}
