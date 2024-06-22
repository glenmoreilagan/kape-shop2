import React, { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { ModalStateViewProductCard, SelectProductToView } from '@/store/useViewProductCardStore'

export default function ViewProductCard({ item }) {
  const { showViewProduct, SetShowViewProduct } = ModalStateViewProductCard()
  const { selectedProduct, SetSelectedProduct } = SelectProductToView()

  const handleOpen = () => {
    SetShowViewProduct(true)
  }
  const handleClose = () => {
    SetShowViewProduct(false)
  }

  // useEffect(() => {
  //   return () => {
  //     SetSelectedProduct(null)
  //     handleClose()
  //   }
  // }, [])
  return (
    <>
      <Dialog open={showViewProduct} onOpenChange={SetShowViewProduct} w>
        <DialogContent className='max-w-fit'>
          <DialogHeader>
            <DialogTitle className='text-xl'>Product Details</DialogTitle>
          </DialogHeader>

          <div className='w-[48rem]'>
            {/* {JSON.stringify(selectedProduct)} */}
            <div className='flex gap-3'>
              <div className='w-96'>
                <img src={selectedProduct?.image} alt='product-image' className='w-fit' />
              </div>
              <div>
                <div className='mb-3'>
                  <h4 className='text-lg font-bold'>{selectedProduct?.title}</h4>
                  <p className='text-sm'>{selectedProduct?.description}</p>
                </div>

                <div>
                  <h4 className='text-lg font-bold'>Ingredients:</h4>
                  <ul className='sm list-disc list-inside'>
                    {selectedProduct?.ingredients?.map((ingredient) => (
                      <li key={selectedProduct?.id}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
