'use client'
import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'

import IconButton from '@mui/material/IconButton'
import { MdOutlineEdit, MdOutlineDelete } from 'react-icons/md'

export default function ProductTable() {
  const [pageSize, setPageSize] = useState(10)
  const handlePageSizeChange = (data) => {
    setPageSize(data)
  }

  const produsts = [
    { id: 1, productName: 'Item 1' },
    { id: 2, productName: 'Item 2' },
  ]

  const header = [
    // {
    //   field: 'id',
    //   headerName: 'ID',
    //   hide: true,
    // },
    { field: 'productName', headerName: 'Product Name', flex: 1, minWidth: 80, headerAlign: 'center' },
    {
      field: 'action',
      headerName: '',
      minWidth: 150,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => (
        <>
          <IconButton aria-label="edit" size="medium">
            <MdOutlineEdit className="cursor-pointer" onClick={() => console.log(row)} title="Edit" />
          </IconButton>
          <IconButton aria-label="delete" size="medium">
            <MdOutlineDelete className="cursor-pointer" onClick={() => console.log(row)} title="Delete" />
          </IconButton>
        </>
      ),
    },
  ]

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        // onRowClick={editUser}
        rows={produsts || []}
        columns={header}
        density="compact"
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        rowsPerPageOptions={[10, 15, 20, 50, 100]}
        autoHeight={true}
      />
    </div>
  )
}
