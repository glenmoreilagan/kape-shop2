'use client'
import React, { useState, useEffect, useReducer } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

// API's
import { productFindOneAPI, updateProductAPI } from '@/components/hooks/products'
import { DropDownCategoryAPI, DropDownBrandAPI } from '@/components/hooks/dropdown-menus'

import AppLayout from '@/components/layouts/AppLayout'
import Loader from '@/components/reusable/Loader'

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

const ACTIONS = {
  UPDATEPRODUCTINFO: 'updateProductInfo',
  FILLFROMAPI: 'fillFromApi',
  SUBMIT: 'submit',
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.UPDATEPRODUCTINFO: {
      return {
        ...state,
        [action.field]: action.payload,
      }
    }
    case ACTIONS.FILLFROMAPI: {
      return {
        ...state,
        ...action.payload,
      }
    }
    default: {
      throw new Error('Action not found')
    }
  }
}

const initialState = {
  name: '',
  sku: '',
  description1: '',
  description2: '',
  price: 0,
  category_id: null,
  brand_id: null,
  product_status: 0,
}

export default function IndexEditProduct() {
  const router = useRouter()
  const { isLoading: categoryLoading, error: categoryError, data: categories } = DropDownCategoryAPI()
  const { isLoading: brandLoading, error: brandError, data: brands } = DropDownBrandAPI()
  const searchParams = useSearchParams()
  const { data: product, isLoading, error } = productFindOneAPI(searchParams.get('id'))

  const [stateProduct, dispatch] = useReducer(reducer, initialState)

  const handleInputChange = (e) => {
    dispatch({ type: ACTIONS.UPDATEPRODUCTINFO, field: e.target.name, payload: e.target.value })
  }

  const handleSelectChange = (params) => {
    dispatch({ type: ACTIONS.UPDATEPRODUCTINFO, field: params.field, payload: params.value })
  }

  useEffect(() => {
    dispatch({
      type: ACTIONS.FILLFROMAPI,
      payload: {
        name: product?.data?.name,
        sku: product?.data?.sku,
        category_id: product?.data?.category_id,
        brand_id: product?.data?.brand_id,
        description1: product?.data?.description1,
        description2: product?.data?.description2,
        price: product?.data?.price,
        product_status: product?.data?.product_status,
      },
    })
  }, [product])

  return (
    <AppLayout>
      <div className='p-3 mb-3 bg-white flex justify-between items-center'>
        <div>
          <h1 className='scroll-m-20 text-xl font-semibold tracking-tight'>Products</h1>
        </div>
        <div>
          <Button size='sm' className='w-full' onClick={() => updateProductAPI(searchParams.get('id'), stateProduct)}>
            <BiSave className='mr-2 h-4 w-4' /> Save
          </Button>
        </div>
      </div>
      <div className='flex gap-3 flex-col md:flex-row p-3 bg-white rounded-md'>
        <div className='md:w-1/4'>
          <Label htmlFor='name'>Product Name</Label>
          <Input
            value={stateProduct.name ?? ''}
            type='text'
            name='name'
            id='name'
            placeholder='Product Name'
            onChange={(e) => handleInputChange(e)}
          />

          <Label htmlFor='sku'>SKU</Label>
          <Input
            value={stateProduct.sku ?? ''}
            type='text'
            name='sku'
            id='sku'
            placeholder='SKU'
            onChange={(e) => handleInputChange(e)}
          />

          <Label htmlFor='category'>Select Category</Label>
          <Select
            value={stateProduct.category_id}
            onValueChange={(value) => handleSelectChange({ field: 'category_id', value: value })}
          >
            <SelectTrigger id='category'>
              <SelectValue placeholder='Select Category' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories?.map((row) => (
                  <SelectItem key={row.value} value={row.value}>
                    {row.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Label htmlFor='brand'>Select Brand</Label>
          <Select
            value={stateProduct.brand_id}
            onValueChange={(value) => handleSelectChange({ field: 'brand_id', value: value })}
          >
            <SelectTrigger id='brand'>
              <SelectValue placeholder='Select Brand' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {brands?.map((row) => (
                  <SelectItem key={row.value} value={row.value}>
                    {row.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='md:w-1/4'>
          <Label htmlFor='price'>Price</Label>
          <Input
            value={stateProduct.price ?? ''}
            type='text'
            name='price'
            id='price'
            placeholder='Price'
            onChange={(e) => handleInputChange(e)}
          />
          <Label htmlFor='product_status'>Select Product Status</Label>
          <Select
            value={stateProduct.product_status}
            onValueChange={(value) => handleSelectChange({ field: 'product_status', value: value })}
          >
            <SelectTrigger id='product_status'>
              <SelectValue placeholder='Select Product Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={0}>Active</SelectItem>
                <SelectItem value={1}>Inactive</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='md:w-1/4'>
          <Label htmlFor='description1'>Description 1</Label>
          <Textarea
            value={stateProduct.description1 ?? ''}
            type='text'
            name='description1'
            id='description1'
            placeholder='Description 1'
            rows={4}
            onChange={(e) => handleInputChange(e)}
          />
          <Label htmlFor='description2'>Description 2</Label>
          <Textarea
            value={stateProduct.description2 ?? ''}
            type='text'
            name='description2'
            id='description2'
            placeholder='Description 2'
            rows={4}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
      </div>
      <Loader isLoading={isLoading} />
    </AppLayout>
  )
}
