'use client'
import React, { useEffect, useState } from 'react'

import { BiPlus } from 'react-icons/bi'

// components
import AppLayout from '@/components/layouts/AppLayout'
import BreadcrumbsComponent from '@/components/reusable/Breadcrumbs'
import AddEditCategoryModal from '@/components/categories/AddEditCategoryModal'
import Loader from '@/components/reusable/Loader'

// API's
import { categoryAPI } from '@/hooks/categories'

// store
import useCategoryStore from '@/store/useCategoryStore'

import moment from 'moment'

import { Button } from '@/components/ui/button'

import CategoryTable from '@/components/categories/CategoryTable'
import ReactPaginate from 'react-paginate'
import useDebounce from '@/lib/debounce'
import DropDownItemPerPage from '@/components/reusable/DropDownItemPerPage'
import { Input } from '@/components/ui/input'
import ListingLayout from '@/components/layouts/ListingLayout'

export default function IndexCategory() {
  const [search, setSearch] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [itemOffset, setItemOffset] = useState(0)
  const endOffset = itemOffset + itemsPerPage

  const debounceSearch = useDebounce(search, 500)

  const {
    isLoading,
    error,
    data: categories,
  } = categoryAPI({ search: debounceSearch, offset: itemOffset, limit: itemsPerPage })

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

  const pageCount = Math.ceil(categories?.total_item / itemsPerPage)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % categories?.total_item
    setItemOffset(newOffset)
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

        <ListingLayout>
          <div className='flex justify-between mb-3'>
            <div>
              <DropDownItemPerPage itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />
            </div>

            <div>
              <Input placeholder='Search' onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>

          <div className='mb-3'>
            <CategoryTable categories={categories} edit={handleEditCategoryModal} />
          </div>

          <div className='flex justify-end'>
            <ReactPaginate
              activeClassName='border rounded-md'
              pageClassName='px-2 py-1'
              className='flex items-center gap-3 text-sm font-medium'
              breakLabel='...'
              nextLabel='Next >'
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel='< Previous'
              renderOnZeroPageCount={null}
            />
          </div>
        </ListingLayout>

        {openModal && <AddEditCategoryModal actionStatus={actionStatus} />}
        <Loader isLoading={isLoading} />
      </AppLayout>
    </>
  )
}
