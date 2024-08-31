import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import newAxios from '@/lib/new-axios'

export function brandAPI({ search, offset, limit }) {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['brands', search, offset, limit],
    queryFn: async () => {
      const { data } = await newAxios.get(`/api/brands?search=${search}&offset=${offset}&limit=${limit}`)
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

type oldQueryDataTypes = {
  status: string
  message: string
  data: [
    {
      id: number
      brand: string
    }
  ]
}

export function addBrandAPI() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (brand: string) => {
      return await newAxios.post('/api/brands', brand)
    },
    onSuccess: (data) => {
      // this will be trigger another request
      // queryClient.invalidateQueries('brands')
      queryClient.setQueryData(['brands'], (oldQueryData: oldQueryDataTypes) => {
        return {
          status: oldQueryData.status,
          message: oldQueryData.message,
          data: [...oldQueryData.data, data?.data?.data],
        }
      })
    },
  })
}

export function updateBrandAPI() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (brand: { brandId: number; brand: string }) => {
      return await newAxios.put(`/api/brands/${brand.brandId}`, brand.brand)
    },
    onSuccess: (data, variables) => {
      // this will be trigger another request
      // queryClient.invalidateQueries('brands')

      // this is not trigger new request
      queryClient.setQueryData(['brands'], (oldQueryData: oldQueryDataTypes) => {
        // https://bobbyhadz.com/blog/javascript-update-property-of-object-in-array
        // this if for single row updating need to find the item to change the key/value pair

        return {
          status: oldQueryData.status,
          message: oldQueryData.message,
          data: oldQueryData.data.map((item) => {
            if (item.id === variables.brandId) {
              return { ...item, brand: data?.data?.data?.brand }
            }

            return item
          }),
        }
      })
    },
  })
}
