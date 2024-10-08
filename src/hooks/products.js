import React from 'react'
import { useQuery } from '@tanstack/react-query'
import newAxios from '@/lib/new-axios'
import axios from 'axios'

export function productAPI({ search, offset, limit }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['products', search, offset, limit],
    queryFn: async () => {
      const { data } = await newAxios.get(`/api/products?search=${search}&offset=${offset}&limit=${limit}`)
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

export async function storeProductAPI(data) {
  try {
    const { data } = await newAxios.post('/api/products', data)
    return data
  } catch (error) {
    throw 'Something went wrong.'
  }
}

export async function updateProductAPI(id, data) {
  try {
    const { data } = await newAxios.put(`/api/products/${id}`, data)
    return data
  } catch (error) {
    throw new Error(error)
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
