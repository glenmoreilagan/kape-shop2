import React, { useMemo } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import CartTable from './CartTable'

import useCartStore from '@/store/useCartStore'

import { checkout } from '@/components/hooks/sales'
import { NumberFormatter } from '@/lib/number-formatter'

export default function CartDisplay({ open, setOpen }) {
  const cartItems = useCartStore((state) => state.cart)
  const resetCart = useCartStore((state) => state.resetCart)

  const grandTotal = cartItems?.reduce((prev, current) => {
    return prev + current.qty * current.price
  }, 0)

  const handleCheckout = async (payload) => {
    await checkout({ ...payload, resetCart: resetCart })
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Cart</SheetTitle>
            <SheetDescription>List of items</SheetDescription>
          </SheetHeader>
          {/* <ScrollArea className='min-h-96'> */}
          <div>
            {cartItems?.map((item, index) => {
              return <CartTable key={item.id} item={item} />
            })}
          </div>
          {/* </ScrollArea> */}

          <div className='mt-3 mb-3'>
            <div className='flex gap-3 justify-between'>
              <div className='text-sm'>
                <p className='inline-block'>Total Items:</p> <span className=''>{cartItems.length}</span>
              </div>
              <div className='text-sm'>
                <p className='inline-block'>Grand Total:</p> <span className=''>{NumberFormatter(grandTotal)}</span>
              </div>
            </div>
            <div></div>
          </div>
          <SheetFooter>
            <Button disabled={cartItems.length <= 0} onClick={() => handleCheckout({ payload: cartItems, setOpen })}>
              Checkout
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}
