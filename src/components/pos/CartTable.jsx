import useCartStore from '@/store/useCartStore'
import React, { useEffect, useState } from 'react'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

import { MdDeleteOutline } from 'react-icons/md'
import { NumberFormatter } from '@/lib/number-formatter'

export default function CartTable({ item }) {
  const updateCartQuantity = useCartStore((state) => state.updateCartQuantity)
  const [qty, setQty] = useState(0)

  useEffect(() => {
    setQty(item.qty)
  }, [item.qty])

  return (
    <>
      <div className='px-3 py-2 mb-3 rounded-md border relative'>
        <div className='text-left w-full mb-6'>
          <h4 className='text-gray-900 capitalize font-medium text-lg'>{item.productName}</h4>
          <p className='text-gray-600 text-xs'>P {NumberFormatter(item.price)}</p>
        </div>

        

        <div className='flex justify-between items-center'>
          <div className='flex gap-1'>
          <Button size='sm' variant='outline' onClick={() => updateCartQuantity(item, 'decrement')} disabled={item.qty <= 1}>
            -
          </Button>
          <Input size='sm' className='w-24 text-center h-8 rounded-md px-3 text-xs' type='text' value={qty} onChange={(e) => setQty(e.target.value)} />
          <Button size='sm' variant='outline' onClick={() => updateCartQuantity(item, 'increment')}>
            +
          </Button>
          </div>

          <div>
          <span className='text-gray-800 text-xs'>P {NumberFormatter(item.qty * item.price)}</span>
        </div>
        </div>

        <div className='absolute top-3 right-3'>
          <Button variant='outline' className='hover:text-destructive-foreground hover:shadow-sm hover:bg-destructive/90' size='icon' onClick={() => console.log(item, 'decrement')}>
            <MdDeleteOutline/>
          </Button>
        </div>
      </div>
    </>
  )
}
