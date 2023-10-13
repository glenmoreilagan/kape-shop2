import React from 'react'
// import { DataGrid } from '@mui/x-data-grid'

import { TextField } from '@mui/material'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BiPlus, BiMinus, BiEditAlt } from 'react-icons/bi'

import usePurchaseStore from '@/store/usePurchaseStore'

const PHPFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
})

export default function PurchaseItemTable({ handleAddItem }) {
  const items = usePurchaseStore((state) => state.items)
  const setNewItemQty = usePurchaseStore((state) => state.setNewItemQty)
  const setIncrementOrDecrementItemQty = usePurchaseStore((state) => state.setIncrementOrDecrementItemQty)

  const handleSetNewItemQty = (qty, item) => {
    setNewItemQty(qty, item)
  }

  const header = [
    // {
    //   field: 'id',
    //   headerName: 'ID',
    //   minWidth: 25,
    // },
    {
      field: 'name',
      headerName: 'Product Name',
      minWidth: 250,
    },
    {
      field: 'original_price',
      headerName: 'Original Price',
      minWidth: 150,
      headerAlign: 'right',
      align: 'right',
      valueFormatter: (params) => `${PHPFormatter.format(params.value)}`,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      minWidth: 75,
      renderCell: ({ row }) => (
        <TextField
          InputProps={{
            inputProps: {
              style: { textAlign: 'center' },
            },
          }}
          variant='outlined'
          size='small'
          className='w-full'
          value={row.quantity}
          onChange={(e) => handleSetNewItemQty(e.target.value, row)}
        />
      ),
    },
    {
      field: 'price',
      headerName: 'Price',
      minWidth: 150,
      headerAlign: 'right',
      align: 'right',
      valueFormatter: (params) => `${PHPFormatter.format(params.value)}`,
    },
  ]

  // console.log(items)
  return (
    <>
      <div className='flex justify-end mb-3'>
        <Button size='sm' onClick={handleAddItem}>
          <BiPlus className='mr-2 h-4 w-4' /> Add Item
        </Button>
      </div>

      <div className='w-full h-[70vh] overflow-y-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[200px]'>Product Name</TableHead>
              <TableHead className='w-[200px] text-center'>Quantity</TableHead>
              <TableHead className='w-[200px] text-right'>Original Price</TableHead>
              <TableHead className='w-[200px] text-right'>Total Price</TableHead>
              <TableHead className='w-[200px] text-center'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.map((row) => (
              <TableRow key={row.id}>
                <TableCell className='font-medium'>{row.name}</TableCell>
                <TableCell>
                  <div className='flex gap-1'>
                    <Button
                      onClick={() => setIncrementOrDecrementItemQty('decrement', row)}
                      variant='outline'
                      size='icon'
                      className='text-lg w-16'
                    >
                      <BiMinus />
                    </Button>
                    <Input
                      className='text-center'
                      value={Number(row.quantity)}
                      onChange={(e) => handleSetNewItemQty(e.target.value, row)}
                    />
                    <Button
                      onClick={() => setIncrementOrDecrementItemQty('increment', row)}
                      variant='outline'
                      size='icon'
                      className='text-lg w-16'
                    >
                      <BiPlus />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className='text-right'>{Number(row.original_price)}</TableCell>
                <TableCell className='text-right'>{Number(row.price)}</TableCell>
                <TableCell className='text-center'>
                  <Button
                    // onClick={() => router.push(`purchases/edit/${row.uuid}`)}
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
