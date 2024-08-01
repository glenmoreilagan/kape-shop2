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
import SummaryPanel from '@/components/dashboard/SummaryPanel'

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

        <div className='mb-3 grid md:grid-cols-2 lg:grid-cols-4 gap-3'>
          <SummaryPanel />
        </div>
        <div className='flex flex-col lg:flex-row gap-3'>
          <AnnualSalesChart />
          <div className='flex-1 flex flex-wrap lg:flex-nowrap gap-3'>
            <TopProductSalesChart />
            <WeeklySalesChart />
          </div>
        </div>
      </AppLayout>
    </>
  )
}
