import React from 'react'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { BiDollar, BiFile } from 'react-icons/bi'

export default function SummaryPanel() {
  return (
    <>
      <Card className='flex-1 shadow-none border-none'>
        <CardHeader>
          <CardTitle className='flex items-center gap-6'>
            <div className='bg-foreground py-2 w-14 rounded-md flex justify-center'>
              <BiDollar className='text-white' size={24} />
            </div>

            <div>
              <h1 className='text-gray-600'>Daily Sales</h1>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h4 className='text-2xl font-semibold'>P45,500</h4>
        </CardContent>
      </Card>
      <Card className='flex-1 shadow-none border-none'>
        <CardHeader>
          <CardTitle className='flex items-center gap-6'>
            <div className='bg-foreground py-2 w-14 rounded-md flex justify-center'>
              <BiFile className='text-white' size={24} />
            </div>

            <div>
              <h1 className='text-gray-600'>Total Order</h1>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h4 className='text-2xl font-semibold'>500</h4>
        </CardContent>
      </Card>
      <Card className='flex-1 shadow-none border-none'>
        <CardHeader>
          <CardTitle className='flex items-center gap-6'>
            <div className='bg-foreground py-2 w-14 rounded-md flex justify-center'>
              <BiDollar className='text-white' size={24} />
            </div>

            <div>
              <h1 className='text-gray-600'>Weely Sales</h1>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h4 className='text-2xl font-semibold'>P45,500</h4>
        </CardContent>
      </Card>
      <Card className='flex-1 shadow-none border-none'>
        <CardHeader>
          <CardTitle className='flex items-center gap-6'>
            <div className='bg-foreground py-2 w-14 rounded-md flex justify-center'>
              <BiDollar className='text-white' size={24} />
            </div>

            <div>
              <h1 className='text-gray-600'>Annual Sales</h1>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h4 className='text-2xl font-semibold'>P45,500</h4>
        </CardContent>
      </Card>
    </>
  )
}
