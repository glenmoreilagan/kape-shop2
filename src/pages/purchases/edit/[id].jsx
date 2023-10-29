import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { useRouter, useSearchParams } from 'next/navigation'

import { purchaseFindOneAPI } from '@/api/purchases'

import BreadcrumbsComponent from '@/components/reusable/Breadcrumbs'
import AppLayout from '@/components/layouts/AppLayout'
import PurchaseItemTable from '@/components/purchases/PurchaseItemTable'
import ItemListModal from '@/components/purchases/ItemListModal'
import Loader from '@/components/reusable/Loader'
import DatePicker from '@/components/reusable/DatePicker'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { BiSave, BiCalendar as CalendarIcon } from 'react-icons/bi'

import { useForm, Controller } from 'react-hook-form'

import newAxios from '@/lib/new-axios'

import moment from 'moment'

import usePurchaseStore from '@/store/usePurchaseStore'

export default function IndexEditPurchases() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const purchase_uuid = searchParams.get('id')

  const { isLoading, error, data: purchases } = purchaseFindOneAPI(purchase_uuid)
  // const setItems = usePurchaseStore((state) => state.setItems)
  // const items = usePurchaseStore((state) => state.items)
  const [openItemListModal, setOpenItemListModal] = useState(false)
  const [transactionDate, SetTransactionDate] = useState(moment())
  const [initialState, setInitialState] = useState({
    document_no: '',
    description: '',
    description1: '',
  })

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
      purchase_id: purchases.data.id,
      document_no: document_no.value,
      description1: description1.value,
      description2: description2.value,
      transaction_date: moment(transactionDate).format(),
    }

    try {
      const response = await newAxios.put(`api/purchases/${purchases.data.id}`, payload)
      alert(response.data.message)
    } catch (error) {
      // alert('Something wrong.')
      throw new Error(`HTTP ERROR: ${error}`)
    }
  }

  const handleAddItem = () => {
    setOpenItemListModal(true)
  }

  const handleClose = () => {
    setOpenItemListModal(false)
  }

  useEffect(() => {
    if (purchases?.data?.purchases) {
      reset({
        document_no: purchases?.data.document_no,
        description1: purchases?.data.description1,
        description2: purchases?.data.description2,
      })

      SetTransactionDate(moment(purchases?.data.transaction_date).format())
    }
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
                placeholder='Product Name'
                {...register('document_no')}
                disabled={true}
              />

              <Label htmlFor='transaction_date'>Transaction Date</Label>
              <DatePicker date={transactionDate} setDate={SetTransactionDate} id='transaction_date' />
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
        <PurchaseItemTable purchases={purchases?.data.purchases} handleAddItem={handleAddItem} />
      </div>

      <ItemListModal open={openItemListModal} handleClose={handleClose} />
      <Loader isLoading={isLoading} />
    </AppLayout>
  )
}
