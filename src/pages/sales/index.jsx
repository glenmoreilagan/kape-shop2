import React, { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { BiPlus } from 'react-icons/bi'

import AppLayout from '@/components/layouts/AppLayout'
import SalesTable from '@/components/sales/SalesTable'

import ReactPaginate from 'react-paginate'

import { Input } from '@/components/ui/input'

import DropDownItemPerPage from '@/components/reusable/DropDownItemPerPage'

import useDebounce from '@/lib/debounce'
import newAxios from '@/lib/new-axios'

import { salesAPI } from '@/hooks/sales'

export default function IndexSales() {
  const [search, setSearch] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [itemOffset, setItemOffset] = useState(0)
  const endOffset = itemOffset + itemsPerPage

  const debounceSearch = useDebounce(search, 500)
  const {
    isLoading,
    error,
    data: sales,
  } = salesAPI({ search: debounceSearch, offset: itemOffset, limit: itemsPerPage })

  const items = useMemo(
    () =>
      Array.from({ length: sales?.total_item }).map((item, index) => {
        return index + 1
      }),
    [sales?.total_item]
  )

  const currentItems = items.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(items.length / itemsPerPage)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length
    setItemOffset(newOffset)
  }

  return (
    <AppLayout>
      <div className='flex justify-between items-center bg-white p-3 mb-3 rounded-md'>
        <div>
          <h1 className='scroll-m-20 text-xl font-semibold tracking-tight'>Sales</h1>
        </div>
        {/* <div>
          <Button size='sm' onClick={() => router.push('/purchases/new')}>
            <BiPlus className='mr-2 h-4 w-4' /> New
          </Button>
        </div> */}
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
          <SalesTable sales={sales} />
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
  )
}
