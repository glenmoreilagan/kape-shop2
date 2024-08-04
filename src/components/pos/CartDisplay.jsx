import React, { useEffect, useMemo, useState } from 'react'

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

import { checkout } from '@/hooks/sales'
import { NumberFormatter } from '@/lib/number-formatter'
import { Input } from '../ui/input'
import { toast } from 'react-toastify'
import MessageAlert from '../MessageAlert'

export default function CartDisplay({ open, setOpen }) {
  const cartItems = useCartStore((state) => state.cart)
  const resetCart = useCartStore((state) => state.resetCart)

  const [cash, setCash] = useState(0)

  const subTotal = cartItems?.reduce((prev, current) => {
    return prev + current.qty * current.price
  }, 0)

  const vat = useMemo(() => {
    return (parseFloat(subTotal) * 0.12).toFixed(2)
  }, [subTotal])

  const total = useMemo(() => {
    return parseFloat(subTotal) + parseFloat(vat)
  }, [subTotal])

  const creditCash = useMemo(() => {
    return parseFloat(cash) - parseFloat(total)
  }, [cash])

  const handleCheckout = async (payload) => {
    try {
      const response = await checkout({ ...payload })
      setOpen(false)
      resetCart()
      toast.success(<MessageAlert header='Success!' body='Checkout Success.' />)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen} className='relative'>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              Cart <span className='font-thin text-sm'>({cartItems.length})</span>
            </SheetTitle>
            <SheetDescription>List of items</SheetDescription>
          </SheetHeader>
          <ScrollArea className='h-[65vh]'>
            <div>
              {cartItems?.map((item, index) => {
                return <CartTable key={item.id} item={item} />
              })}
            </div>
          </ScrollArea>

          <SheetFooter>
            <div className='px-6 absolute bottom-5 w-full left-0'>
              <div className='flex gap-3 justify-end mb-3'>
                <div className='text-sm'>
                  <div className='flex gap-3 justify-between'>
                    <p className='inline-block'>Sub Total:</p>
                    <span className='font-bold'>{parseInt(subTotal) > 0 ? NumberFormatter(subTotal) : '-'}</span>
                  </div>
                  <div className='flex gap-3 justify-between'>
                    <p className='inline-block'>Vat:</p>
                    <span className='font-bold'>{parseInt(vat) > 0 ? NumberFormatter(parseFloat(vat)) : '-'}</span>
                  </div>
                  <div className='flex gap-3 justify-between'>
                    <p className='inline-block'>Cash:</p>
                    <span className='font-bold'>{parseInt(cash) > 0 ? NumberFormatter(cash) : '-'}</span>
                  </div>
                  <div className='flex gap-3 justify-between'>
                    <p className='inline-block'>Grand Total:</p>
                    <span className='font-bold'>{parseInt(total) > 0 ? NumberFormatter(total) : '-'}</span>
                  </div>
                  <div className='flex gap-3 justify-between'>
                    <p className='inline-block'>Credit:</p>
                    <span className='font-bold'>{parseInt(creditCash) > 0 ? NumberFormatter(creditCash) : '-'}</span>
                  </div>
                </div>
              </div>

              <Input
                placeholder='Cash'
                className='mb-3'
                value={cash}
                onChange={(e) => {
                  const value = e.target.value
                  const regex = /[^0-9.]/g // Regex to match any character that is not a number or dot
                  const filteredValue = value.replace(regex, '')
                  setCash((prev) => filteredValue)
                }}
              />
              <Button
                className='w-full'
                disabled={cartItems.length <= 0}
                onClick={() => handleCheckout({ payload: cartItems, setOpen })}
              >
                Checkout
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}
