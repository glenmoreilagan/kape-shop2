import React from 'react'
import { useQuery } from '@tanstack/react-query'
import newAxios from '@/lib/new-axios'
import axios from 'axios'

import { logout } from './auth'
import { useRouter } from 'next/router'

export function usersAPI() {
  const router = useRouter()

  const { isLoading, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const { data } = await newAxios.get('/api/user')
        return data
      } catch (error) {
        throw error
      }
    },
    staleTime: 1000 * 60, // 1 min
  })

  return {
    isLoading,
    error,
    data,
  }
}
