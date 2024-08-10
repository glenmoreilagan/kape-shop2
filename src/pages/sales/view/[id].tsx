import React from 'react'

import { useRouter } from 'next/router'
import AppLayout from '@/components/layouts/AppLayout'

export default function ViewSalesPage() {
  const router = useRouter()

  const id = router.query.id

  return (
    <AppLayout>
      <div className='flex justify-between items-center bg-white p-3 mb-3 rounded-md'>
        <div>
          <h1 className='scroll-m-20 text-xl font-semibold tracking-tight'>Sales</h1>
        </div>
      </div>

      <div className='p-3 bg-white rounded-md'>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6'>
          {Array.from({ length: 10 }).map((item, i) => (
            <div className='shadow-sm p-3 rounded-md' key={i}>
              <div>
                <h1 className='font-medium text-md'>Product Name</h1>
                <h4 className='text-xs'>1,200</h4>
              </div>

              <div className='flex justify-end'>
                <div>
                  <p className='text-xs text-muted-foreground'>x4</p>
                  <p className='text-xs text-foreground font-semibold'>4,800</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
