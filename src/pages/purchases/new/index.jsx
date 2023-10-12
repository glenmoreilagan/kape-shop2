'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// components
import AppLayout from '@/components/layouts/AppLayout'
import BreadcrumbsComponent from '@/components/reusable/Breadcrumbs'
import ItemListModal from '@/components/purchases/ItemListModal'

import { TextField } from '@mui/material'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { BiSave } from 'react-icons/bi'

import newAxios from '@/lib/new-axios'
import { generateDocumentNumber } from '@/lib/generate-document-number'

import { useForm } from 'react-hook-form'

import { MdOutlineSave } from 'react-icons/md'

// import { uuid, v4 } from 'uuid'

import PurchaseItemTable from '@/components/purchases/PurchaseItemTable'

import moment from 'moment'

import usePurchaseStore from '@/store/usePurchaseStore'

export default function IndexNewPurchase() {
  const router = useRouter()
  const items = usePurchaseStore((state) => state.items)
  const setItems = usePurchaseStore((state) => state.setItems)
  const [openItemListModal, setOpenItemListModal] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      document_no: generateDocumentNumber(),
      description: '',
      description1: '',
      transaction_date: moment().format('MM-DD-YYYY'),
    },
  })

  const onSubmit = async (data) => {
    const payload = { head: data, items: items }
    try {
      const response = await newAxios.post('api/purchases', payload)
      if (response) {
        alert('Success.')
        // router.push(`/purchases/edit/${response.data.document_no}`)
      }
    } catch (error) {
      alert('Something wrong.')
      throw error
    }
  }

  const handleAddItem = () => {
    setOpenItemListModal(true)
  }

  const handleClose = () => {
    setOpenItemListModal(false)
  }

  useEffect(() => {
    setItems([])
  }, [])

  return (
    <AppLayout>
      {/* {isLoading && <h1>Loading...</h1>}
      {error && <h1>An error has occurred: {JSON.stringify(error.message)}</h1>} */}
      <div className='mb-5'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='p-3 mb-3 bg-white flex justify-between items-center rounded-md'>
            <div>
              <h1 className='scroll-m-20 text-xl font-semibold tracking-tight'>Purchases</h1>
            </div>
            <div>
              <Button size='sm' className='w-full' type='submit'>
                <BiSave className='mr-2 h-4 w-4' /> Save
              </Button>
            </div>
          </div>
          <div className='p-3 bg-white flex flex-col md:flex-row gap-3'>
            <div className='flex flex-col w-full md:w-3/12 gap-3'>
              <TextField
                label='Document Number'
                variant='outlined'
                size='small'
                {...register('document_no')}
                disabled={true}
              />
              <TextField
                label='Date (mm-dd-yyyy)'
                variant='outlined'
                size='small'
                {...register('transaction_date')}
                disabled={true}
              />
            </div>
            {/* <div className='flex flex-col w-full md:w-3/12 gap-3'></div> */}
            <div className='flex flex-col w-full md:w-3/12 gap-3'>
              <TextField
                label='Description'
                variant='outlined'
                multiline
                rows={3}
                maxRows={3}
                {...register('description')}
              />
            </div>
            <div className='flex flex-col w-full md:w-3/12 gap-3'>
              <TextField
                label='Additional Information'
                variant='outlined'
                multiline
                rows={3}
                maxRows={3}
                {...register('description1')}
              />
            </div>
            {/* <div className='flex flex-col w-full md:w-3/12 gap-3'></div> */}
          </div>
        </form>
      </div>

      <div className='p-3 bg-white'>
        <PurchaseItemTable handleAddItem={handleAddItem} />
      </div>

      <ItemListModal open={openItemListModal} handleClose={handleClose} />
    </AppLayout>
  )
}
