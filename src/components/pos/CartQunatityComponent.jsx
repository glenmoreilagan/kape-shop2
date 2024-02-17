import useCartStore from '@/store/useCartStore'
import React, { useEffect, useState } from 'react'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

import { MdDeleteOutline } from 'react-icons/md'

export default function CartQunatityComponent({ item }) {
  const updateCartQuantity = useCartStore((state) => state.updateCartQuantity)
  const [qty, setQty] = useState(0)

  useEffect(() => {
    setQty(item.qty)
  }, [item.qty])

  return (
    <>
      <div className='w-46 flex gap-1'>
        <Button variant='outline' onClick={() => updateCartQuantity(item, 'increment')}>
          +
        </Button>
        <Input className='w-24 text-center' type='text' value={qty} onChange={(e) => setQty(e.target.value)} />
        <Button variant='outline' onClick={() => updateCartQuantity(item, 'decrement')} disabled={item.qty <= 1}>
          -
        </Button>
      </div>

      <div>
        <span className='text-gray-400 text-xs'>P {item.qty * item.price}</span>
      </div>

      <div>
        <Button variant='outline' onClick={() => console.log(item, 'decrement')}>
          <MdDeleteOutline size={18} />
        </Button>
      </div>
    </>
  )
}
