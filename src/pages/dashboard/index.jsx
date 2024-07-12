'use client'
import React from 'react'

// components
import AppLayout from '@/components/layouts/AppLayout'
import BreadcrumbsComponent from '@/components/reusable/Breadcrumbs'

import { Bar, BarChart } from 'recharts'

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { usersAPI } from '@/components/hooks/users'
import { logout } from '@/components/hooks/auth'

const chartData = [
  { month: 'January', desktop: 146, mobile: 80, tablet: 120 },
  { month: 'February', desktop: 305, mobile: 200, tablet: 50 },
  { month: 'March', desktop: 237, mobile: 120, tablet: 140 },
  { month: 'April', desktop: 73, mobile: 190, tablet: 150 },
  { month: 'May', desktop: 209, mobile: 130, tablet: 120 },
  { month: 'June', desktop: 214, mobile: 140, tablet: 190 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: 'Mobile',
    color: "hsl(var(--chart-2))",
  },
  tablet: {
    label: 'Mobile',
    color: "hsl(var(--chart-5))",
  },
}

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


        <Card className="w-[35vw] shadow-none border-none">
      <CardHeader>
        <CardTitle>Summary</CardTitle>
        <CardDescription>These is summary of sale this year</CardDescription>
      </CardHeader>
      <CardContent>
      <ChartContainer config={chartConfig} className='w-[600px]'>
            <BarChart accessibilityLayer data={chartData}>
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
              <Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} />
              <Bar dataKey='tablet' fill='var(--color-tablet)' radius={4} />
            </BarChart>
          </ChartContainer>
      </CardContent>
    </Card>
      </AppLayout>
    </>
  )
}
