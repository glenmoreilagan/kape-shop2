'use client'
import React, { useState, useEffect } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

// API's
import { productFindOneAPI } from '@/api/products'
import { DropDownCategoryAPI } from '@/api/dropdown-menus'

import AppLayout from '@/components/layouts/AppLayout'
import AutoCompleteController from '@/components/AutoCompleteController'

import { TextField, Autocomplete, Button } from '@mui/material'

export default function IndexEditProduct() {
  const router = useRouter()
  const { isLoading: categoryLoading, error: categoryError, data: categories } = DropDownCategoryAPI()
  const searchParams = useSearchParams()
  const { data: product, isLoading, error } = productFindOneAPI(searchParams.get('id'))

  const { data: productData } = product ?? {}

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productName: '',
      sku: '',
      description: '',
      additionalInfo: '',
      price: 0,
      quantity: 0,
      category: null,
      brand: null,
      productImage: null,
      productStatus: { value: 0, label: 'Active' },
    },
  })

  if (isLoading) return <h1>Loading...</h1>

  return (
    <AppLayout>
      <div className='flex flex-col w-full md:w-3/12 gap-3'>
        <TextField
          value={productData?.name}
          label='Product Name'
          variant='outlined'
          size='small'
          {...register('productName')}
        />
        <TextField value={productData?.sku} label='SKU' variant='outlined' size='small' {...register('sku')} />
        <AutoCompleteController
          control={control}
          options={categories}
          name='category'
          label='Select Category'
          selected={productData?.category_id}
        />
        <AutoCompleteController
          control={control}
          options={categories}
          name='category'
          label='Select Brand'
          selected={productData?.brand_id}
        />
      </div>
    </AppLayout>
  )
}
