'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

import { BiPlus } from 'react-icons/bi'

// components
import AppLayout from '@/components/layouts/AppLayout'
import BreadcrumbsComponent from '@/components/reusable/Breadcrumbs'
import AddEditBrandModal from '@/components/brands/AddEditBrandModal'
import Loader from '@/components/reusable/Loader'

// API's
import { brandAPI } from '@/hooks/brands'

// store
import useBrandStore from '@/store/useBrandStore'

import moment from 'moment'

import { Button } from '@/components/ui/button'

import BrandTable from '@/components/brands/BrandTable'

export default function IndexBrand() {
  const router = useRouter()
  const pathname = usePathname()

  const { isLoading, error, data: brands } = brandAPI()

  const { openModal, setShowHideModal } = useBrandStore((state) => state)
  const editBrand = useBrandStore((state) => state.editBrand)
  const resetSelectedBrand = useBrandStore((state) => state.resetSelectedBrand)

  const [actionStatus, setActionStatus] = useState(null)

  const handleAddBrandModal = () => {
    resetSelectedBrand()
    setActionStatus('add')
    setShowHideModal()
  }

  const handleEditBrandModal = (data) => {
    router.push(`${pathname}?id=${data.id}`)
    resetSelectedBrand()
    setActionStatus('edit')
    editBrand(data)
    setShowHideModal()
  }

  const handleDelete = (row) => {
    console.log(row)
  }

  return (
    <>
      <AppLayout>
        <div className='flex justify-between items-center bg-white p-3 mb-3 rounded-md'>
          <div>
            <h1 className='scroll-m-20 text-xl font-semibold tracking-tight'>Brands</h1>
          </div>
          <div>
            <Button size='sm' onClick={handleAddBrandModal}>
              <BiPlus className='mr-2 h-4 w-4' /> New
            </Button>
          </div>
        </div>

        <div className='p-3 bg-white rounded-md'>
          <BrandTable brands={brands} edit={handleEditBrandModal} />
        </div>

        {openModal && <AddEditBrandModal actionStatus={actionStatus} />}
        <Loader isLoading={isLoading} />
      </AppLayout>
    </>
  )
}
