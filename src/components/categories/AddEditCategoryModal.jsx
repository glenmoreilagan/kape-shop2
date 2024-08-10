import React, { useState, forwardRef, useEffect } from 'react'
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
import useCategoryStore from '@/store/useCategoryStore'

import { addCategoryAPI, updateCategoryAPI } from '@/hooks/categories'

import MessageAlert from '@/components/MessageAlert'
import { toast } from 'react-toastify'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const CATEGORY_SCHEMA = z.object({
  category: z.string().min(1, 'Category is required.'),
})

export default function AddEditCategoryModal({ actionStatus }) {
  const router = useRouter()
  const { mutateAsync: addCategory } = addCategoryAPI()
  const { mutateAsync: updateCategory } = updateCategoryAPI()

  const { openModal, setShowHideModal } = useCategoryStore((state) => state)
  const selectedCategory = useCategoryStore((state) => state.selectedCategory)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: actionStatus === 'edit' ? selectedCategory.category : '',
    },
    resolver: zodResolver(CATEGORY_SCHEMA),
  })

  const handleClose = () => {
    setShowHideModal()
  }

  const handleSaveCategory = async (data) => {
    switch (actionStatus) {
      case 'add':
        try {
          await addCategory(data) // this is mutations only 1 parameters needed
          toast.success(<MessageAlert header='Success!' body='Insert success.' />)
        } catch (error) {
          toast.error(<MessageAlert header='Error!' body='Something Wrong.' />)
          throw error
        }
        break
      case 'edit':
        try {
          await updateCategory({ catId: selectedCategory.id, category: data }) // this is mutations only 1 parameters needed
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
          <form onSubmit={handleSubmit(handleSaveCategory)}>
            <AlertDialogHeader className='mb-5'>
              <AlertDialogTitle>{actionStatus === 'edit' ? 'Edit Category' : 'Add New Category'}</AlertDialogTitle>
              <AlertDialogDescription>
                <Label htmlFor='category'>Category</Label>
                <Input id='category' placeholder='Category' {...register('category')} />
                <p className='text-red-600 text-xs'>{errors?.category?.message}</p>
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
