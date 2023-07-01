import React from 'react'
import { useQuery } from '@tanstack/react-query'
import newAxios from '@/lib/new-axios'
import axios from 'axios'

export function usersAPI() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/users/1')
      return data
    },
  })

  return {
    isLoading,
    error,
    data,
  }
}
