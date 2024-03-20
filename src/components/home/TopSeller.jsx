'use client'
import React, { useEffect, useState } from 'react'

import Carousel from './Carousel'
import axios from 'axios'

const TopSeller = () => {
  const [expanded, setExpanded] = useState(false)

  const [products, setProducts] = useState(null)

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://api.sampleapis.com/coffee/hot')
      setProducts(response.data)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
      <section id='top-seller' className='flex justify-center bg-[#FAFAFA]'>
        <div className='max-w-7xl mx-auto px-3'>
          <div className='mt-14 mb-14'>
            <h1 className='text-2xl font-semibold'>Best Seller</h1>
          </div>
          <div className='grid grid-cols-5 gap-3'>
            <Carousel items={products} />
          </div>
        </div>
      </section>
    </>
  )
}

export default TopSeller
