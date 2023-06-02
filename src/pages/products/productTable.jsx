'use client'
import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'

import IconButton from '@mui/material/IconButton'
import { MdOutlineEdit, MdOutlineDelete } from 'react-icons/md'

// API's
import { productAPI } from '@/api/product'

import { useRouter } from 'next/navigation'
import moment from 'moment'

export default function ProductTable() {
  const router = useRouter()
  const { isLoading, error, data: productsData } = productAPI()

  const [pageSize, setPageSize] = useState(10)
  const handlePageSizeChange = (data) => {
    setPageSize(data)
  }

  // const produsts = [
  //   { id: 1, productName: 'Item 1' },
  //   { id: 2, productName: 'Item 2' },
  // ]

  const header = [
    // {
    //   field: '_id',
    //   headerName: 'ID',
    //   flex: 1,
    //   minWidth: 150,
    // },
    {
      field: 'productImage',
      headerName: 'Product Image',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => (
          <img
            src={
              row.productImage
                ? `${process.env.NEXT_PUBLIC_API_URL}/product/images/${row.productImage}`
                : '/noimage.jpg'
            }
            width={50}
            alt={`${row.productName}`}
          />
      ),
    },
    {
      field: 'productName',
      headerName: 'Product Name',
      flex: 1,
      minWidth: 250,
      // renderCell: ({ row }) => (
      //   <div className=''>
      //     <span>{row.productName}</span>
      //   </div>
      // ),
    },
    {
      field: 'coffeeType',
      headerName: 'Coffee Type',
      flex: 1,
      minWidth: 150,
      renderCell: ({ row }) => (
        <div className=''>
          <span>{row.coffeeType.join(', ')}</span>
        </div>
      ),
    },
    {
      field: 'roastLevel',
      headerName: 'Roast Leve',
      flex: 1,
      minWidth: 150,
      renderCell: ({ row }) => (
        <div className=''>
          <span>{row.roastLevel.join(', ')}</span>
        </div>
      ),
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
          <IconButton aria-label='edit' size='medium' onClick={() => router.replace(`products/edit/${row._id}`)}>
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
    <div className='flex w-full h-96'>
      {!isLoading ? (
        <DataGrid
          className='w-0'
          getRowId={(row) => row._id}
          rows={productsData || []}
          columns={header}
          density='compact'
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          rowsPerPageOptions={[10, 15, 20, 50, 100]}
          autoHeight={true}
          rowSelection={false}
        />
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  )
}
