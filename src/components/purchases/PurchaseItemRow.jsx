import React, { useEffect, useState } from 'react'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BiPlus, BiMinus, BiEditAlt, BiTrashAlt } from 'react-icons/bi'

import usePurchaseStore from '@/store/usePurchaseStore'

export default function PurchaseItemRow({ row, handleUpdateQuantity }) {
  const removeItem = usePurchaseStore((state) => state.removeItem)

  const [qty, setQty] = useState(0)

  useEffect(() => {
    setQty(row.quantity)
  }, [row?.quantity])

  return (
    <TableRow>
      <TableCell className='font-medium'>{row.product_name}</TableCell>
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
            value={Number(qty)}
            onChange={(e) => {
              const inputQuantity = e.target.value
              setQty(Number(inputQuantity))
            }}
            onBlur={(e) => {
              const inputQuantity = e.target.value
              if (Number(row.quantity) !== Number(inputQuantity)) {
                handleUpdateQuantity({ item: row, qty: inputQuantity, action: 'manual' })
              }
            }}
          />
          <Button
            onClick={() => {
              handleUpdateQuantity({ item: row, qty: 1, action: 'increment' })
              // setQty(Number(row.quantity + 1))
            }}
            variant='outline'
            size='icon'
            className='text-lg w-16'
          >
            <BiPlus />
          </Button>
        </div>
      </TableCell>
      <TableCell className='text-right'>{Number(row.price)}</TableCell>
      <TableCell className='text-right'>{Number(row.price * row.quantity).toFixed(2)}</TableCell>
      <TableCell className='text-center'>
        <Button onClick={() => removeItem(row)} variant='outline' size='icon' className='text-lg'>
          <BiTrashAlt />
        </Button>
      </TableCell>
    </TableRow>
  )
}
