'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// components
import AppLayout from '@/components/layouts/appLayout'
import ProductTable from './productTable'
import BreadcrumbsComponent from '@/components/reusable/breadcrumbs'

import { Button } from '@mui/material'
import { MdOutlineAdd, MdOutlineHome } from 'react-icons/md'

export default function IndexProducts() {
  const router = useRouter()

  return (
    <>
      <AppLayout>
        <div className='flex justify-between items-center bg-white p-3 mb-3'>
          <div>
            <BreadcrumbsComponent>
              <span className='text-sm'>Products</span>
            </BreadcrumbsComponent>
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
