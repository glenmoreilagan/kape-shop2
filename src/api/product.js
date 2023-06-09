import React from 'react'
import { useQuery } from '@tanstack/react-query'
import newAxios from '@/lib/new-axios'
import axios from 'axios'

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

export function ProductFakeAPI() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['fake-products'],
    queryFn: async () => {
      const { data } = await axios.get('https://fakestoreapi.com/products?limit=10')
      return data
    },
  })

  return {
    isLoading,
    error,
    data,
  }
}
