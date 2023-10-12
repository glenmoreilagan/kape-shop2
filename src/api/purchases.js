import React from 'react'
import { useQuery } from '@tanstack/react-query'
import newAxios from '@/lib/new-axios'
import axios from 'axios'

export function purchaseAPI() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['purchases'],
    queryFn: async () => {
      const { data } = await newAxios.get('/api/purchases')
      return data
    },
  })

  return {
    isLoading,
    error,
    data,
  }
}

export function purchaseFindOneAPI(uuid) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['purchases', { uuid }],
    queryFn: async () => {
      const { data } = await newAxios.get(`/api/purchases/${uuid}`)
      return data
    },
    enabled: !!uuid,
  })

  return {
    isLoading,
    error,
    data,
  }
}
