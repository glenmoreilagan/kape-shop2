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

import { purchaseFindOneAPI, purchaseUpdateQuantity } from '@/components/hooks/purchases'
import PurchaseItemRow from './PurchaseItemRow'

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
              <PurchaseItemRow key={row.id} row={row} handleUpdateQuantity={handleUpdateQuantity} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
