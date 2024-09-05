import React from 'react'
import { useQuery } from '@tanstack/react-query'
import newAxios from '@/lib/new-axios'

export async function checkout({ payload, user_id }) {
  try {
    const { data } = await newAxios.post('/api/sales', { data: payload, user_id: user_id })
    return data
  } catch (error) {
    return 'Something went wrong.'
  }
}

export function salesAPI({ search, offset, limit }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['sales', search, offset, limit],
    queryFn: async () => {
      const { data } = await newAxios.get(`/api/sales??search=${search}&offset=${offset}&limit=${limit}`)
      return data
    },
  })

  return {
    isLoading,
    error,
    data,
  }
}
