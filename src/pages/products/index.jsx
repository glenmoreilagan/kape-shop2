'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// components
import AppLayout from '@/components/layouts/AppLayout'
import ProductTable from '../../components/products/ProductTable'
import BreadcrumbsComponent from '@/components/reusable/Breadcrumbs'

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
              className='bg-primary-gray'
              size='small'
              variant='contained'
              startIcon={<MdOutlineAdd />}
            >
              New Product
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
