import React, { useState } from 'react'

import { TextField } from '@mui/material'

export default function TextFieldController({ name, label, initialState, setInitialState }) {
  return (
    <TextField
      onChange={(e) => setInitialState({...initialState, [name]: e.target.value})}
      value={initialState[name]}
      label={label}
      size='small'
      key={name}
      name={name}
    />
  )
}
