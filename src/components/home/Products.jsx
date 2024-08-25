'use client'
import React, { useEffect, useState } from 'react'

import Carousel from './Carousel'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import ViewProductCard from './ViewProductCard'

const Products = () => {
  const [expanded, setExpanded] = useState(false)
  const [filter, setFilter] = useState('hot')

  const [products, setProducts] = useState(null)
  const [loading, setIsLoading] = useState(false)

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`https://api.sampleapis.com/coffee/${filter}`)
      if (response.data?.message) {
        throw response.data?.message
      }
      setProducts(response.data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      throw error
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [filter])

  return (
    <>
      <section id='products' className='bg-[#F0EEED]'>
        <div className='max-w-7xl mx-auto px-3 py-10'>
          <div className='mb-14 flex justify-between'>
            <h1 className='text-2xl font-semibold text-default-foreground'>Products</h1>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline'>Filter</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                  {/* <DropdownMenuLabel>Filter by type of drink</DropdownMenuLabel> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
                    <DropdownMenuRadioItem value='hot'>Hot</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='iced'>Iced</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {loading ? <h1>Loading...</h1> : <Carousel items={products?.slice(0, 10)} />}
          </div>
        </div>
        <ViewProductCard />
      </section>
    </>
  )
}

export default Products
