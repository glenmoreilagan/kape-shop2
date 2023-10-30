import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BiPlus, BiMinus, BiEditAlt, BiTrashAlt } from 'react-icons/bi'

import usePurchaseStore from '@/store/usePurchaseStore'

const PHPFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
})

import { purchaseFindOneAPI, purchaseUpdateQuantity } from '@/api/purchases'

export default function PurchaseItemTable({ purchases, handleAddItem, dispatchReducer }) {
  const searchParams = useSearchParams()
  const purchase_uuid = searchParams.get('id')

  const { mutateAsync: purchaseUpdateQuantityMutate } = purchaseUpdateQuantity()
  const removeItem = usePurchaseStore((state) => state.removeItem)
  const [purchasedProduct, setPurchasedProduct] = useState([])

  const handleUpdateQuantity = (params) => {
    const obj = {
      item: params.item,
      qty: params.qty,
      action: params.action,
    }

    purchaseUpdateQuantityMutate(obj)
  }

  useEffect(() => {
    setPurchasedProduct(
      purchases?.purchases.map((row, i) => {
        return {
          id: row.id,
          document_id: row.document_id,
          product_id: row.product_id,
          category_id: row.category_id,
          brand_id: row.brand_id,
          quantity: row.quantity,
          price: row.price,
          product_name: row.name,
        }
      })
    )
    if (purchases) {
      dispatchReducer({ type: 'DOCUMENT', payload: { document: purchases?.document } })
    }
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
            {purchasedProduct?.map((row, i) => (
              <TableRow key={row.id}>
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
                      // defaultValue={Number(row.quantity)}
                      // value={Number(row.quantity)}
                      className='text-center'
                      value={Number(row.quantity)}
                      readOnly
                      // onChange={(e) => {
                      //   handleManualUpdateQuantity({ item: row, qty: e.target.value, index: i })
                      // }}
                      // onBlur={(e) => handleManualUpdateQuantity({ item: row, qty: e.target.value, index: i })}
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
                <TableCell className='text-right'>{Number(row.price)}</TableCell>
                <TableCell className='text-right'>{Number(row.price * row.quantity).toFixed(2)}</TableCell>
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
