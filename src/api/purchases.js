import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import newAxios from '@/lib/new-axios'
import axios from 'axios'

// const queryClient = useQueryClient()

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

export const purchaseUpdateQuantity = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data) => {
      return newAxios.put(`/api/purchases/update-quantity/${data.item.id}`, {
        action: data.action,
        quantity: data.qty,
      })
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['purchases'], type: 'active' })
    },
  })
}

export const addPurchaseProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ documentState, newProducts }) => {
      return newAxios.post(`/api/purchases/add-product`, {
        document: documentState.document,
        products: newProducts,
      })
    },
    onSuccess: async () => {
      // these will be the return from mutation call
      await queryClient.refetchQueries({ queryKey: ['purchases'], type: 'active' })
    },
  })
}
