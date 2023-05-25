import React from 'react'
import NavBar from '@/components/NavBar'
import themes from '@/configs/themes'

export default function layout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}
