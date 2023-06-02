'use client'
import AppLayout from '@/components/layouts/appLayout'
import React from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

// API's
import { productFindOneAPI } from '@/api/product'

export default function IndexEditProduct() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // process.env.NEXT_PUBLIC_API_URL
  const { data, isLoading, error } = productFindOneAPI(searchParams.get('id'))

  return (
    <AppLayout>
      {!isLoading && (
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/product/images/${data[0].productImage}`}
          alt={data[0].productName}
          className='w-full h-36'
        />
      )}
    </AppLayout>
  )
}
