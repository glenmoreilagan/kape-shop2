import React from 'react'
import { useQuery } from '@tanstack/react-query'
import newAxios from '@/lib/new-axios'

const csrf = () => newAxios.get('/sanctum/csrf-cookie')

export async function login(creds) {
  try {
    await csrf()
    const response = await newAxios.post('/api/login', creds)
    const result = response.data

    return result
  } catch (error) {
    throw error
  }
}

export async function logout(creds) {
  try {
    // await csrf()
    await newAxios.post('/api/logout')

    localStorage.removeItem('token')
    window.location.href = '/'
  } catch (error) {
    throw error
  }
}
