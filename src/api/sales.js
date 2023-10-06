import React from 'react'
import { useQuery } from '@tanstack/react-query'
import newAxios from '@/lib/new-axios'

const csrf = () => newAxios.get('/sanctum/csrf-cookie')

export async function checkout(payload) {
  try {
    await csrf()
    const response = await newAxios.post('/api/sales', payload)
    const result = response.data

    return result
  } catch (error) {
    throw error
  }
}
