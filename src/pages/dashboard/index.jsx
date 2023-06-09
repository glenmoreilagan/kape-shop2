'use client'
import React from 'react'

// components
import AppLayout from '@/components/layouts/appLayout'
import BreadcrumbsComponent from '@/components/reusable/breadcrumbs'


export default function IndexDashboard() {
  return (
    <>
      <AppLayout>
        <div className='flex justify-between items-center bg-white p-3 mb-3'>
          <div>
            <BreadcrumbsComponent>
              <span className='text-sm'>Dashboard</span>
            </BreadcrumbsComponent>
          </div>
        </div>
      </AppLayout>
    </>
  )
}
