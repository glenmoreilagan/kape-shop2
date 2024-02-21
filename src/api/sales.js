import React from 'react'
import { useQuery } from '@tanstack/react-query'
import newAxios from '@/lib/new-axios'

import { toast } from 'sonner'

export async function checkout({ payload, setOpen }) {
  try {
    const response = await newAxios.post('/api/sales', { data: payload })
    const result = response.data

    toast.success('Checkout success.')
    setOpen(false)
    return true
  } catch (error) {
    toast.error('Checkout something went wrong.')
    return false
  }
}
