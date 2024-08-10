import React from 'react'
import { useQuery } from '@tanstack/react-query'
import newAxios from '@/lib/new-axios'

export async function checkout({ payload, user_id }) {
  try {
    const response = await newAxios.post('/api/sales', { data: payload, user_id: user_id })
    return response.data
  } catch (error) {
    return 'Something went wrong.'
  }
}
