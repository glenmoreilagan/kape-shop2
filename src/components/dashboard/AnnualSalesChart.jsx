import React from 'react'

import { Bar, BarChart, XAxis, LabelList } from 'recharts'

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function AnnualSalesChart() {
  const chartData = [
    { month: 'January', sales: 146 },
    { month: 'February', sales: 305 },
    { month: 'March', sales: 237 },
    { month: 'April', sales: 73 },
    { month: 'May', sales: 209 },
    { month: 'June', sales: 214 },
    { month: 'July', sales: 314 },
    { month: 'August', sales: 414 },
    { month: 'September', sales: 254 },
    { month: 'October', sales: 274 },
    { month: 'November', sales: 354 },
    { month: 'December', sales: 150 },
  ]

  const chartConfig = {
    sales: {
      label: 'Sales',
      color: 'hsl(var(--chart-3))',
    },
  }
  return (
    <Card className='lg:w-1/2 shadow-none border-none'>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        {/* <CardDescription>Annual Sales</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <ChartTooltip content={<ChartTooltipContent />} indicator='line' />
            <XAxis
              dataKey='month'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            {/* <YAxis /> */}
            <Bar dataKey='sales' fill='var(--color-sales)' radius={8}>
              {/* <LabelList position='top' offset={12} className='fill-foreground' fontSize={11} /> */}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
