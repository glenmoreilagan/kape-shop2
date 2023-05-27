'use client'
import React, { useState, useRef } from 'react'
import AppLayout from '@/components/layouts/appLayout'

import { TextField, Autocomplete, Button } from '@mui/material'

import { useQuery } from '@tanstack/react-query'
import newAxios from '@/lib/new-axios'

import { useForm, Controller } from 'react-hook-form'

import { MdOutlineSave } from 'react-icons/md'

export default function IndexNewProduct() {
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
      sku: '',
      description: '',
      additionalInfo: '',
      price: '',
      quantity: '',
      coffeeType: ['Arabica'],
      roastLevel: ['Light'],
      productImage: '',
      productStatus: { value: 'active', label: 'Active' },
    },
  })

  const onSubmit = async (data) => {
    const FORMDATA = new FormData()
    for (let key in data) {
      if (key === 'productStatus') {
        FORMDATA.append(key, data[key].value)
      } else {
        FORMDATA.append(key, data[key])
      }
    }

    FORMDATA.append('productImage', productImage)
    // console.log([...FORMDATA])

    try {
      const response = await newAxios.post('api/products', FORMDATA, {
        headers: {
          // 'content-type': 'multipart/form-data',
        },
      })
    } catch (error) {}
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => newAxios.get('https://jsonplaceholder.typicode.com/todos/1'),
  })

  const options = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ]

  const coffeeTypes = ['Arabica', 'Robusta']
  const roastLevels = ['Light', 'Medium', 'Dark']

  const handleUploadClick = () => {
    // 👇 We redirect the click event onto the hidden input element
    inputRef.current?.click()
  }

  const handleFileChange = (e) => {
    if (!e.target.files || !e.target.files[0]) {
      setDisplayImage('/noimage.jpg')
      return
    }

    setProductImage(e.target.files[0])
    setDisplayImage(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <AppLayout>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>An error has occurred: {JSON.stringify(error.message)}</h1>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='p-3 mb-3 bg-white flex justify-between items-center'>
          <div>
            <h1 className='font-semibold'>New Product</h1>
          </div>
          <div>
            <Button className='font-bold' type='submit' variant='contained' size='small' startIcon={<MdOutlineSave />}>
              Save
            </Button>
          </div>
        </div>
        <div className='p-3 bg-white flex flex-col md:flex-row gap-3'>
          <div className='flex flex-col w-full md:w-3/12 gap-3'>
            <TextField label='Product Name' variant='outlined' size='small' {...register('productName')} />
            <TextField label='SKU' variant='outlined' size='small' {...register('sku')} />
            <Controller
              render={({ field }) => (
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  onChange={(e, newValue) => {
                    field.onChange(newValue)
                  }}
                  value={field.value || null}
                  options={coffeeTypes}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderInput={(params) => <TextField {...params} label='Coffee Type' size='small' />}
                />
              )}
              name='coffeeType'
              control={control}
            />

            <Controller
              render={({ field }) => (
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  onChange={(e, newValue) => {
                    field.onChange(newValue)
                  }}
                  value={field.value || null}
                  options={roastLevels}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderInput={(params) => <TextField {...params} label='Roast Level' size='small' />}
                />
              )}
              name='roastLevel'
              control={control}
            />
          </div>
          <div className='flex flex-col w-full md:w-3/12 gap-3'>
            <TextField label='Price' variant='outlined' size='small' {...register('price')} />
            <TextField label='Quantity' variant='outlined' size='small' {...register('quantity')} />

            {/* 
              Reference: https://stackoverflow.com/questions/70696870/changing-autocomplete-value-using-react-hook-form-material-ui
              This is sample to get value from autocomplete when submited the form
              The getting value is the selected object
            */}
            <Controller
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
            />
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
            <Button variant='contained' onClick={handleUploadClick} title={productImage?.name}>
              {productImage ? `${productImage.name.slice(0, 20)}...` : 'Click to select'}
            </Button>
            <input type='file' ref={inputRef} onChange={handleFileChange} style={{ display: 'none' }} />
          </div>
        </div>
      </form>
    </AppLayout>
  )
}
