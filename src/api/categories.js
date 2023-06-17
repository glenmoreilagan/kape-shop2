import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import newAxios from '@/lib/new-axios'

export function categoryAPI() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await newAxios.get('/api/categories')
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

export function addCategoryAPI() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (category) => {
      return await newAxios.post('/api/categories', category)
    },
    onSuccess: (data) => {
      // this will be trigger another request
      // queryClient.invalidateQueries('categories')

      // this is not trigger new request
      queryClient.setQueryData(['categories'], (oldQueryData) => [...oldQueryData, data.data])
    },
  })
}

export function updateCategoryAPI() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (category) => {
      return await newAxios.put(`/api/categories/${category.catId}`, category.category)
    },
    onSuccess: (data, variables) => {
      // this will be trigger another request
      // queryClient.invalidateQueries('categories')

      // this is not trigger new request
      queryClient.setQueryData(['categories'], (oldQueryData) =>
        // https://bobbyhadz.com/blog/javascript-update-property-of-object-in-array
        // this if for single row updating need to find the item to change the key/value pair
        oldQueryData.map((item) => {
          if (item._id === variables.catId) {
            return { ...item, category: data?.data?.category }
          }

          return item
        })
      )
    },
  })
}
