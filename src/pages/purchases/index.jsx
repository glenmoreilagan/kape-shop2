'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// components
import AppLayout from '@/components/layouts/AppLayout'
import BreadcrumbsComponent from '@/components/reusable/Breadcrumbs'
import PurchaseTable from '@/components/purchases/PurchaseTable'
import Loader from '@/components/reusable/Loader'

import { BiPlus } from 'react-icons/bi'
import { Button } from '@/components/ui/button'

import { purchaseAPI } from '@/components/hooks/purchases'

export default function IndexPurhcase() {
  const router = useRouter()
  const { isLoading, error, data: purchases } = purchaseAPI()

  return (
    <>
      <AppLayout>
        <div className='flex justify-between items-center bg-white p-3 mb-3 rounded-md'>
          <div>
            <h1 className='scroll-m-20 text-xl font-semibold tracking-tight'>Purchases</h1>
          </div>
          <div>
            <Button size='sm' onClick={() => router.push('/purchases/new')}>
              <BiPlus className='mr-2 h-4 w-4' /> New
            </Button>
          </div>
        </div>

        <div className='p-3 bg-white rounded-md'>
          <PurchaseTable purchases={purchases} />
        </div>
      </AppLayout>

      <Loader isLoading={isLoading} />
    </>
  )
}
