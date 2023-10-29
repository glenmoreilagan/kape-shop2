import React, { useEffect, useState } from 'react'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BiPlus, BiMinus, BiEditAlt, BiTrashAlt } from 'react-icons/bi'

import usePurchaseStore from '@/store/usePurchaseStore'

const PHPFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
})

import { purchaseUpdateQuantity } from '@/api/purchases'

export default function PurchaseItemTable({ purchases, handleAddItem }) {
  const { mutateAsync: purchaseUpdateQuantityMutate } = purchaseUpdateQuantity()
  const removeItem = usePurchaseStore((state) => state.removeItem)

  const [copiedPurchases, setCopiedPurchases] = useState([])

  const handleUpdateQuantity = (params) => {
    const obj = {
      item: params.item,
      qty: params.qty,
      action: params.action,
    }

    if (params.action === 'manual') {
      setCopiedPurchases(
        copiedPurchases.map((row) => {
          if (row.id === params.item.id) return { ...row, quantity: params.qty }
          return row
        })
      )
    }

    purchaseUpdateQuantityMutate(obj)
  }

  useEffect(() => {
    setCopiedPurchases(purchases)
  }, [purchases])

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
              <TableHead className='w-[350px]'>Product Name</TableHead>
              <TableHead className='w-[200px] text-center'>Quantity</TableHead>
              <TableHead className='w-[200px] text-right'>Price</TableHead>
              <TableHead className='w-[200px] text-right'>Total Price</TableHead>
              <TableHead className='w-[200px] text-center'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {copiedPurchases?.map((row) => (
              <TableRow key={row.id}>
                <TableCell className='font-medium'>{row.purchased_product?.name}</TableCell>
                <TableCell>
                  <div className='flex gap-1'>
                    <Button
                      onClick={() => handleUpdateQuantity({ item: row, qty: 1, action: 'decrement' })}
                      variant='outline'
                      size='icon'
                      className='text-lg w-16'
                    >
                      <BiMinus />
                    </Button>
                    <Input
                      className='text-center'
                      value={Number(row.quantity)}
                      onChange={(e) => {
                        handleUpdateQuantity({ item: row, qty: e.target.value, action: 'manual' })
                      }}
                    />
                    <Button
                      onClick={() => handleUpdateQuantity({ item: row, qty: 1, action: 'increment' })}
                      variant='outline'
                      size='icon'
                      className='text-lg w-16'
                    >
                      <BiPlus />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className='text-right'>{Number(row.purchased_product?.price)}</TableCell>
                <TableCell className='text-right'>
                  {Number(row.purchased_product?.price * row.quantity).toFixed(2)}
                </TableCell>
                <TableCell className='text-center'>
                  <Button onClick={() => removeItem(row)} variant='outline' size='icon' className='text-lg'>
                    <BiTrashAlt />
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
