'use client'
import React, { useState } from 'react'

import Carousel from './Carousel'

const TopSeller = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <section id="top-seller" className="h-screen flex justify-center bg-[#FAFAFA]">
        <div className="w-11/12 min:h-72 px-5">
          <div className="mt-14 mb-14">
            <h1 className="text-2xl font-semibold">Best Seller</h1>
          </div>
          <div className="flex gap-3">
            <Carousel />
          </div>
        </div>
      </section>
    </>
  )
}

export default TopSeller
