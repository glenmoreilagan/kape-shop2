'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// components
import AppLayout from '@/components/layouts/appLayout'
import BreadcrumbsComponent from '@/components/reusable/breadcrumbs'
import ItemListModal from '@/components/ItemListModal'

import { TextField, Autocomplete, Button } from '@mui/material'

import newAxios from '@/lib/new-axios'

import { useForm } from 'react-hook-form'

import { MdOutlineSave } from 'react-icons/md'

import crypto from 'crypto'
import uuid from 'react-uuid'

import AutoCompleteController from '@/components/AutoCompleteController'

import { DropDownCategoryAPI, DropDownBrandAPI } from '@/api/dropdown-menus'

import moment from 'moment'

import usePurchaseStore from '@/store/usePurchaseStore'

export default function IndexNewPurchase() {
  const router = useRouter()
  const items = usePurchaseStore((state) => state.items)
  // const setItems = usePurchaseStore((state) => state.setItems)
  const [openItemListModal, setOpenItemListModal] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      document_no: uuid(),
      // document_no: `${crypto.randomBytes(2).toString('hex')}-${crypto.randomBytes(2).toString('hex')}-${crypto
      //   .randomBytes(3)
      //   .toString('hex')}`,
      description: '',
      additionalInfo: '',
      transaction_date: moment().format('MM-DD-YYYY'),
      productStatus: { value: 0, label: 'Active' },
    },
  })

  const onSubmit = async (data) => {
    // const FORMDATA = new FormData()
    // for (let key in data) {
    //   if (key === 'productStatus' || key === 'brand' || key === 'category') {
    //     FORMDATA.append(key, data[key].value)
    //   } else {
    //     FORMDATA.append(key, data[key])
    //   }
    // }

    router.push('/purchases/edit/123')
    return

    try {
      const response = await newAxios.post('api/purchases', { items: items })
      if (response) {
        alert('Success.')
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

  // console.log(items);

  return (
    <AppLayout>
      {/* {isLoading && <h1>Loading...</h1>}
      {error && <h1>An error has occurred: {JSON.stringify(error.message)}</h1>} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='p-3 mb-3 bg-white flex justify-between items-center'>
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
              className='font-bold bg-primary-gray'
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
            <TextField label='Date (mm-dd-yyyy)' variant='outlined' size='small' {...register('transaction_date')} />
          </div>
          {/* <div className='flex flex-col w-full md:w-3/12 gap-3'></div> */}
          <div className='flex flex-col w-full md:w-3/12 gap-3'>
            <TextField label='Description' variant='outlined' multiline maxRows={4} {...register('description')} />
            <TextField
              label='Additional Information'
              variant='outlined'
              multiline
              maxRows={4}
              {...register('additionalInfo')}
            />
          </div>
          {/* <div className='flex flex-col w-full md:w-3/12 gap-3'></div> */}
        </div>
      </form>

      <div className=''>
        <Button
          className='font-bold bg-primary-gray'
          type='button'
          variant='contained'
          size='small'
          startIcon={<MdOutlineSave />}
          onClick={handleAddItem}
        >
          Add Item
        </Button>
        <table className='w-full'>
          <thead>
            <tr>
              <td>ID</td>
              <td>ITEM</td>
            </tr>
          </thead>
          <tbody>
            {items?.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <input type='text' value={item.quantity} className='border px-3 w-24 text-center' />
                  </td>
                  <td>{item.price}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <ItemListModal open={openItemListModal} handleClose={handleClose} />
    </AppLayout>
  )
}
