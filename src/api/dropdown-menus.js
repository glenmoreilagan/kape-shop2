import React from 'react'
import { useQuery } from '@tanstack/react-query'
import newAxios from '@/lib/new-axios'

export function DropDownCategoryAPI() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['dropdown-categories'],
    queryFn: async () => {
      const { data } = await newAxios.get('/api/dropdown/categories')
      return data
    },
  })

  return {
    isLoading,
    error,
    data,
  }
}

export function DropDownBrandAPI() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['dropdown-brands'],
    queryFn: async () => {
      const { data } = await newAxios.get('/api/dropdown/brands')
      return data
    },
  })

  return {
    isLoading,
    error,
    data,
  }
}
