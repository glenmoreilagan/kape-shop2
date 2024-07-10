import React from 'react'
import { useQuery } from '@tanstack/react-query'
import newAxios from '@/lib/new-axios'

export async function checkout({ payload, setOpen, resetCart }) {
  try {
    const response = await newAxios.post('/api/sales', { data: payload })

    setOpen(false)
    resetCart()

    return response.data
  } catch (error) {
    return 'Something went wrong.'
  }
}
