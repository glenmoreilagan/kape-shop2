import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import newAxios from '@/lib/new-axios'
import axios from 'axios'

// const queryClient = useQueryClient()

export function purchaseAPI({ search, offset, limit }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['purchases', search, offset, limit],
    queryFn: async () => {
      const { data } = await newAxios.get(`/api/purchases?search=${search}&offset=${offset}&limit=${limit}`)
      return data
    },
  })

  return {
    isLoading,
    error,
    data,
  }
}

export function purchaseFindOneAPI(document_number_params) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['purchases', { document_number_params }],
    queryFn: async () => {
      const { data } = await newAxios.get(`/api/purchases/${document_number_params}`)
      return data
    },
    enabled: !!document_number_params,
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
