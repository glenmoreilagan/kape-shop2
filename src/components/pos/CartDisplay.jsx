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

import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import CartTable from './CartTable'

import useCartStore from '@/store/useCartStore'

import { checkout } from '@/api/sales'

export default function CartDisplay({ open, setOpen }) {
  const cartItems = useCartStore((state) => state.cart)

  const grandTotal = cartItems?.reduce((prev, current) => {
    return prev + current.qty * current.price
  }, 0)

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-w-[50rem]'>
          <DialogHeader className='mb-3'>
            <DialogTitle className='text-xl mb-3'>Shopping Cart</DialogTitle>
            <ScrollArea className='max-h-96'>
              <div>
                {cartItems?.map((item, index) => {
                  return <CartTable key={item.id} item={item} />
                })}
              </div>
            </ScrollArea>
          </DialogHeader>
          <DialogFooter>
            <div className='flex justify-between items-center gap-1'>
              <div>
                <span className='font-medium bg-green-400 px-4 py-2 rounded-md text-sm'>
                  Total: P {grandTotal.toFixed(2)}
                </span>
              </div>
              <div>
                <Button onClick={() => checkout(cartItems)}>Checkout</Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
