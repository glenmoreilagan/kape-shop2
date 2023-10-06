'use client'
import React, { useEffect, useState } from 'react'

import { BiPlus } from 'react-icons/bi'

// components
import AppLayout from '@/components/layouts/AppLayout'
import BreadcrumbsComponent from '@/components/reusable/Breadcrumbs'
import AddEditCategoryModal from '@/components/categories/AddEditCategoryModal'
import Loader from '@/components/reusable/Loader'

// API's
import { categoryAPI } from '@/api/categories'

// store
import useCategoryStore from '@/store/useCategoryStore'

import moment from 'moment'

import { Button } from '@/components/ui/button'

import CategoryTable from '@/components/categories/CategoryTable'

export default function IndexCategory() {
  const { isLoading, error, data: categories } = categoryAPI()
  const { openModal, setShowHideModal } = useCategoryStore((state) => state)
  const editCategory = useCategoryStore((state) => state.editCategory)
  const resetSelectedCategory = useCategoryStore((state) => state.resetSelectedCategory)

  const [actionStatus, setActionStatus] = useState(null)

  const handleAddCategoryModal = () => {
    resetSelectedCategory()
    setActionStatus('add')
    setShowHideModal()
  }

  const handleEditCategoryModal = (data) => {
    resetSelectedCategory()
    setActionStatus('edit')
    editCategory(data)
    setShowHideModal()
  }

  const [pageSize, setPageSize] = useState(10)

  const handleDelete = (row) => {
    console.log(row)
  }

  return (
    <>
      <AppLayout>
        <div className='flex justify-between items-center bg-white p-3 mb-3 rounded-md'>
          <div>
            <h1 className='scroll-m-20 text-xl font-semibold tracking-tight'>Categories</h1>
          </div>
          <div>
            <Button size='sm' onClick={handleAddCategoryModal}>
              <BiPlus className='mr-2 h-4 w-4' /> New
            </Button>
          </div>
        </div>

        <div className='p-3 bg-white rounded-md'>
          <CategoryTable categories={categories} edit={handleEditCategoryModal} />
        </div>

        {openModal && <AddEditCategoryModal actionStatus={actionStatus} />}
        <Loader isLoading={isLoading} />
      </AppLayout>
    </>
  )
}
