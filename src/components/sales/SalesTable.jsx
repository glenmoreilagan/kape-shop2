import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '../ui/button'

import { MdOutlineRemoveRedEye } from 'react-icons/md'

import moment from 'moment'
import newAxios from '@/lib/new-axios'
import { NumberFormatter } from '@/lib/number-formatter'

export default function SalesTable() {
  const router = useRouter()
  const [sales, setSales] = useState([])

  const fetchSales = async () => {
    try {
      const response = await newAxios.get('/api/sales')
      setSales(response.data)
    } catch (error) {}
  }

  useEffect(() => {
    fetchSales()
  }, [])

  return (
    <div className='w-full h-[70vh]'>
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
          {sales?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className='font-medium'>{item.document_no}</TableCell>
              <TableCell className='text-right'>{parseInt(item.sales_count ?? 0)}</TableCell>
              <TableCell className='text-right'>{NumberFormatter(parseInt(item.sales_sum_price ?? 0))}</TableCell>
              <TableCell>{moment(item.transaction_date).format('MMMM DD, YYYY')}</TableCell>
              <TableCell className='text-center'>
                <Button
                  onClick={() => router.push(`sales/view/${item.uuid}`)}
                  variant='outline'
                  size='icon'
                  className='text-lg'
                >
                  <MdOutlineRemoveRedEye />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
