import React from 'react'
import { useQuery } from '@tanstack/react-query'
import newAxios from '@/lib/new-axios'

import { toast } from 'sonner'

const csrf = () => newAxios.get('/sanctum/csrf-cookie')

export async function checkout(payload) {
  try {
    // await csrf()
    const response = await newAxios.post('/api/sales', { data: payload })
    const result = response.data

    toast.success('Checkout success.')
  } catch (error) {
    toast.error('Something went wrong.')
    // throw error
  }
}
