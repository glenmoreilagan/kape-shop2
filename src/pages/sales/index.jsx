import React from 'react'

import { Button } from '@/components/ui/button'
import { BiPlus } from 'react-icons/bi'

import AppLayout from '@/components/layouts/AppLayout'
import SalesTable from '@/components/sales/SalesTable'

export default function IndexSales() {
  return (
    <AppLayout>
      <div className='flex justify-between items-center bg-white p-3 mb-3 rounded-md'>
        <div>
          <h1 className='scroll-m-20 text-xl font-semibold tracking-tight'>Sales</h1>
        </div>
        <div>
          <Button size='sm' onClick={() => router.push('/purchases/new')}>
            <BiPlus className='mr-2 h-4 w-4' /> New
          </Button>
        </div>
      </div>

      <div className='p-3 bg-white rounded-md'>
        <SalesTable />
      </div>
    </AppLayout>
  )
}
