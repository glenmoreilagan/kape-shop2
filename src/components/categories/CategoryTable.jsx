import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { BiEditAlt } from 'react-icons/bi'
import { Button } from '../ui/button'
import moment from 'moment'

export default function CategoryTable({ categories, edit }) {
  return (
    <div className='w-full'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[200px]'>Category</TableHead>
            <TableHead>CreatedAt</TableHead>
            <TableHead className='text-center'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.data.map((row) => (
            <TableRow key={row.id}>
              <TableCell className='font-medium'>{row.category}</TableCell>
              <TableCell>{moment(row.created_at).format('MMMM DD, YYYY')}</TableCell>
              <TableCell className='text-center'>
                <Button onClick={() => edit(row)} variant='outline' size='icon' className='text-lg'>
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
