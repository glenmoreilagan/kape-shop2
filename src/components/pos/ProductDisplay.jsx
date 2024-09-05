import React from 'react'

// store
import useCartStore from '@/store/useCartStore'

import { FaShoppingCart } from 'react-icons/fa'
import { NumberFormatter } from '@/lib/number-formatter'

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
              <div className='px-3 mb-3 space-y-4'>
                <div>
                  <span className='text-sm font-medium uppercase'>
                    {product.name?.length > 50 ? product.name.slice(0, 25) + '...' : product.name}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='text-xs font-thin text-gray-500'>x{parseInt(product.stocks)}</p>
                    <p className='text-xs font-semibold text-gray-600'>
                      PHP {NumberFormatter(parseInt(product.price))}
                    </p>
                  </div>
                  <div>
                    <button disabled={product.stocks <= 0} title='Add to cart' onClick={() => handleAddToCart(product)}>
                      <FaShoppingCart
                        size={'22px'}
                        className={`${product.stocks > 0 ? 'text-blue-700 cursor-pointer' : 'text-gray-600'} hover:text-blue-000 `}
                      />
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
