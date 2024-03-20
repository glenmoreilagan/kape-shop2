import React, { useState, forwardRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

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

// react hook form
import { useForm, Controller } from 'react-hook-form'

import { addBrandAPI, updateBrandAPI } from '@/api/brands'

import MessageAlert from '@/components/MessageAlert'
import { toast } from 'react-toastify'

export default function AddEditBrandModal({ actionStatus }) {
  const router = useRouter()
  const params = useSearchParams()
  
  const { mutateAsync: addBrand } = addBrandAPI()
  const { mutateAsync: updateBrand } = updateBrandAPI()

  const { openModal, setShowHideModal } = useBrandStore((state) => state)
  const selectedBrand = useBrandStore((state) => state.selectedBrand)

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      brand: actionStatus === 'edit' ? selectedBrand.brand : '',
    },
  })

  const handleClose = () => {
    setShowHideModal()
  }

  const handleSaveBrand = async (data) => {
    switch (actionStatus) {
      case 'add':
        try {
          await addBrand(data) // this is mutations only 1 parameters needed
          toast.success(<MessageAlert header='Success!' body='Success.' />)
        } catch (error) {
          toast.error(<MessageAlert header='Error!' body='Something Wrong.' />)
          throw error
        }
        break
      case 'edit':
        try {
          await updateBrand({ brandId: selectedBrand.id, brand: data }) // this is mutations only 1 parameters needed
          toast.success(<MessageAlert header='Success!' body='Success.' />)
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
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={setShowHideModal}>Cancel</AlertDialogCancel>
              <AlertDialogAction type='submit'>Save</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </React.Fragment>
  )
}
