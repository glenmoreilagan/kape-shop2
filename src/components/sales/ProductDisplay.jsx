import React from 'react'

// store
import useCartStore from '@/store/useCartStore'
import useSaleStore from '@/store/useSaleStore'

import { FaShoppingCart } from 'react-icons/fa'

export default function ProductDisplay() {
  // const products = useSaleStore((state) => state.products)
  const addToCart = useCartStore((state) => state.addToCart)

  const handleAddToCart = async (product) => {
    addToCart(product)
  }

  return (
    <>
      {products?.map((product) => {
        return (
          <div key={product.id} className='w-[40%] md:w-[10em] relative border rounded-md flex-grow'>
            <div className='h-full p-3' title={product.name}>
              <div className='mb-3'>
                <img src={`/noimage.jpg`} alt={`${product.name}`} className='w-full h-32' />
              </div>
              <div className=''>
                <div>
                  <span className='text-xs font-thin'>
                    {product.name?.length > 50 ? product.name.slice(0, 25) + '...' : product.name}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <div>
                    <span className='text-xs font-medium'>PHP {product.price}</span>
                  </div>
                  <div>
                    <FaShoppingCart
                      size={'22px'}
                      className='text-blue-700 hover:text-blue-000 cursor-pointer'
                      title='Add to cart'
                      onClick={() => handleAddToCart(product)}
                    />
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
