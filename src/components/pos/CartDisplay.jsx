import React from 'react'

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
import CartQunatityComponent from './CartQunatityComponent'

import useCartStore from '@/store/useCartStore'

export default function CartDisplay({ open, setOpen }) {
  const cartItems = useCartStore((state) => state.cart)

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-w-[50rem]'>
          <DialogHeader className='mb-3'>
            <DialogTitle className='text-xl mb-3'>Shopping Cart</DialogTitle>
            {/* <DialogDescription> */}
            {/* </DialogDescription> */}
            <ScrollArea className='max-h-96'>
              <div>
                {cartItems?.map((item, index) => {
                  return (
                    <div
                      key={item.id}
                      className='grid grid-cols-4 gap-3 place-items-center px-3 py-2 mb-3 rounded-md border'
                    >
                      <div className='text-left w-full'>
                        <h4 className='text-gray-900 capitalize font-medium text-lg'>{item.productName}</h4>
                        <p className='text-gray-400 text-xs'>P {item.price}</p>
                      </div>

                      <CartQunatityComponent item={item} />
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </DialogHeader>
          <DialogFooter>
            <Button type='submit'>Checkout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
