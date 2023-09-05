'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// components
import AppLayout from '@/components/layouts/AppLayout'
import BreadcrumbsComponent from '@/components/reusable/Breadcrumbs'
import ItemListModal from '@/components/purchases/ItemListModal'

import { TextField, Button } from '@mui/material'

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
          <div className='p-3 mb-5 bg-white flex justify-between items-center'>
            <div>
              <BreadcrumbsComponent>
                <Link href='/purchases' className='text-sm'>
                  Purchases
                </Link>
                <span className='text-sm'>New Purchase</span>
              </BreadcrumbsComponent>
            </div>
            <div>
              <Button
                className='bg-primary-gray'
                type='submit'
                variant='contained'
                size='small'
                startIcon={<MdOutlineSave />}
              >
                Save
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