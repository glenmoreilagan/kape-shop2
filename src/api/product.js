import React from 'react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import newAxios from '@/lib/new-axios'

export function productAPI() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await newAxios.get('/api/products')
      return data
    },
  })

  return {
    isLoading,
    error,
    data,
  }
}

export function productFindOneAPI(id) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const { data } = await newAxios.get(`/api/products/${id}`)
      return data
    },
    enabled: !!id,
  })

  return {
    isLoading,
    error,
    data,
  }
}
