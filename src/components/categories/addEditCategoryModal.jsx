import React, { useState, forwardRef } from 'react'

// MUI
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Slide } from '@mui/material'

// store
import useCategoryStore from '@/store/useCategoryStore'

// react hook form
import { useForm, Controller } from 'react-hook-form'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})
import { addCategoryAPI, updateCategoryAPI } from '@/api/categories'

export default function AddEditCategoryModal({ actionStatus }) {
  const { mutateAsync: addCategory } = addCategoryAPI()
  const { mutateAsync: updateCategory } = updateCategoryAPI()

  const { openModal, setShowHideModal } = useCategoryStore((state) => state)
  const selectedCategory = useCategoryStore((state) => state.selectedCategory)
  const refetch = useCategoryStore((state) => state.refetch)

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
        await addCategory(data) // this is mutations only 1 parameters needed
        refetch()
        break
      case 'edit':
        await updateCategory({ catId: selectedCategory._id, category: data }) // this is mutations only 1 parameters needed
        refetch()
        break

      default:
        throw 'Action not found'
        break
    }

    setShowHideModal()
  }

  return (
    <React.Fragment>
      <Dialog fullWidth={true} maxWidth={'sm'} open={openModal} onClose={handleClose} TransitionComponent={Transition}>
        <form onSubmit={handleSubmit(handleSaveCategory)}>
          <DialogTitle>{actionStatus === 'edit' ? 'Edit Category' : 'Add New Category'}</DialogTitle>
          <DialogContent>
            <Box className='mt-3'>
              <TextField
                className='w-full'
                id='category'
                label='Category'
                placeholder='Category'
                variant='outlined'
                {...register('category')}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button type='submit'>Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  )
}
