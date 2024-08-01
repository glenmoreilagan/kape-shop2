'use client'
import React from 'react'

// components
import AppLayout from '@/components/layouts/AppLayout'
import BreadcrumbsComponent from '@/components/reusable/Breadcrumbs'



import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { usersAPI } from '@/components/hooks/users'
import { logout } from '@/components/hooks/auth'
import { NumberFormatter } from '@/lib/number-formatter'
import AnnualSalesChart from '@/components/dashboard/AnnualSalesChart'
import WeeklySalesChart from '@/components/dashboard/WeeklySalesChart'
import TopProductSalesChart from '@/components/dashboard/TopProductSalesChart'

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
        <div className='flex gap-3'>
          <AnnualSalesChart />
          <div className='w-1/4 flex flex-wrap gap-3'>
            <TopProductSalesChart />
            <WeeklySalesChart />
          </div>
        </div>
      </AppLayout>
    </>
  )
}
