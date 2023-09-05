'use client'
import React, { useState } from 'react'

// MUI
import IconButton from '@mui/material/IconButton'
import { MdOutlineEdit, MdOutlineDelete } from 'react-icons/md'
import { DataGrid } from '@mui/x-data-grid'

// API's
import { purchaseAPI } from '@/api/purchases'

import { useRouter } from 'next/navigation'
import moment from 'moment'

const PHPFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
})

export default function PurchaseTable() {
  const router = useRouter()
  const { isLoading, error, data: purchasesData } = purchaseAPI()

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
    // {
    //   field: 'productImage',
    //   headerName: 'Product Image',
    //   flex: 1,
    //   minWidth: 150,
    //   headerAlign: 'center',
    //   align: 'center',
    //   renderCell: ({ row }) => (
    //     <img
    //       src={
    //         row.productImage ? `${process.env.NEXT_PUBLIC_API_URL}/product/images/${row.productImage}` : '/noimage.jpg'
    //       }
    //       width={50}
    //       alt={`${row.productName}`}
    //     />
    //   ),
    // },
    {
      field: 'document_no',
      headerName: 'Document Number',
      flex: 1,
      minWidth: 350,
      renderCell: ({ row }) => row?.document_no,
    },
    {
      field: 'purchases_count',
      headerName: 'Number of Items',
      // flex: 1,
      width: 150,
      headerAlign: 'right',
      align: 'right',
      renderCell: ({ row }) => row?.purchases_count,
    },
    {
      field: 'purchases_sum_price',
      headerName: 'Total Amount Purchased',
      // flex: 1,
      width: 150,
      headerAlign: 'right',
      align: 'right',
      // valueFormatter: ({ row }) => row?.purchases_sum_price,
      valueFormatter: (params) => `${PHPFormatter.format(params.value)}`,
    },
    // {
    //   field: 'name',
    //   headerName: 'Product Name',
    //   flex: 1,
    //   minWidth: 250,
    //   renderCell: ({ row }) => row.product?.name
    // },
    // {
    //   field: 'category',
    //   headerName: 'Category',
    //   flex: 1,
    //   minWidth: 150,
    //   renderCell: ({ row }) => row.category?.category,
    // },
    // {
    //   field: 'brand',
    //   headerName: 'Brand',
    //   flex: 1,
    //   minWidth: 150,
    //   renderCell: ({ row }) => row.brand?.brand,
    // },
    // {
    //   field: 'price',
    //   headerName: 'Price',
    //   flex: 1,
    //   minWidth: 150,
    //   headerAlign: 'right',
    //   align: 'right',
    //   valueFormatter: (params) => `${PHPFormatter.format(params.value)}`,
    // },
    {
      field: 'transaction_date',
      headerName: 'Transaction Date',
      flex: 1,
      minWidth: 100,
      type: 'date',
      valueGetter: ({ row }) => new Date(row.purchases[0]?.transaction_date),
      renderCell: ({ row }) => <span>{moment(row.purchases[0]?.transaction_date).format('MMM DD, Y')}</span>,
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
          <IconButton aria-label='edit' size='medium' onClick={() => router.replace(`purchases/edit/${row.document_no}/${row.id}`)}>
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
    <div className='flex w-full h-[70vh]'>
      {!isLoading ? (
        <DataGrid
          className='top-pagination w-0'
          rows={purchasesData?.data || []}
          columns={header}
          density='comfortable'
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 50, 100]}
          rowSelection={false}
          disableColumnMenu
        />
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  )
}
