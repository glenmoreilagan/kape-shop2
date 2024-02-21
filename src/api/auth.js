import React from 'react'
import { useQuery } from '@tanstack/react-query'
import newAxios from '@/lib/new-axios'

export async function login(creds) {
  try {
    await newAxios.get('/sanctum/csrf-cookie')
    const response = await newAxios.post('/login', creds)
    const result = response.data

    return result
  } catch (error) {
    throw error
  }
}

export async function logout(creds) {
  try {
    await newAxios.post('/logout')

    window.location.href = '/'
  } catch (error) {
    throw error
  }
}
