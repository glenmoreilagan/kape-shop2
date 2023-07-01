import React from 'react'

import { TextField, Autocomplete } from '@mui/material'

import { Controller } from 'react-hook-form'

export default function AutoCompleteController({ control, options = [], name, label }) {
  return (
    <Controller
      render={({ field }) => (
        <Autocomplete
          disableCloseOnSelect
          onChange={(e, newValue) => {
            field.onChange(newValue)
          }}
          // value={field.value || null}
          options={options}
          getOptionLabel={(option) => option.label}
          // isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={(params) => <TextField {...params} label={label} size='small' />}
        />
      )}
      name={name}
      control={control}
    />
  )
}
