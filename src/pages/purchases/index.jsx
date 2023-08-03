'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// components
import AppLayout from '@/components/layouts/AppLayout'
import BreadcrumbsComponent from '@/components/reusable/Breadcrumbs'
import ProductTable from '@/components/products/ProductTable'

import { Button } from '@mui/material'
import { MdOutlineAdd, MdOutlineHome } from 'react-icons/md'


export default function IndexPurhcase() {
  const router = useRouter()

  return (
    <>
      <AppLayout>
        <div className='flex justify-between items-center bg-white p-3 mb-3'>
          <div>
            <BreadcrumbsComponent>
              <span className='text-sm'>Purchases</span>
            </BreadcrumbsComponent>
          </div>
          <div>
            <Button
              onClick={() => router.push('/purchases/new')}
              className='bg-primary-gray'
              size='small'
              variant='contained'
              startIcon={<MdOutlineAdd />}
            >
              New Purchase
            </Button>
          </div>
        </div>

        <div className='p-3 bg-white'>
          {/* <ProductTable /> */}
        </div>
      </AppLayout>
    </>
  )
}
