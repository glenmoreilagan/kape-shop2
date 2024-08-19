'use client'
import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// components
import AppLayout from '@/components/layouts/AppLayout'
import BreadcrumbsComponent from '@/components/reusable/Breadcrumbs'
import PurchaseTable from '@/components/purchases/PurchaseTable'
import Loader from '@/components/reusable/Loader'

import { BiPlus } from 'react-icons/bi'
import { Button } from '@/components/ui/button'

import { purchaseAPI } from '@/hooks/purchases'

import ReactPaginate from 'react-paginate'

import { Input } from '@/components/ui/input'

import DropDownItemPerPage from '@/components/reusable/DropDownItemPerPage'

import useDebounce from '@/lib/debounce'

export default function IndexPurhcase() {
  const router = useRouter()

  const [search, setSearch] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [itemOffset, setItemOffset] = useState(0)
  const endOffset = itemOffset + itemsPerPage

  const debounceSearch = useDebounce(search, 500)
  const {
    isLoading,
    error,
    data: purchases,
  } = purchaseAPI({ search: debounceSearch, offset: itemOffset, limit: itemsPerPage })

  // const items = useMemo(
  //   () =>
  //     Array.from({ length: purchases?.total_item }).map((item, index) => {
  //       return index + 1
  //     }),
  //   [purchases?.total_item]
  // )

  // const currentItems = items.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(purchases?.total_item / itemsPerPage)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % purchases?.total_item
    setItemOffset(newOffset)
  }

  return (
    <>
      <AppLayout>
        <div className='flex justify-between items-center bg-white p-3 mb-3 rounded-md'>
          <div>
            <h1 className='scroll-m-20 text-xl font-semibold tracking-tight'>Purchases</h1>
          </div>
          <div>
            <Button size='sm' onClick={() => router.push('/purchases/new')}>
              <BiPlus className='mr-2 h-4 w-4' /> New
            </Button>
          </div>
        </div>

        <div className='p-3 bg-white rounded-md'>
          <div className='flex justify-between mb-3'>
            <div>
              <DropDownItemPerPage itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />
            </div>

            <div>
              <Input placeholder='Search' onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>

          <div className='mb-3'>
            <PurchaseTable purchases={purchases} />
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
        </div>
      </AppLayout>

      <Loader isLoading={isLoading} />
    </>
  )
}
