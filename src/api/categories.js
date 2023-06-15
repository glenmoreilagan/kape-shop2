import React from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import newAxios from '@/lib/new-axios'
import axios from 'axios'

export function categoryAPI() {
  const { isLoading, error, data, refetch, isFetching } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await newAxios.get('/api/categories')
      return data
    },
  })

  return {
    isLoading,
    error,
    data,
    refetch,
    isFetching,
  }
}

export function addCategoryAPI() {
  return useMutation({
    mutationFn: async (category) => {
      return await newAxios.post('/api/categories', category)
    },
  })
}

export function updateCategoryAPI() {
  return useMutation({
    mutationFn: async (category) => {
      return await newAxios.put(`/api/categories/${category.catId}`, category.category)
    },
  })
}

export function categoryFakeAPI() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['fake-products'],
    queryFn: async () => {
      const { data } = await axios.get(`https://fakestoreapi.com/products/categories`)
      return data
    },
  })

  return {
    isLoading,
    error,
    data,
  }
}
