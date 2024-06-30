'use client'
import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

// API's
import { storeProductAPI } from '@/components/hooks/products'
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

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'

import MessageAlert from '@/components/MessageAlert'
import { toast } from 'react-toastify'

import { BiSave } from 'react-icons/bi'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const PRODUCT_SCHEMA = z.object({
  name: z.string().min(1, 'Product name is required.'),
  sku: z.string().min(1, 'SKU is required.'),
  price: z.coerce
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .gt(0, 'Price must be greater than 0'),
  description1: z.string(),
  description2: z.string(),
  category_id: z.string().optional(),
  brand_id: z.string().optional(),
  product_status: z.number(),
})

const initialState = {
  name: '',
  sku: '',
  description1: '',
  description2: '',
  price: 0,
  category_id: undefined,
  brand_id: undefined,
  product_status: 0,
}

export default function IndexNewProduct() {
  const router = useRouter()
  const { isLoading: categoryLoading, error: categoryError, data: categories } = DropDownCategoryAPI()
  const { isLoading: brandLoading, error: brandError, data: brands } = DropDownBrandAPI()

  const forms = useForm({ defaultValues: initialState, resolver: zodResolver(PRODUCT_SCHEMA) })
  const formsErrors = forms.formState.errors
  const watchAllFields = forms.watch()

  const submitForm = async (data) => {
    try {
      const response = await storeProductAPI(data)
      toast.success(<MessageAlert header='Success!' body={response.message} />)
      forms.reset()
    } catch (error) {
      // toast.error(error)
    }
  }

  return (
    <AppLayout>
      <div className='p-3 mb-3 bg-white flex justify-between items-center rounded-md'>
        <div>
          <h1 className='scroll-m-20 text-xl font-semibold tracking-tight'>Products</h1>
        </div>
        <div>
          <Button type='submit' size='sm' className='w-full' onClick={forms.handleSubmit((data) => submitForm(data))}>
            <BiSave className='mr-2 h-4 w-4' /> Save
          </Button>
        </div>
      </div>
      <Form {...forms}>
        <div className='flex gap-3 flex-col md:flex-row p-3 bg-white rounded-md'>
          <div className='md:w-1/4'>
            <Label htmlFor='name'>Product Name</Label>
            <Input type='text' name='name' id='name' placeholder='Product Name' {...forms.register('name')} />
            <p className='text-red-600 text-xs'>{formsErrors.name?.message}</p>

            <Label htmlFor='sku'>SKU</Label>
            <Input type='text' name='sku' id='sku' placeholder='SKU' {...forms.register('sku')} />
            <p className='text-red-600 text-xs'>{formsErrors.sku?.message}</p>

            <FormField
              control={forms.control}
              name='category_id'
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor='category'>Select Category</Label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger id='category'>
                        <SelectValue placeholder='Select Category' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <ScrollArea className='h-[200px]'>
                        <SelectGroup>
                          {categories?.map((row) => (
                            <SelectItem key={row.value} value={row.value}>
                              {row.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />

            <FormField
              control={forms.control}
              name='brand_id'
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor='brand'>Select Brand</Label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger id='brand'>
                        <SelectValue placeholder='Select Brand' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <ScrollArea className='h-[200px]'>
                        <SelectGroup>
                          {brands?.map((row) => (
                            <SelectItem key={row.value} value={row.value}>
                              {row.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
          </div>

          <div className='md:w-1/4'>
            <Label htmlFor='price'>Price</Label>
            <Input
              // value={stateProduct.price ?? ''}
              type='text'
              name='price'
              id='price'
              placeholder='Price'
              // onChange={(e) => handleInputChange(e)}
              {...forms.register('price')}
            />
            <p className='text-red-600 text-xs'>{formsErrors.price?.message}</p>

            <FormField
              control={forms.control}
              name='product_status'
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor='product_status'>Select Product Status</Label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger id='product_status'>
                        <SelectValue placeholder='Select Product Status' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={0}>Active</SelectItem>
                        <SelectItem value={1}>Inactive</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
          </div>
          <div className='md:w-1/4'>
            <Label htmlFor='description1'>Description 1</Label>
            <Textarea
              // value={stateProduct.description1 ?? ''}
              type='text'
              name='description1'
              id='description1'
              placeholder='Description 1'
              rows={4}
              // onChange={(e) => handleInputChange(e)}
              {...forms.register('description1')}
            />
            <Label htmlFor='description2'>Description 2</Label>
            <Textarea
              // value={stateProduct.description2 ?? ''}
              type='text'
              name='description2'
              id='description2'
              placeholder='Description 2'
              rows={4}
              // onChange={(e) => handleInputChange(e)}
              {...forms.register('description2')}
            />
          </div>
        </div>
      </Form>
      <Loader isLoading={categoryLoading && brandLoading} />
    </AppLayout>
  )
}
