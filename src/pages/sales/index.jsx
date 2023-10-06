'use client'
import React, { useEffect, useState } from 'react'

// components
import AppLayout from '@/components/layouts/AppLayout'
import BreadcrumbsComponent from '@/components/reusable/Breadcrumbs'
import Loader from '@/components/reusable/Loader'

import {
  Button,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  Badge,
} from '@mui/material'

import { MdOutlineShoppingCart } from 'react-icons/md'

import { productAPI } from '@/api/products'
import { checkout } from '@/api/sales'

// store
import useCartStore from '@/store/useCartStore'
import useSaleStore from '@/store/useSaleStore'
import ProductDisplay from '@/components/sales/ProductDisplay'

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
  const { isLoading, error, data: products } = productAPI()
  // if (isLoading) return <h1>Loading...</h1>

  const removeToCart = useCartStore((state) => state.removeToCart)
  const viewCart = useCartStore((state) => state.cart)
  const cartCount = useCartStore((state) => state.cartCount)
  const [personName, setPersonName] = useState([])

  const setProducts = useSaleStore((state) => state.setProducts)

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  const handleRemoveToCart = async (product) => {
    removeToCart(product)
  }

  // useEffect(() => {
  //   setProducts(products)
  // }, [products])

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
          <Badge color='error' badgeContent={cartCount()}>
            <Button
              onClick={() => checkout(viewCart)}
              className='bg-primary-gray'
              size='small'
              variant='contained'
              startIcon={<MdOutlineShoppingCart />}
            >
              View Cart
            </Button>
          </Badge>
        </div>
      </div>

      <div className='bg-white p-3'>
        {/* filter */}
        <div className='mb-3'>
          <FormControl className='w-full' size='small'>
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
        <div className='flex flex-wrap gap-5 justify-center '>
          <ProductDisplay products={products?.data} />
        </div>
      </div>

      <Loader isLoading={isLoading} />
    </AppLayout>
  )
}
