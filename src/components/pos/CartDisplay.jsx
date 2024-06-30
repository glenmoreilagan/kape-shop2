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

import { checkout } from '@/components/hooks/sales'

export default function CartDisplay({ open, setOpen }) {
  const cartItems = useCartStore((state) => state.cart)
  const resetCart = useCartStore((state) => state.resetCart)

  const grandTotal = cartItems?.reduce((prev, current) => {
    return prev + current.qty * current.price
  }, 0)

  const handleCheckout = async (payload) => {
    const isSuccess = await checkout({ ...payload })
    if (isSuccess) {
      resetCart()
    }
  }

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
          {/* <DialogFooter> */}
            <div className='flex justify-between items-center gap-1'>
              <div>
              <div><p className='inline-block'>Number of Items:</p> <span className='text-green-600 font-bold text-lg'>{cartItems.length}</span></div>
              <div><p className='inline-block'>Grand Total:</p> <span className='text-red-600 font-bold text-lg'>{grandTotal.toFixed(2)}</span></div>
              </div>
              <div>
                <Button disabled={cartItems.length <= 0} onClick={() => handleCheckout({ payload: cartItems, setOpen })}>Checkout</Button>
              </div>
            </div>
          {/* </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  )
}
