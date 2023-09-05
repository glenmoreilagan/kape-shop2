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

export function purchaseFindOneAPI(id, document_no) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['purchases', { id, document_no }],
    queryFn: async () => {
      const { data } = await newAxios.get(`/api/purchases/edit/${document_no}/${id}`)
      return data
    },
    enabled:  !!id && !!document_no,
  })

  return {
    isLoading,
    error,
    data,
  }
}
