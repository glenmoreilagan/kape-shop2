'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box, TextField, Button } from '@mui/material'

import Pusher from 'pusher-js'
import NavBar from '@/components/NavBar'

import newAxios from '@/lib/new-axios'

import useUserStore from '@/store/useUserStore'
import { usersAPI } from '@/api/users'

import { FaGoogle, FaGithub } from 'react-icons/fa'
import axios from 'axios'

import { login } from '@/api/auth'

const LoginPage = () => {
  const router = useRouter()
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user])

  const handleLogin = async () => {
    try {
      const result = await login({ email: 'testmail@gmail.com', password: 'password123' })
      setUser(result.data.user)
      localStorage.setItem('token', result.data.token)
      router.replace('/dashboard')
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <NavBar />
      <div className='h-screen flex justify-center items-center bg-[#FAFAFA]'>
        <div className='w-11/12'>
          <div className='flex relative'>
            <div className='w-1/2 hidden md:flex justify-center items-center'>
              <img src='/login-image.svg' alt='login-image' className=' w-4/5' />
            </div>
            <div className='flex-grow px-5 bg-white py-5 rounded-lg'>
              <div className='mb-5 w-full'>
                <div>
                  <p className='font-bold text-3xl'>Welcome Back!</p>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='font-light text-sm'>Login to continue</span>
                </div>
              </div>
              <div className='mb-5'>
                <div className='mb-3'>
                  <TextField className='w-full' id='email' type='email' label='Email' variant='outlined' size='small' />
                </div>
                <div className='mb-3'>
                  <TextField
                    className='w-full'
                    id='password'
                    type='password'
                    label='Password'
                    variant='outlined'
                    size='small'
                  />
                </div>
              </div>
              <div className='flex justify-between items-center w-full mb-3'>
                <div className=''>
                  <Button variant='contained' className='bg-primary-gray text-white' size='small' onClick={handleLogin}>
                    Sign In
                  </Button>
                </div>
                <div>
                  <a href='' className='font-light text-gray-500 text-sm'>
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* <div className='flex justify-center mb-10'>
                <div className='w-1/2 flex justify-center items-center flex-col gap-2'>
                  <Button
                    startIcon={<FaGoogle fontSize={22} />}
                    className='flex items-center bg-white border border-gray-300 rounded-lg shadow-md w-full px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                  >
                    <span>Continue with Google</span>
                  </Button>

                  <Button
                    startIcon={<FaGithub fontSize={22} />}
                    className='flex items-center bg-white border border-gray-300 rounded-lg shadow-md w-full px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                  >
                    <span>Continue with Github</span>
                  </Button>
                </div>
              </div> */}
              <a href='' className='font-light text-gray-500 text-sm absolute bottom-5'>
                Don't have an account yet? <span className='text-blue-700'>Sign Up</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
