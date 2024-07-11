'use client'
import React, { useState } from 'react'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { BiEditAlt } from 'react-icons/bi'
import { Button } from '../ui/button'
import moment from 'moment'

import { useRouter } from 'next/navigation'
import Loader from '../reusable/Loader'
import { NumberFormatter } from '@/lib/number-formatter'

const PHPFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
})

export default function ProductTable({ products }) {
  const router = useRouter()

  return (
    <div className='flex w-full h-[70vh]'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[200px]'>Product</TableHead>
            <TableHead className='w-[200px]'>Category</TableHead>
            <TableHead className='w-[200px]'>Brand</TableHead>
            <TableHead className='w-[200px]'>Total Sales Count</TableHead>
            <TableHead className='w-[200px]'>Total Sales Amout</TableHead>
            <TableHead className='w-[500px]'>Description</TableHead>
            <TableHead className='w-[200px]'>Created At</TableHead>
            <TableHead className='w-[200px] text-center'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.data.map((row) => (
            <TableRow key={row.id}>
              <TableCell className='font-medium'>{row.name}</TableCell>
              <TableCell>{row.categories?.category}</TableCell>
              <TableCell>{row.brands?.brand}</TableCell>
              <TableCell className='text-right'>{parseInt(row.sales_count ?? 0)}</TableCell>
              <TableCell className='text-right'>{NumberFormatter(parseInt(row.sales_sum_price ?? 0))}</TableCell>
              <TableCell>
                <p>1. {row.description1}</p>
                <p>2. {row.description2}</p>
              </TableCell>
              <TableCell>{moment(row.created_at).format('MMMM DD, YYYY')}</TableCell>
              <TableCell className='text-center'>
                <Button
                  onClick={() => router.push(`products/edit/${row.uuid}`)}
                  variant='outline'
                  size='icon'
                  className='text-lg'
                >
                  <BiEditAlt />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
