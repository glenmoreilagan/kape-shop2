'use client'
import React, { useEffect, useState } from 'react'

// MUI
import { Button } from '@mui/material'
import { MdOutlineAdd, MdOutlineEdit, MdOutlineDelete } from 'react-icons/md'
import IconButton from '@mui/material/IconButton'
import { DataGrid } from '@mui/x-data-grid'

// components
import AppLayout from '@/components/layouts/appLayout'
import BreadcrumbsComponent from '@/components/reusable/breadcrumbs'
import AddEditCategoryModal from '@/components/categories/addEditCategoryModal'
import Loader from '@/components/reusable/loader'

// API's
import { categoryAPI, categoryFakeAPI } from '@/api/categories'

// store
import useCategoryStore from '@/store/useCategoryStore'

import moment from 'moment'

export default function IndexCategory() {
  const {
    isLoading: categoriesIsLoading,
    error,
    data: categories,
    refetch: RefetchCategories,
    isFetching,
  } = categoryAPI()

  const { openModal, setShowHideModal } = useCategoryStore((state) => state)
  const setRefetch = useCategoryStore((state) => state.setRefetch)
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
  const handlePageSizeChange = (data) => {
    setPageSize(data)
  }

  useEffect(() => {
    setRefetch(RefetchCategories)
  }, [RefetchCategories, setRefetch])

  const header = [
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
      minWidth: 100,
      type: 'date',
      valueGetter: ({ row }) => new Date(row.createdAt),
      renderCell: ({ row }) => <span>{moment(row.createdAt).format('MMMM DD, Y')}</span>,
    },
    {
      field: 'action',
      headerName: '',
      flex: 1,
      minWidth: 150,
      sortable: false,
      align: 'right',
      renderCell: ({ row }) => (
        <>
          <IconButton aria-label='edit' size='medium' onClick={() => handleEditCategoryModal(row)}>
            <MdOutlineEdit className='cursor-pointer' title='Edit' />
          </IconButton>
          <IconButton aria-label='delete' size='medium' onClick={() => console.log(row)}>
            <MdOutlineDelete className='cursor-pointer' title='Delete' />
          </IconButton>
        </>
      ),
    },
  ]

  return (
    <>
      <AppLayout>
        <div className='flex justify-between items-center bg-white p-3 mb-3'>
          <div>
            <BreadcrumbsComponent>
              <span className='text-sm'>Categories</span>
            </BreadcrumbsComponent>
          </div>
          <div>
            <Button
              onClick={handleAddCategoryModal}
              className='font-bold'
              size='small'
              variant='contained'
              startIcon={<MdOutlineAdd />}
            >
              Add Categories
            </Button>
          </div>
        </div>

        <div className='p-3 bg-white'>
          <div className='flex w-full h-96'>
            <DataGrid
              className='w-0 px-3' // this is important always add this width: 0
              // getRowId={(row) => row.id}
              getRowId={(row) => row._id}
              rows={categories || []}
              columns={header}
              density='compact'
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
              rowsPerPageOptions={[10, 15, 20, 50, 100]}
              autoHeight={false}
              rowSelection={false}
            />
          </div>

          {openModal && <AddEditCategoryModal actionStatus={actionStatus} />}
          <Loader isLoading={isFetching} />
        </div>
      </AppLayout>
    </>
  )
}
