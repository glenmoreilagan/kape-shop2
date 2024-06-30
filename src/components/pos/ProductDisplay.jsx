import React from 'react'

// store
import useCartStore from '@/store/useCartStore'

import { FaShoppingCart } from 'react-icons/fa'

export default function ProductDisplay({ products }) {
  const addToCart = useCartStore((state) => state.addToCart)

  const handleAddToCart = async (product) => {
    addToCart(product)
  }

  return (
    <>
      {products?.map((product) => {
        return (
          <div key={product.id} className='group w-full relative shadow  rounded-md'>
            <div className='h-full' title={product.name}>
              <div className='mb-3 overflow-hidden'>
                <img
                  src={`/noimage.jpg`}
                  alt={`${product.name}`}
                  className='w-full h-32 group-hover:scale-125 transition-transform duration-500 ease-in-out'
                />
              </div>
              <div className='px-3 mb-3'>
                <div>
                  <span className='text-sm font-medium'>
                    {product.name?.length > 50 ? product.name.slice(0, 25) + '...' : product.name}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <div>
                    <span className='text-xs font-thin'>PHP {product.price}</span>
                  </div>
                  <div>
                    <button title='Add to cart' onClick={() => handleAddToCart(product)}>
                      <FaShoppingCart size={'22px'} className='text-blue-700 hover:text-blue-000 cursor-pointer' />
                    </button>
                  </div>
                </div>
              </div>
              {/* <div className='absolute bottom-0 left-0 right-0 p-3'>
                    <Button
                      variant='contained'
                      size='small'
                      className='w-full'
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to cart
                    </Button>
                  </div> */}
            </div>
          </div>
        )
      })}
    </>
  )
}
