import React, { useState, forwardRef } from 'react'
import { DataGrid } from '@mui/x-data-grid'

// MUI
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Slide } from '@mui/material'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

import MessageAlert from '@/components/MessageAlert'
import { toast } from 'react-toastify'

import moment from 'moment'

// API's
import { productAPI } from '@/api/product'

const PHPFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
})

import usePurchaseStore from '@/store/usePurchaseStore'

export default function ItemListModal({ open, handleClose }) {
  const { isLoading, error, data: productsData } = productAPI()
  const items = usePurchaseStore((state) => state.items)
  const setItems = usePurchaseStore((state) => state.setItems)
  const [selectedRows, setSelectedRows] = useState([])

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
    // {
    //   field: 'created_at',
    //   headerName: 'Created At',
    //   flex: 1,
    //   minWidth: 100,
    //   type: 'date',
    //   valueGetter: ({ row }) => new Date(row.created_at),
    //   renderCell: ({ row }) => <span>{moment(row.created_at).format('MMMM DD, Y')}</span>,
    // },
  ]

  const addItemToList = () => {
    selectedRows.forEach((row) =>
      setItems({
        id: row.id,
        name: row.name,
        category_id: row.category_id,
        brand_id: row.brand_id,
        quantity: 1,
        price: row.price,
        original_price: row.price,
      })
    )

    handleClose()
  }

  return (
    <React.Fragment>
      <Dialog fullWidth={true} maxWidth={'lg'} open={open} onClose={handleClose} TransitionComponent={Transition}>
        <DialogTitle>Item List</DialogTitle>
        <DialogContent>
          <div className='w-full h-[65vh]'>
            <DataGrid
              className='top-pagination'
              rows={productsData?.data || []}
              columns={header}
              density='comfortable'
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              disableColumnMenu
              pageSizeOptions={[10, 50, 100]}
              checkboxSelection
              onRowSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids)
                const selectedRows = productsData.data.filter((row) => selectedIDs.has(row.id))

                setSelectedRows(selectedRows)
              }}
              disableRowSelectionOnClick
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={addItemToList}>Add To List</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
