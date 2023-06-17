import React, { useState, forwardRef } from 'react'

// MUI
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Slide } from '@mui/material'

// store
import useBrandStore from '@/store/useBrandStore'

// react hook form
import { useForm, Controller } from 'react-hook-form'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})
import { addBrandAPI, updateBrandAPI } from '@/api/brands'

export default function AddEditBrandModal({ actionStatus }) {
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
        } catch (error) {
          alert(error)
        }
        break
      case 'edit':
        try {
          await updateBrand({ brandId: selectedBrand._id, brand: data }) // this is mutations only 1 parameters needed
        } catch (error) {
          alert(error)
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
      <Dialog fullWidth={true} maxWidth={'sm'} open={openModal} onClose={handleClose} TransitionComponent={Transition}>
        <form onSubmit={handleSubmit(handleSaveBrand)}>
          <DialogTitle>{actionStatus === 'edit' ? 'Edit Brand' : 'Add New Brand'}</DialogTitle>
          <DialogContent>
            <Box className='mt-3'>
              <TextField
                className='w-full'
                id='brand'
                label='Brand'
                placeholder='Brand'
                variant='outlined'
                {...register('brand')}
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
