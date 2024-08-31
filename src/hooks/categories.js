import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import newAxios from '@/lib/new-axios'

export function categoryAPI({ search, offset, limit }) {
  return useQuery({
    queryKey: ['categories', search, offset, limit],
    queryFn: async () => {
      const { data } = await newAxios.get(`/api/categories?search=${search}&offset=${offset}&limit=${limit}`)
      return data
    },
  })

  // return {
  //   isLoading,
  //   error,
  //   data,
  //   isFetching,
  // }
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
      queryClient.setQueryData(['categories'], (oldQueryData) => {
        return {
          status: oldQueryData.status,
          message: oldQueryData.message,
          data: [...oldQueryData.data, data?.data?.data],
        }
      })
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
      queryClient.setQueryData(['categories'], (oldQueryData) => {
        // https://bobbyhadz.com/blog/javascript-update-property-of-object-in-array
        // this if for single row updating need to find the item to change the key/value pair

        return {
          status: oldQueryData.status,
          message: oldQueryData.message,
          data: oldQueryData.data.map((item) => {
            if (item.id === variables.catId) {
              return { ...item, category: data?.data?.data?.category }
            }

            return item
          }),
        }
      })
    },
  })
}
