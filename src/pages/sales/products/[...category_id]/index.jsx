import React from 'react'

import { Button } from '@/components/ui/button'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { Badge } from '@/components/ui/badge'

import AppLayout from '@/components/layouts/appLayout'
import BreadcrumbsComponent from '@/components/reusable/Breadcrumbs'

import useCartStore from '@/store/useCartStore'

export default function ProductPage() {
  const cartCount = useCartStore((state) => state.cartCount)
  return (
    <AppLayout>
      <div className='flex justify-between items-center bg-white p-3 mb-3 sticky top-0 z-10'>
        <div className=''>
          <BreadcrumbsComponent>
            <span className='text-sm'>Sales</span>
          </BreadcrumbsComponent>
        </div>
        <div>
          {/* <Button
        onClick={() => checkout(viewCart)}
        className='bg-primary-gray'
        size='small'
        variant='contained'
        startIcon={<MdOutlineShoppingCart />}
        >
        View Cart
      </Button> */}

          <Button size='sm' className='relative' onClick={() => checkout(viewCart)}>
            <MdOutlineShoppingCart className='mr-2 h-4 w-4' /> View Cart
            <Badge variant='destructive' className='absolute top-[-.5rem] right-[-.5rem] px-1 text-[.75rem]'>
              {cartCount()}
            </Badge>
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}
