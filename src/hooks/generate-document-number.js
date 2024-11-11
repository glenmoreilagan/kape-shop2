import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import newAxios from '@/lib/new-axios'

export function generateDocumentNumberApi() {
  return useQuery({
    queryKey: ['generate-document-number'],
    queryFn: async () => {
      const { data } = await newAxios.get('/api/purchases/generate-document-number')
      return data
    },
    // enabled: ,
  })
}
