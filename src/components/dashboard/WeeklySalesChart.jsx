import React from 'react'

import { XAxis, Line, LineChart, LabelList } from 'recharts'

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function WeeklySalesChart() {
  const weeklySales = [
    { dayName: 'Monday', sales: 26 },
    { dayName: 'Tuesday', sales: 105 },
    { dayName: 'Wednesday', sales: 37 },
    { dayName: 'Thursday', sales: 73 },
    { dayName: 'Friday', sales: 49 },
  ]

  const chartConfig = {
    sales: {
      label: 'Sales',
      color: 'hsl(var(--chart-1))',
    },
  }

  return (
    <Card className='w-full shadow-none border-none'>
      <CardHeader>
        <CardTitle>Weekly Sales</CardTitle>
        {/* <CardDescription>Weekly Sales</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='mx-auto aspect-square'>
          <LineChart
            accessibilityLayer
            data={weeklySales}
            margin={{
              left: 20,
              right: 20,
            }}
          >
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} indicator='line' />
            <XAxis
              dataKey='dayName'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            {/* <YAxis /> */}
            <Line dataKey='sales' type='natural' stroke='var(--color-sales)' strokeWidth={2} dot={false}>
              {/* <LabelList position='top' offset={12} className='fill-foreground' fontSize={11} /> */}
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
