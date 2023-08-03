import React from 'react'
import { DataGrid } from '@mui/x-data-grid'

import { TextField } from '@mui/material'

import usePurchaseStore from '@/store/usePurchaseStore'

const PHPFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
})

export default function PurchaseItemTable() {
  const items = usePurchaseStore((state) => state.items)
  const setNewItemQty = usePurchaseStore((state) => state.setNewItemQty)

  const handleSetNewItemQty = (qty, item) => {
    setNewItemQty(qty, item)
  }

  const header = [
    {
      field: 'name',
      headerName: 'Product Name',
      minWidth: 250,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      minWidth: 75,
      renderCell: ({ row }) => (
        <TextField
          InputProps={{
            inputProps: {
              style: { textAlign: 'center' },
            },
          }}
          variant='outlined'
          size='small'
          className='w-full'
          value={row.quantity}
          onChange={(e) => handleSetNewItemQty(e.target.value, row)}
        />
      ),
    },
    {
      field: 'price',
      headerName: 'Price',
      minWidth: 150,
      headerAlign: 'right',
      align: 'right',
      valueFormatter: (params) => `${PHPFormatter.format(params.value)}`,
    },
  ]
  return (
    <>
      <div className='w-full h-[70vh]'>
        <DataGrid
          className='top-pagination'
          rows={items || []}
          columns={header}
          density='comfortable'
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          disableColumnMenu
          pageSizeOptions={[10, 50, 100]}
          disableRowSelectionOnClick 
        />
      </div>

      {/* <table className='w-full'>
        <thead>
          <tr>
            <td>ID</td>
            <td>ITEM</td>
          </tr>
        </thead>
        <tbody>
          {items?.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <input
                    type='text'
                    value={item.quantity}
                    onChange={(e) => handleSetNewItemQty(e.target.value, item)}
                    className='border px-3 w-24 text-center'
                  />
                </td>
                <td>{item.price}</td>
              </tr>
            )
          })}
        </tbody>
      </table> */}
    </>
  )
}
