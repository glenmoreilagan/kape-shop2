'use client'
import React, { useEffect, useState } from 'react'

// components
import AppLayout from '@/components/layouts/AppLayout'
import BreadcrumbsComponent from '@/components/reusable/Breadcrumbs'
import Loader from '@/components/reusable/Loader'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import { MdOutlineShoppingCart } from 'react-icons/md'

import { productAPI } from '@/hooks/products'
import { categoryAPI } from '@/hooks/categories'

// store
import useCartStore from '@/store/useCartStore'
import ProductDisplay from '@/components/pos/ProductDisplay'
import CartDisplay from '@/components/pos/CartDisplay'

const ITEM_HEIGHT = 60
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
]

export default function IndexSales() {
  const { isLoading, error, data: products } = productAPI({ search: '', offset: 0, limit: 0 })
  const {
    isLoading: categoryIsLoading,
    error: categoryError,
    data: categories,
  } = categoryAPI({ search: '', offset: 0, limit: 0 })

  const { removeToCart, cartCount } = useCartStore((state) => state)
  const [openCart, setOpenCart] = useState(false)

  const handleRemoveToCart = async (product) => {
    removeToCart(product)
  }

  // if (error) return <h1>Error...</h1>
  // if (isLoading) return <h1>Loading...</h1>

  return (
    <AppLayout>
      <div className='flex justify-between items-center bg-white p-3 mb-3 sticky top-0 z-10'>
        <div className=''>
          <h1 className='scroll-m-20 text-xl font-semibold tracking-tight'>Products</h1>
        </div>
        <div>
          <Button size='sm' className='relative' onClick={() => setOpenCart(true)}>
            <MdOutlineShoppingCart className='mr-2 h-4 w-4' /> View Cart
            <Badge variant='destructive' className='absolute top-[-.5rem] right-[-.5rem] px-1 text-[.75rem]'>
              {cartCount()}
            </Badge>
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-8 gap-3 mb-3'>
        {/* {categories?.data.map((item) => (
          <div className='bg-white shadow rounded-md p-6 min-w-[6rem]'>
            <p className='uppercase font-medium text-xs text-center'>{item.category}</p>
          </div>
        ))} */}

          <button className='uppercase font-medium text-xs text-center bg-white hover:bg-gray-100 shadow rounded-md p-6 min-w-[6rem]'>Choose Categories</button>
      </div>
      <section className='bg-white p-3'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 place-items-center gap-3'>
          <ProductDisplay products={products?.data} />
        </div>
      </section>

      <CartDisplay open={openCart} setOpen={setOpenCart} />
      <Loader isLoading={isLoading} />
    </AppLayout>
  )
}
