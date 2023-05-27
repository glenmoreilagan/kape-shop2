'use client'
import React from 'react'
import AppLayout from '@/components/layouts/appLayout'
import { Button } from '@mui/material'

import { MdOutlineAdd } from 'react-icons/md'
import ProductTable from './productTable'
import { useRouter } from 'next/navigation'

export default function IndexProducts() {
  const router = useRouter()

  return (
    <>
      <AppLayout>
        <div className='flex justify-between items-center bg-white p-3 mb-3'>
          <div>
            <h1 className='font-semibold'>Products</h1>
          </div>
          <div>
            <Button
              onClick={() => router.push('/products/new')}
              className='font-bold'
              size='small'
              variant='contained'
              startIcon={<MdOutlineAdd />}
            >
              Add Product
            </Button>
          </div>
        </div>

        <div className='p-3 bg-white'>
          <ProductTable />
        </div>
      </AppLayout>
    </>
  )
}
