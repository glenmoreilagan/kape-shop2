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
import { ScrollArea } from '../ui/scroll-area'

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

          <ScrollArea className='h-[75vh] md:h-full lg:w-[80vw]'>
            <div className='w-full lg:w-[48rem]'>
              {/* {JSON.stringify(selectedProduct)} */}
              <div className='flex flex-col md:flex-row gap-3 lg:gap-12'>
                <div>
                  <img src={selectedProduct?.image} alt='product-image' className='aspect-square' />
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
          </ScrollArea>

          <DialogFooter>
            <Button onClick={handleClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
