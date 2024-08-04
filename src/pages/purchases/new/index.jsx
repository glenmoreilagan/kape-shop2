'use client'
import React, { useState, useEffect, useReducer } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// components
import AppLayout from '@/components/layouts/AppLayout'
import BreadcrumbsComponent from '@/components/reusable/Breadcrumbs'
import ItemListModal from '@/components/purchases/ItemListModal'
import PurchaseItemTable from '@/components/purchases/PurchaseItemTable'
import DatePicker, { DefaultDatePicker } from '@/components/reusable/DatePicker'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { BiSave, BiCalendar as CalendarIcon } from 'react-icons/bi'

import newAxios from '@/lib/new-axios'
import { generateDocumentNumber } from '@/lib/generate-document-number'

import { useForm } from 'react-hook-form'

import { MdOutlineSave } from 'react-icons/md'

// import { uuid, v4 } from 'uuid'

import moment from 'moment'

import usePurchaseStore from '@/store/usePurchaseStore'
import { purchaseFindOneAPI } from '@/hooks/purchases'
import { useSearchParams } from 'next/navigation'

const ACTIONS = {
  DOCUMENT: 'DOCUMENT',
  PURCHASE: 'PURCHASE',
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.DOCUMENT:
      return { ...state, document: action.payload.document }
      break
    case ACTIONS.PURCHASE:
      const finalPurhcasesObj = action.payload.purchases.map((row, i) => {
        return {
          id: row.id,
          document_id: row.document_id,
          product_id: row.product_id,
          category_id: row.category_id,
          brand_id: row.brand_id,
          quantity: row.quantity,
          price: row.price,
          product_name: row.name,
        }
      })
      return { ...state, purchases: finalPurhcasesObj }
      break

    default:
      console.log('Method not found.')
      return
      break
  }
}

const initailState = {
  document: null,
  purchases: null,
}

export default function IndexNewPurchase() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const purchase_uuid = searchParams.get('id')
  const [state, dispatch] = useReducer(reducer, initailState)
  const { isLoading, error, data: purchases } = purchaseFindOneAPI(purchase_uuid)
  const [openItemListModal, setOpenItemListModal] = useState(false)
  const [transactionDate, setTransactionDate] = useState(moment().format('YYYY-MM-DD'))

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    setValue,
    formState: { errors, isValidating },
  } = useForm({ mode: 'onBlur' })

  const onSubmit = async (e) => {
    const { document_no, description1, description2 } = e
    const payload = {
      document_no: document_no,
      description1: description1,
      description2: description2,
      transaction_date: moment(transactionDate).format(),
    }

    try {
      const response = await newAxios.post('api/purchases', payload)
      dispatch({ type: ACTIONS.DOCUMENT, payload: { document: response.data } })
      alert('Saving Success.')
      // router.push(`${router.pathname}?id=${response.data.uuid}`)
      router.push(`edit/${response.data.uuid}`)
    } catch (error) {
      // alert('Something wrong.')
      throw error
    }
  }

  const handleAddItem = () => {
    if (!state.document) {
      alert('Please create document first.')
      return
    }
    setOpenItemListModal(true)
  }

  const handleClose = () => {
    setOpenItemListModal(false)
  }

  // useEffect(() => {
    // reset({
    //   document_no: purchases?.document?.document_no,
    //   description1: purchases?.document?.description1,
    //   description2: purchases?.document?.description2,
    // })
    // setTransactionDate(moment(purchases?.document?.transaction_date).format('YYYY-MM-DD'))
  // }, [purchases])

  const getDocumentNumber = async () => {
    try {
      const response = await newAxios.get('/api/purchases/generate-document-number')

      reset({
        document_no: response.data,
        description1: purchases?.document?.description1,
        description2: purchases?.document?.description2,
        transaction_date: moment().format('Y-MM-DD'),
      })
    } catch (error) {
      throw new Error('Something went wrong.')
    }
  }

  useEffect(() => {
    getDocumentNumber()
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
              <Button disabled={isValidating} size='sm' className='w-full' type='submit'>
                <BiSave className='mr-2 h-4 w-4' /> Save
              </Button>
            </div>
          </div>
          <div className='p-3 bg-white flex flex-col md:flex-row gap-3'>
            <div className='flex flex-col w-full md:w-3/12 gap-3'>
              <Label htmlFor='name'>Document No.</Label>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='Document No.'
                {...register('document_no')}
                disabled={true}
              />

              <Label htmlFor='transaction_date'>Transaction Date</Label>
              {/* <DatePicker date={transactionDate} setDate={setTransactionDate} id='transaction_date' /> */}
              {/* <input
                className='px-3 py-1 border border-gray-100 rounded-md'
                type='date'
                value={transactionDate}
                onChange={(e) => setTransactionDate(e.target.value)}
                id='transaction_date'
              /> */}

              <DefaultDatePicker
                // value={transactionDate}
                // onChange={(e) => setTransactionDate(e.target.value)}
                id='transaction_date'
                {...register('transaction_date')}
              />
            </div>
            {/* <div className='flex flex-col w-full md:w-3/12 gap-3'></div> */}
            <div className='flex flex-col w-full md:w-3/12 gap-3'>
              <Label htmlFor='description1'>Description 1</Label>
              <Textarea
                type='text'
                name='description1'
                id='description1'
                placeholder='Description 1'
                rows={4}
                {...register('description1')}
              />
            </div>
            <div className='flex flex-col w-full md:w-3/12 gap-3'>
              <Label htmlFor='description2'>Description 2</Label>
              <Textarea
                type='text'
                name='description2'
                id='description2'
                placeholder='Description 2'
                rows={4}
                {...register('description2')}
              />
            </div>
            {/* <div className='flex flex-col w-full md:w-3/12 gap-3'></div> */}
          </div>
        </form>
      </div>

      <div className='p-3 bg-white'>
        <PurchaseItemTable purchases={purchases} handleAddItem={handleAddItem} dispatchReducer={dispatch} />
      </div>

      <ItemListModal
        open={openItemListModal}
        handleClose={handleClose}
        documentState={state}
        dispatchReducer={dispatch}
      />
    </AppLayout>
  )
}
