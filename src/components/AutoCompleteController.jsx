import React, { useEffect, useState } from 'react'

import { TextField, Autocomplete } from '@mui/material'

import { Controller } from 'react-hook-form'

export default function AutoCompleteController({
  control,
  options = [],
  name,
  label,
  selected = null,
  setValue,
}) {
  const [state, setState] = useState(null)

  useEffect(() => {
    setState(options.find((op) => op.value === selected))

    return () => setState(null)
  }, [])

  return (
    <Controller
      render={({ field }) => {
        return (
          <Autocomplete
            // disableCloseOnSelect
            onChange={(e, newValue) => {
              field.onChange(setState(newValue))
              // setValue(name, newValue.value)
            }}
            value={state || null}
            options={options}
            getOptionLabel={(option) => option.label}
            // isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={(params) => <TextField {...params} label={label} size='small' 
            InputLabelProps={{ shrink: true }}/>}
          />
        )
      }}
      key={name}
      name={name}
      control={control}
    />
  )
}
