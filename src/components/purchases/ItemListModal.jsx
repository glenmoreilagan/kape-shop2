import React, { useState, forwardRef, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'

// MUI
// import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Slide } from '@mui/material'

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

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BiPlus, BiMinus, BiEditAlt, BiTrashAlt } from 'react-icons/bi'
import { Checkbox } from '../ui/checkbox'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

import MessageAlert from '@/components/MessageAlert'
import { toast } from 'react-toastify'

import moment from 'moment'

// API's
import { productAPI } from '@/hooks/products'

const PHPFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
})

import usePurchaseStore from '@/store/usePurchaseStore'
import newAxios from '@/lib/new-axios'

import { addPurchaseProduct } from '@/hooks/purchases'

export default function ItemListModal({ open, handleClose, documentState }) {
  const { isLoading, error, data: products } = productAPI()
  const { mutateAsync: addPurchaseProductMutate } = addPurchaseProduct()
  const [cloneProducts, setCloneProudcts] = useState()

  const addItemToList = async () => {
    const newProducts = cloneProducts.filter((item) => item.is_selected === true)

    try {
      // const response = await newAxios.post('/api/purchases/add-product', {
      //   document: documentState.document,
      //   products: newProducts,
      // })

      const response = await addPurchaseProductMutate({ documentState, newProducts })
      setCloneProudcts(cloneProducts.map((item) => ({ ...item, is_selected: false })))
      handleClose()
    } catch (error) {
      throw error
    }
  }

  const handleSelectedRows = (params) => {
    const newProducts = cloneProducts.map((item) => {
      if (item.id === params.row.id) {
        return { ...item, is_selected: params.checked }
      }

      return item
    })

    setCloneProudcts(newProducts)
  }

  const handleCheckAll = (checked) => {
    const newProducts = cloneProducts.map((item) => {
      return { ...item, is_selected: checked }
    })
    setCloneProudcts(newProducts)
  }

  useEffect(() => {
    const newProducts = products?.data.map((item) => {
      return { ...item, is_selected: false }
    })
    setCloneProudcts(newProducts)
  }, [products])

  return (
    <React.Fragment>
      <AlertDialog open={open}>
        <AlertDialogContent className='md:max-w-screen-lg'>
          <AlertDialogHeader className='mb-5'>
            <AlertDialogTitle>Item List</AlertDialogTitle>
            <div className='w-full h-[50vh] overflow-y-auto'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-14 text-center'>
                      <Checkbox onCheckedChange={(checked) => handleCheckAll(checked)} />
                    </TableHead>
                    <TableHead className='w-[200px]'>Product Name</TableHead>
                    <TableHead className='w-[200px] text-center'>Category</TableHead>
                    <TableHead className='w-[200px] text-center'>Brand</TableHead>
                    <TableHead className='w-[200px] text-right'>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cloneProducts?.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className='text-center'>
                        <Checkbox
                          checked={row.is_selected}
                          onCheckedChange={(checked) => handleSelectedRows({ checked: checked, row: row })}
                        />
                      </TableCell>
                      <TableCell className='font-medium'>{row.name}</TableCell>
                      <TableCell className='text-center'>{row.categories?.category}</TableCell>
                      <TableCell className='text-center'>{row.brands?.brand}</TableCell>
                      <TableCell className='text-right'>{row.price}</TableCell>
                      {/* <TableCell className='text-center'>
                          <Button onClick={() => removeItem(row)} variant='outline' size='icon' className='text-lg'>
                            <BiTrashAlt />
                          </Button>
                        </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={addItemToList}>Add Selected Items</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </React.Fragment>
  )
}
