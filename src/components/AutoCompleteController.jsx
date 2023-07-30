import React, { useState } from 'react'

import { TextField, Autocomplete } from '@mui/material'

import { Controller } from 'react-hook-form'

export default function AutoCompleteController({ control, options = [], name, label }) {
  const [state, setState] = useState({ value: 4, label: 'berg' })

  return (
    <Controller
      render={({ field }) => {
        return (
          <Autocomplete
            // disableCloseOnSelect
            onChange={(e, newValue) => {
              field.onChange(setState(newValue))
            }}
            value={state || null}
            options={options}
            getOptionLabel={(option) => option.label}
            // isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={(params) => <TextField {...params} label={label} size='small' />}
          />
        )
      }}
      key={name}
      name={name}
      control={control}
    />
  )
}
