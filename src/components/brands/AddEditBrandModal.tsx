import React, { useState, forwardRef } from 'react'
import { useRouter } from 'next/router'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

// store
import useBrandStore from '@/store/useBrandStore'

import { addBrandAPI, updateBrandAPI } from '@/hooks/brands'

import MessageAlert from '@/components/MessageAlert'
import { toast } from 'react-toastify'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const BRAND_SCHEMA = z.object({
  brand: z.string().min(1, 'Brand is required.'),
})

type BrandType = {
  id?: number
  brand: string
}

export default function AddEditBrandModal({ actionStatus }) {
  const router = useRouter()

  const { mutateAsync: addBrand } = addBrandAPI()
  const { mutateAsync: updateBrand } = updateBrandAPI()

  const { openModal, setShowHideModal } = useBrandStore((state) => state)
  const selectedBrand = useBrandStore((state) => state.selectedBrand)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BrandType>({
    defaultValues: {
      brand: actionStatus === 'edit' ? selectedBrand.brand : '',
    },
    resolver: zodResolver(BRAND_SCHEMA),
  })

  const handleClose = () => {
    setShowHideModal()
  }

  const handleSaveBrand = async (data: any) => {
    switch (actionStatus) {
      case 'add':
        try {
          await addBrand(data) // this is mutations only 1 parameters needed
          toast.success(<MessageAlert header='Success!' body='Insert success.' />)
        } catch (error) {
          toast.error(<MessageAlert header='Error!' body='Something Wrong.' />)
          throw error
        }
        break
      case 'edit':
        try {
          await updateBrand({ brandId: selectedBrand.id, brand: data }) // this is mutations only 1 parameters needed
          toast.success(<MessageAlert header='Success!' body='Update success.' />)
        } catch (error) {
          toast.error(<MessageAlert header='Error!' body='Something Wrong.' />)
          throw error
        }
        break

      default:
        alert('Action not found')
        throw 'Action not found'
        break
    }

    setShowHideModal()
  }

  return (
    <React.Fragment>
      <AlertDialog open={openModal}>
        <AlertDialogContent>
          <form onSubmit={handleSubmit(handleSaveBrand)}>
            <AlertDialogHeader className='mb-5'>
              <AlertDialogTitle>{actionStatus === 'edit' ? 'Edit Brand' : 'Add New Brand'}</AlertDialogTitle>
              <AlertDialogDescription>
                <Label htmlFor='brand'>Brand</Label>
                <Input id='brand' placeholder='Brand' {...register('brand')} />
                <p className='text-red-600 text-xs'>{errors?.brand?.message}</p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
              <AlertDialogAction type='submit'>Save</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </React.Fragment>
  )
}
