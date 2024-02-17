'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { Box, TextField } from '@mui/material'
import { Button } from '@/components/ui/button'

import Pusher from 'pusher-js'
import NavBar from '@/components/NavBar'

import newAxios from '@/lib/new-axios'

import useUserStore from '@/store/useUserStore'
import { usersAPI } from '@/api/users'

import { FaGoogle, FaGithub } from 'react-icons/fa'
import axios from 'axios'

import { login } from '@/api/auth'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const LoginPage = () => {
  const router = useRouter()
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  // useEffect(() => {
  //   if (user) {
  //     router.push('/dashboard')
  //   }
  // }, [user])

  const handleLogin = async () => {
    try {
      // const result = await login({ email: 'testmail@gmail.com', password: 'password123' })
      // setUser(result.data.user)
      // localStorage.setItem('token', result.data.token)
      router.replace('/dashboard')
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <NavBar />
      <div className='h-screen flex justify-center items-center bg-[#FAFAFA]'>
        <div className='w-96 md:w-1/3'>
          <div className='flex'>
            {/* <div className='w-1/2 hidden md:flex justify-center items-center'>
              <img src='/login-image.svg' alt='login-image' className=' w-4/5' />
            </div> */}
            <div className='flex-grow px-5 bg-white py-5 rounded-md'>
              <div className='mb-5 w-full'>
                <div>
                  <p className='font-bold text-3xl'>Welcome Back!</p>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='font-light text-sm'>Login to continue</span>
                </div>
              </div>
              <div className='mb-3'>
                <div className=''>
                  <Label>
                    Email
                    <Input type='text' placeholder='Input Email' />
                  </Label>
                </div>
                <div className=''>
                  <Label>
                    Password
                    <Input type='text' placeholder='Input Password' />
                  </Label>
                </div>
              </div>
              <div className='flex justify-between items-center w-full mb-3'>
                <div className=''>
                  <Button onClick={handleLogin}>Sign In</Button>
                </div>
              </div>
              <div className='w-full text-center flex flex-col'>
                <a href='' className='font-light text-blue-500 text-sm'>
                  Forgot password?
                </a>
                <a href='' className='font-light text-gray-500 text-sm'>
                  Don't have an account yet? <span className='text-blue-700'>Sign Up</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
