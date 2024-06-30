'use client'
import React, { useState } from 'react'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { BiEditAlt } from 'react-icons/bi'
import { Button } from '../ui/button'

// API's
import { purchaseAPI } from '@/components/hooks/purchases'

import { useRouter } from 'next/navigation'
import moment from 'moment'
import Loader from '../reusable/Loader'

const PHPFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
})

export default function PurchaseTable({ purchases }) {
  const router = useRouter()

  return (
    <>
      <div className='flex w-full h-[70vh]'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[200px]'>Document No.</TableHead>
              <TableHead className='w-[200px]'>Item Counts</TableHead>
              <TableHead className='w-[200px]'>Total Amount</TableHead>
              <TableHead className='w-[200px]'>Transaction Date</TableHead>
              <TableHead className='w-[200px] text-center'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases?.map((row) => (
              <TableRow key={row.id}>
                <TableCell className='font-medium'>{row.document_no}</TableCell>
                <TableCell>{row.purchases_count}</TableCell>
                <TableCell>{Number(row.purchases_sum_price)}</TableCell>
                <TableCell>{moment(row.transaction_date).format('MMMM DD, YYYY')}</TableCell>
                <TableCell className='text-center'>
                  <Button
                    onClick={() => router.push(`purchases/edit/${row.uuid}`)}
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
    </>
  )
}
