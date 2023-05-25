'use client'
import React from 'react'
import AppLayout from '@/components/layouts/appLayout'
import { Button } from '@mui/material'

import { MdOutlineAdd } from 'react-icons/md'
import ProductTable from './productTable'

export default function IndexProducts() {
  return (
    <>
      <AppLayout>
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="font-semibold">Products</h1>
          </div>
          <div>
            <Button className="font-bold" size="small" variant="contained" startIcon={<MdOutlineAdd />}>
              Add Product
            </Button>
          </div>
        </div>

        <div className="">
          <ProductTable />
        </div>
      </AppLayout>
    </>
  )
}
