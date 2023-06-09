'use client'
import React, { useState } from 'react'

// components
import AppLayout from '@/components/layouts/appLayout'
import BreadcrumbsComponent from '@/components/reusable/breadcrumbs'
import Loader from '@/components/reusable/loader'

import { Button, OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, Select, Checkbox } from '@mui/material'

import { MdOutlineShoppingCart } from 'react-icons/md'

import { ProductFakeAPI } from '@/api/product'

const ITEM_HEIGHT = 60
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
]

export default function IndexSales() {
  const { isLoading, error, data: products } = ProductFakeAPI()
  // if (isLoading) return <h1>Loading...</h1>

  const [personName, setPersonName] = useState([])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  if (error) return <h1>Error...</h1>

  return (
    <AppLayout>
      <div className='flex justify-between items-center bg-white p-3 mb-3 sticky top-0 z-10'>
        <div className=''>
          <BreadcrumbsComponent>
            <span className='text-sm'>Sales</span>
          </BreadcrumbsComponent>
        </div>
        <div>
          <Button
            onClick={() => router.push('/products/new')}
            className='font-bold'
            size='small'
            variant='contained'
            startIcon={<MdOutlineShoppingCart />}
          >
            View Cart
          </Button>
        </div>
      </div>

      {/* filter */}
      <div>
        <FormControl sx={{ m: 1, width: 300 }} size='small'>
          <InputLabel id='demo-multiple-checkbox-label'>Filter by category</InputLabel>
          <Select
            labelId='demo-multiple-checkbox-label'
            id='demo-multiple-checkbox'
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label='Filter by category' />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
            // size='small'
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div>
        <div className='flex flex-wrap'>
          {products?.map((product) => {
            return (
              <div key={product.id} className='w-1/2 md:w-1/6 min-h-[350px] p-3 relative'>
                <div className='shadow-md h-full p-3'>
                  <div className='mb-3'>
                    <img src={`${product?.image}`} alt={`${product.title}`} className='w-full h-32' />
                  </div>
                  <div className='mt-5 mb-3'>
                    <div>
                      <span className='text-sm font-semibold'>{product.title}</span>
                    </div>
                    <div>
                      <span className='text-sm font-light'>PHP {product.price}</span>
                    </div>
                  </div>
                  <div className='absolute bottom-0 left-0 right-0 p-3'>
                    <Button variant='contained' size='small' className='w-full'>
                      Add to cart
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Loader isLoading={isLoading} />
    </AppLayout>
  )
}
