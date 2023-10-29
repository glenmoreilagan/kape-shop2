import React, { useState, forwardRef, useEffect } from 'react'

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

// react hook form
import { useForm, Controller } from 'react-hook-form'

import { addCategoryAPI, updateCategoryAPI } from '@/api/categories'

import MessageAlert from '@/components/MessageAlert'
import { toast } from 'react-toastify'

export default function AddEditCategoryModal({ actionStatus }) {
  const { mutateAsync: addCategory } = addCategoryAPI()
  const { mutateAsync: updateCategory } = updateCategoryAPI()

  const { openModal, setShowHideModal } = useCategoryStore((state) => state)
  const selectedCategory = useCategoryStore((state) => state.selectedCategory)

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      category: actionStatus === 'edit' ? selectedCategory.category : '',
    },
  })

  const handleClose = () => {
    setShowHideModal()
  }

  const handleSaveCategory = async (data) => {
    switch (actionStatus) {
      case 'add':
        try {
          await addCategory(data) // this is mutations only 1 parameters needed
          toast.success(<MessageAlert header='Success!' body='Success.' />)
        } catch (error) {
          toast.error(<MessageAlert header='Error!' body='Something Wrong.' />)
          throw error
        }
        break
      case 'edit':
        try {
          await updateCategory({ catId: selectedCategory.id, category: data }) // this is mutations only 1 parameters needed
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
          <form onSubmit={handleSubmit(handleSaveCategory)}>
            <AlertDialogHeader className='mb-5'>
              <AlertDialogTitle>{actionStatus === 'edit' ? 'Edit Category' : 'Add New Category'}</AlertDialogTitle>
              <AlertDialogDescription>
                <Label htmlFor='category'>Category</Label>
                <Input id='category' placeholder='Category' {...register('category')} />
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
