import React from 'react'

import { toast } from 'sonner'

import axios from 'axios'

const newAxios = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://api-kape-shop.glenmore.tech' : process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withXSRFToken: true,
  withCredentials: true,
})
// newAxios.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token')
//   if (token && token != '' && config.headers) {
//     config.headers['Authorization'] = `Bearer ${token}`
//   }
//   return config
// })

newAxios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const pathname = window.location.pathname
    const statusCode = error.response.status
    const urlPaths = ['/dashboard', '/categories', '/brands', '/products', '/purchases', '/pos']

    switch (statusCode) {
      case 401:
        if (urlPaths.includes(pathname)) {
          const promise = () =>
            new Promise((resolve, reject) =>
              setTimeout(() => reject({ text: 'You are unauthorized. Please login first.' }), 2000)
            )
          toast.promise(promise, {
            loading: 'Loading...',
            // success: (data) => {
            //   return `${data.name}`
            // },
            error: (data) => {
              window.location.href = '/login'
              return `${data.text}`
            },
          })
        }
        break
      case 400:
        toast.error('400 | Something went wrong!')
        break
      case 404:
        toast.error('404 | Not Found!')
        break
      default:
        toast.error('Server Error!')
        break
    }
  }
)

export default newAxios
