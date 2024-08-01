import React from 'react'

import { Label, Pie, PieChart, Sector, LabelList } from 'recharts'

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { NumberFormatter } from '@/lib/number-formatter'

export default function TopProductSalesChart() {
  const topSales = [
    { productName: 'Product 1', sales: 446, fill: 'var(--color-top-one)' },
    { productName: 'Product 2', sales: 305, fill: 'var(--color-top-two)' },
    { productName: 'Product 3', sales: 237, fill: 'var(--color-top-three)' },
    { productName: 'Product 4', sales: 73, fill: 'var(--color-top-four)' },
    { productName: 'Product 5', sales: 209, fill: 'var(--color-top-five)' },
  ]

  const chartConfigTopSales = {
    'top-one': {
      label: 'Top 1',
      color: 'hsl(var(--chart-1))',
    },
    'top-two': {
      label: 'Top 21',
      color: 'hsl(var(--chart-2))',
    },
    'top-three': {
      label: 'Top 3',
      color: 'hsl(var(--chart-3))',
    },
    'top-four': {
      label: 'Top 4',
      color: 'hsl(var(--chart-4))',
    },
    'top-five': {
      label: 'Top 5',
      color: 'hsl(var(--chart-5))',
    },
  }
  return (
    <Card className='w-full shadow-none border-none'>
      <CardHeader>
        <CardTitle>Top 5 products</CardTitle>
        {/* <CardDescription>Bestseller product</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfigTopSales} className='mx-auto aspect-square'>
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} indicator='line' />
            <Pie
              data={topSales}
              dataKey='sales'
              nameKey='productName'
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({ outerRadius = 0, ...props }) => <Sector {...props} outerRadius={outerRadius + 10} />}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
                        <tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-xl font-bold'>
                          {NumberFormatter(1350)}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground'>
                          Sales
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
              {/* <LabelList
                dataKey='sales'
                className='fill-background'
                stroke='none'
                fontSize={12}
                formatter={(value) => value}
              /> */}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
