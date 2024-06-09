'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

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

import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

const LoginPage = () => {
  const router = useRouter()
  const { isLoading, error, data: users } = usersAPI()
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  // useEffect(() => {
  //   if (user) {
  //     router.push('/dashboard')
  //   }
  // }, [user])

  const handleLogin = async () => {
    try {
      const response = await login({ email: 'testmail@gmail.com', password: 'password' })
      // localStorage.setItem('token', response.data.token)
      // setUser(response.data.user)
      router.replace('/dashboard')
    } catch (error) {
      throw error
    }
  }

  // const loginGoogle = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     console.log(tokenResponse.access_token)

  //     try {
  //       const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
  //         headers: {
  //           Authorization: `Bearer ${tokenResponse.access_token}`,
  //         },
  //       })

  //       // console.log(response.data)

  //       const callbackResponse = await newAxios.post('auth/callback', {
  //         ...response.data,
  //         provider: 'google',
  //       })
  //       if (callbackResponse.status === 201) {
  //         console.log(callbackResponse.data)
  //         router.replace('/dashboard')
  //       }
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   },
  // })

  useEffect(() => {
    setUser(users)

    if (users && !error) {
      router.push('/dashboard')
    }
  }, [users])

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
                    <Input type='text' placeholder='Input Email' defaultValue='testmail@gmail.com' />
                  </Label>
                </div>
                <div className=''>
                  <Label>
                    Password
                    <Input type='text' placeholder='Input Password' defaultValue='password' />
                  </Label>
                </div>
              </div>
              <div className='flex justify-between items-center w-full mb-3'>
                <div className='w-full'>
                  <Button className='w-full h-11' onClick={handleLogin}>
                    Sign In
                  </Button>
                </div>
              </div>
              <div className='mb-3 w-full'>
                {/* <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    // console.log(credentialResponse)
                    console.log(jwtDecode(credentialResponse.credential))
                  }}
                  onError={() => {
                    console.log('Login Failed')
                  }}
                /> */}
                {/* <Button
                  className='flex gap-3 items-center justify-center w-full h-11 bg-white text-[#111111] hover:bg-[#EDEDED]'
                  onClick={() => loginGoogle()}
                >
                  <>
                    <FaGoogle />
                    <span>Sign in with Google</span>
                  </>
                </Button> */}
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
