'use client'
import React, { useState, useRef } from 'react'
import Link from 'next/link'

// components
import AppLayout from '@/components/layouts/appLayout'
import BreadcrumbsComponent from '@/components/reusable/breadcrumbs'

import { TextField, Autocomplete, Button } from '@mui/material'

import newAxios from '@/lib/new-axios'

import { useForm } from 'react-hook-form'

import { MdOutlineSave } from 'react-icons/md'

import crypto from 'crypto'

const options = [
  { value: '0', label: 'Active' },
  { value: '1', label: 'Inactive' },
]

import AutoCompleteController from '@/components/AutoCompleteController'

import { DropDownCategoryAPI, DropDownBrandAPI } from '@/api/dropdown-menus'

export default function IndexNewProduct() {
  const { isLoading: categoryLoading, error: categoryError, data: categories } = DropDownCategoryAPI()
  const { isLoading: brandLoading, error: brandError, data: brands } = DropDownBrandAPI()
  const [productImage, setProductImage] = useState()
  const [displayImage, setDisplayImage] = useState('/noimage.jpg')
  const inputRef = useRef(null)

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productName: '',
      sku: crypto.randomBytes(6).toString('hex'),
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

  const onSubmit = async (data) => {
    const FORMDATA = new FormData()
    for (let key in data) {
      if (key === 'productStatus' || key === 'brand' || key === 'category') {
        FORMDATA.append(key, data[key].value)
      } else {
        FORMDATA.append(key, data[key])
      }
    }

    FORMDATA.append('productImage', productImage)
    
    try {
      const response = await newAxios.post('api/products', FORMDATA)
      if (response) {
        alert('Success.')
      }
    } catch (error) {
      alert('Something wrong.')
      throw error
    }
  }

  const handleUploadClick = () => {
    // 👇 We redirect the click event onto the hidden input element
    inputRef.current?.click()
  }

  const handleFileChange = (e) => {
    if (!e.target.files || !e.target.files[0]) {
      setDisplayImage('/noimage.jpg')
      setProductImage(null)
      return
    }

    setProductImage(e.target.files[0])
    setDisplayImage(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <AppLayout>
      {/* {isLoading && <h1>Loading...</h1>}
      {error && <h1>An error has occurred: {JSON.stringify(error.message)}</h1>} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='p-3 mb-3 bg-white flex justify-between items-center'>
          <div>
            <BreadcrumbsComponent>
              <Link href='/products' className='text-sm'>
                Products
              </Link>
              <span className='text-sm'>New Products</span>
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
            <TextField label='Product Name' variant='outlined' size='small' {...register('productName')} />
            <TextField label='SKU' variant='outlined' size='small' {...register('sku')} />

            <AutoCompleteController control={control} options={categories} name='category' label='Select Category' />
            <AutoCompleteController control={control} options={brands} name='brand' label='Select Brand' />
          </div>
          <div className='flex flex-col w-full md:w-3/12 gap-3'>
            <TextField label='Price' variant='outlined' size='small' {...register('price')} />
            {/* <TextField label='Quantity' variant='outlined' size='small' {...register('quantity')} /> */}

            {/* 
              Reference: https://stackoverflow.com/questions/70696870/changing-autocomplete-value-using-react-hook-form-material-ui
              This is sample to get value from autocomplete when submited the form
              The getting value is the selected object
            */}
            {/* <Controller
              render={({ field }) => (
                <Autocomplete
                // disableCloseOnSelect
                onChange={(e, newValue) => {
                  field.onChange(newValue)
                }}
                value={field.value || null}
                options={options}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderInput={(params) => <TextField {...params} label='Product Status' size='small' />}
                />
                )}
                name='productStatus'
                control={control}
              /> */}

            <AutoCompleteController control={control} options={options} name='productStatus' label='Product Status' />
          </div>
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
          <div className='flex flex-col w-full md:w-3/12 gap-3'>
            <img src={displayImage} alt={productImage?.name} className='w-full h-36' />
            <Button
              className='bg-primary-gray text-white'
              variant='contained'
              onClick={handleUploadClick}
              title={productImage?.name}
            >
              {productImage ? `${productImage.name.slice(0, 20)}...` : 'Browse Image'}
            </Button>
            <input type='file' ref={inputRef} onChange={handleFileChange} style={{ display: 'none' }} />
          </div>
        </div>
      </form>
    </AppLayout>
  )
}
