'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// components
import AppLayout from '@/components/layouts/AppLayout'
import ProductTable from '../../components/products/ProductTable'
import BreadcrumbsComponent from '@/components/reusable/Breadcrumbs'

import { BiPlus } from 'react-icons/bi'
import { Button } from '@/components/ui/button'

// API's
import { productAPI } from '@/api/products'

export default function IndexProducts() {
  const router = useRouter()

  const { isLoading, error, data: products } = productAPI()

  return (
    <>
      <AppLayout>
        <div className='flex justify-between items-center bg-white p-3 mb-3 rounded-md'>
          <div>
            <h1 className='scroll-m-20 text-xl font-semibold tracking-tight'>Products</h1>
          </div>
          <div>
            <Button size='sm' onClick={() => router.push('/products/new')}>
              <BiPlus className='mr-2 h-4 w-4' /> New
            </Button>
          </div>
        </div>

        <div className='p-3 bg-white rounded-md'>
          <ProductTable products={products} />
        </div>
      </AppLayout>
    </>
  )
}
