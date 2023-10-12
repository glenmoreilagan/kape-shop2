import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { useRouter, useSearchParams } from 'next/navigation'

import { purchaseFindOneAPI } from '@/api/purchases'

import BreadcrumbsComponent from '@/components/reusable/Breadcrumbs'
import AppLayout from '@/components/layouts/AppLayout'
import PurchaseItemTable from '@/components/purchases/PurchaseItemTable'
import ItemListModal from '@/components/purchases/ItemListModal'
import Loader from '@/components/reusable/Loader'

import { TextField, Button } from '@mui/material'
import { MdOutlineSave } from 'react-icons/md'

import { useForm, Controller } from 'react-hook-form'

import newAxios from '@/lib/new-axios'

import moment from 'moment'

import usePurchaseStore from '@/store/usePurchaseStore'
import TextFieldController from '@/components/TextFieldController'

export default function IndexEditPurchases() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const purchase_uuid = searchParams.get('id')

  const { isLoading, error, data: purchases } = purchaseFindOneAPI(purchase_uuid)
  const setItems = usePurchaseStore((state) => state.setItems)
  const items = usePurchaseStore((state) => state.items)
  const [openItemListModal, setOpenItemListModal] = useState(false)
  const [initialState, setInitialState] = useState({
    document_no: '',
    description: '',
    description1: '',
    transaction_date: '',
  })

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
  })

  const onSubmit = async (e) => {
    e.preventDefault()

    const { document_no, description, description1, transaction_date } = e.target
    const payload = {
      head: {
        purchase_id: +purchase_id,
        document_no: document_no.value,
        description: description.value,
        description1: description1.value,
        transaction_date: moment().format('Y-MM-DD'),
      },
      items: items,
    }
    console.log(payload)
    return
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
    if (purchases?.data?.purchases) {
      setInitialState({
        ...initialState,
        document_no: purchases?.data.document_no,
        // description: purchases?.data.purchases[0].description,
        // description1: purchases?.data.purchases[0].description1,
        transaction_date: purchases?.data.transaction_date,
      })
      purchases?.data.purchases.map((item, i) => {
        setItems({
          purchase_id: item.id,
          id: item.product_id,
          document_id: item.document_id,
          transaction_date: item.transaction_date,
          description: item.description,
          description1: item.description1,
          product_id: item.product_id,
          category_id: item.category_id,
          brand_id: item.brand_id,
          quantity: item.quantity,
          price: item.quantity * item.price,
          original_price: item.price,
          name: item.purchased_product?.name,
        })
      })
    }
  }, [purchases])

  return (
    <AppLayout>
      <div className='mb-5'>
        <form onSubmit={onSubmit}>
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
              <TextFieldController
                name={'document_no'}
                label='Document Number'
                initialState={initialState}
                setInitialState={setInitialState}
              />
              {/* <TextField
                label='Document Number'
                variant='outlined'
                value={initialState.document_no}
                size='small'
                disabled={true}
              /> */}
              <TextField
                value={initialState?.transaction_date}
                label='Date (mm-dd-yyyy)'
                variant='outlined'
                size='small'
                {...register('transaction_date')}
                disabled={true}
                InputLabelProps={{ shrink: true }}
              />
            </div>
            {/* <div className='flex flex-col w-full md:w-3/12 gap-3'></div> */}
            <div className='flex flex-col w-full md:w-3/12 gap-3'>
              <TextField label='Description' variant='outlined' multiline rows={3} {...register('description')} />
            </div>
            <div className='flex flex-col w-full md:w-3/12 gap-3'>
              <TextField
                label='Additional Information'
                variant='outlined'
                multiline
                rows={3}
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
      <Loader isLoading={isLoading} />
    </AppLayout>
  )
}
