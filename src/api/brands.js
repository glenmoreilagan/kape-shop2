import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import newAxios from '@/lib/new-axios'

export function brandAPI() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const { data } = await newAxios.get('/api/brands')
      return data
    },
  })

  return {
    isLoading,
    error,
    data,
    isFetching,
  }
}

export function addBrandAPI() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (brand) => {
      return await newAxios.post('/api/brands', brand)
    },
    onSuccess: (data) => {
      // this will be trigger another request
      // queryClient.invalidateQueries('brands')
      queryClient.setQueryData(['brands'], (oldQueryData) => [...oldQueryData, data.data])
    },
  })
}

export function updateBrandAPI() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (brand) => {
      return await newAxios.put(`/api/brands/${brand.brandId}`, brand.brand)
    },
    onSuccess: (data, variables) => {
      // this will be trigger another request
      // queryClient.invalidateQueries('brands')

      // this is not trigger new request
      queryClient.setQueryData(['brands'], (oldQueryData) =>
        // https://bobbyhadz.com/blog/javascript-update-property-of-object-in-array
        // this if for single row updating need to find the item to change the key/value pair
        oldQueryData.map((item) => {
          if (item._id === variables.brandId) {
            return { ...item, brand: data?.data?.brand }
          }

          return item
        })
      )
    },
  })
}
