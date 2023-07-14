'use client'
import React, { useEffect, useState } from 'react'

// MUI
import { Button, TextField } from '@mui/material'
import { MdOutlineAdd, MdOutlineEdit, MdOutlineDelete } from 'react-icons/md'
import IconButton from '@mui/material/IconButton'
import { DataGrid } from '@mui/x-data-grid'

// components
import AppLayout from '@/components/layouts/appLayout'
import BreadcrumbsComponent from '@/components/reusable/breadcrumbs'
import AddEditBrandModal from '@/components/brands/addEditBrandModal'
import Loader from '@/components/reusable/loader'

// API's
import { brandAPI } from '@/api/brands'

// store
import useBrandStore from '@/store/useBrandStore'

import moment from 'moment'

export default function IndexBrand() {
  const { isLoading, error, data: brands } = brandAPI()

  const { openModal, setShowHideModal } = useBrandStore((state) => state)
  const editBrand = useBrandStore((state) => state.editBrand)
  const resetSelectedBrand = useBrandStore((state) => state.resetSelectedBrand)

  const [actionStatus, setActionStatus] = useState(null)

  const handleAddCategoryModal = () => {
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

  const [pageSize, setPageSize] = useState(10)
  const handlePageSizeChange = (data) => {
    setPageSize(data)
  }

  const handleDelete = (row) => {
    console.log(row)
  }

  const header = [
    {
      field: 'brand',
      headerName: 'Brand',
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
          <IconButton aria-label='edit' size='medium' onClick={() => handleEditBrandModal(row)}>
            <MdOutlineEdit className='cursor-pointer' title='Edit' />
          </IconButton>
          <IconButton aria-label='delete' size='medium' onClick={() => handleDelete(row)}>
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
              <span className='text-sm'>brands</span>
            </BreadcrumbsComponent>
          </div>
          <div>
            <Button
              onClick={handleAddCategoryModal}
              className='font-bold bg-primary-gray'
              size='small'
              variant='contained'
              startIcon={<MdOutlineAdd />}
            >
              Add brands
            </Button>
          </div>
        </div>

        <div className='p-3 bg-white'>
          <TextField label='Search' placeholder='Search' size='small' className='w-full mb-3' />
          <div className='flex w-full h-96'>
            <DataGrid
              className='w-0 px-3' // this is important always add this width: 0
              // getRowId={(row) => row.id}import AddEditBrandModal from './../../components/brands/addEditBrandModal'

              // getRowId={(row) => row._id}
              rows={brands?.data || []}
              columns={header}
              density='compact'
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
              rowsPerPageOptions={[10, 15, 20, 50, 100]}
              autoHeight={false}
              rowSelection={false}
            />
          </div>

          {openModal && <AddEditBrandModal actionStatus={actionStatus} />}
          <Loader isLoading={isLoading} />
        </div>
      </AppLayout>
    </>
  )
}
