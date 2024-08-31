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
import ReactPaginate from 'react-paginate'
import { Input } from '@/components/ui/input'
import DropDownItemPerPage from '@/components/reusable/DropDownItemPerPage'
import useDebounce from '@/lib/debounce'
import ListingLayout from '@/components/layouts/ListingLayout'

export default function IndexBrand() {
  const router = useRouter()
  const pathname = usePathname()

  const [search, setSearch] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [itemOffset, setItemOffset] = useState(0)
  const endOffset = itemOffset + itemsPerPage

  const debounceSearch = useDebounce(search, 500)

  const {
    isLoading,
    error,
    data: brands,
  } = brandAPI({ search: debounceSearch, offset: itemOffset, limit: itemsPerPage })

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
    resetSelectedBrand()
    setActionStatus('edit')
    editBrand(data)
    setShowHideModal()
  }

  const handleDelete = (row) => {
    console.log(row)
  }

  const pageCount = Math.ceil(brands?.total_item / itemsPerPage)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % brands?.total_item
    setItemOffset(newOffset)
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
            <BrandTable brands={brands} edit={handleEditBrandModal} />
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

        {openModal && <AddEditBrandModal actionStatus={actionStatus} />}
        <Loader isLoading={isLoading} />
      </AppLayout>
    </>
  )
}
