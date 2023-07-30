'use client'
import React, { useState } from 'react'

// MUI
import IconButton from '@mui/material/IconButton'
import { MdOutlineEdit, MdOutlineDelete } from 'react-icons/md'
import { DataGrid } from '@mui/x-data-grid'

// API's
import { productAPI } from '@/api/product'

import { useRouter } from 'next/navigation'
import moment from 'moment'

const PHPFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
})

export default function ProductTable() {
  const router = useRouter()
  const { isLoading, error, data: productsData } = productAPI()

  const [pageSize, setPageSize] = useState(5)
  const handlePageSizeChange = (data) => {
    setPageSize(data)
  }

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
            row.productImage ? `${process.env.NEXT_PUBLIC_API_URL}/product/images/${row.productImage}` : '/noimage.jpg'
          }
          width={50}
          alt={`${row.productName}`}
        />
      ),
    },
    {
      field: 'name',
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
      field: 'category',
      headerName: 'Category',
      flex: 1,
      minWidth: 150,
      renderCell: ({ row }) => row.category?.category,
    },
    {
      field: 'brand',
      headerName: 'Brand',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      minWidth: 150,
      headerAlign: 'right',
      align: 'right',
      valueFormatter: (params) => `${PHPFormatter.format(params.value)}`,
    },
    {
      field: 'created_at',
      headerName: 'Created At',
      flex: 1,
      minWidth: 100,
      type: 'date',
      valueGetter: ({ row }) => new Date(row.created_at),
      renderCell: ({ row }) => <span>{moment(row.created_at).format('MMMM DD, Y')}</span>,
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
          <IconButton aria-label='edit' size='medium' onClick={() => router.replace(`products/edit/${row.id}`)}>
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
    <div className='flex w-full max-h-[70vh] overflow-auto'>
      {!isLoading ? (
        <DataGrid
          className='w-0'
          rows={productsData?.data || []}
          columns={header}
          density='comfortable'
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 50, 100]}
          // autoHeight={true}
          rowSelection={false}
        />
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  )
}
