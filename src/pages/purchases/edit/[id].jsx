import React, { useEffect, useState, useReducer } from 'react'
import Link from 'next/link'

import { useRouter, useSearchParams } from 'next/navigation'

import { purchaseFindOneAPI } from '@/components/hooks/purchases'

import BreadcrumbsComponent from '@/components/reusable/Breadcrumbs'
import AppLayout from '@/components/layouts/AppLayout'
import PurchaseItemTable from '@/components/purchases/PurchaseItemTable'
import ItemListModal from '@/components/purchases/ItemListModal'
import Loader from '@/components/reusable/Loader'
import DatePicker, { DefaultDatePicker } from '@/components/reusable/DatePicker'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { BiSave, BiCalendar as CalendarIcon } from 'react-icons/bi'

import { useForm, Controller } from 'react-hook-form'

import newAxios from '@/lib/new-axios'

import moment from 'moment'

import usePurchaseStore from '@/store/usePurchaseStore'

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

export default function IndexEditPurchases() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const purchase_uuid = searchParams.get('id')
  const [state, dispatch] = useReducer(reducer, initailState)
  const { isLoading, error, data: purchases } = purchaseFindOneAPI(purchase_uuid)
  // const setItems = usePurchaseStore((state) => state.setItems)
  // const items = usePurchaseStore((state) => state.items)
  const [openItemListModal, setOpenItemListModal] = useState(false)
  const [transactionDate, setTransactionDate] = useState(moment().format('YYYY-MM-DD'))
  const [initialState, setInitialState] = useState({
    document_no: '',
    description: '',
    description1: '',
  })

  // const purchasedProduct = purchases?.purchases.map((row, i) => {
  //   return {
  //     id: row.id,
  //     document_id: row.document_id,
  //     product_id: row.product_id,
  //     category_id: row.category_id,
  //     brand_id: row.brand_id,
  //     quantity: row.quantity,
  //     price: row.price,
  //     product_name: row.name,
  //   }
  // })

  // console.log(purchasedProduct)

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
  })

  const onSubmit = async (e) => {
    e.preventDefault()

    const { document_no, description1, description2 } = e.target
    const payload = {
      purchase_id: purchases?.document?.id,
      document_no: document_no.value,
      description1: description1.value,
      description2: description2.value,
      transaction_date: moment(transactionDate).format('YYYY-MM-DD'),
    }

    try {
      const response = await newAxios.put(`api/purchases/${purchases?.document?.id}`, payload)
      alert('Update success')
    } catch (error) {
      // alert('Something wrong.')
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
    reset({
      document_no: purchases?.document?.document_no,
      description1: purchases?.document?.description1,
      description2: purchases?.document?.description2,
    })
    setTransactionDate(moment(purchases?.document?.transaction_date).format('YYYY-MM-DD'))
  }, [purchases])

  return (
    <AppLayout>
      <div className='mb-5'>
        <form onSubmit={onSubmit}>
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
                className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                type='date'
                value={transactionDate}
                onChange={(e) => setTransactionDate(e.target.value)}
                id='transaction_date'
              /> */}

              <DefaultDatePicker
                value={transactionDate}
                onChange={(e) => setTransactionDate(e.target.value)}
                id='transaction_date'
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
      {/* <Loader isLoading={isLoading} /> */}
    </AppLayout>
  )
}
