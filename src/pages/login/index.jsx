'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box, TextField, Button } from '@mui/material'

import Pusher from 'pusher-js'
import NavBar from '@/components/NavBar'

import newAxios from '@/lib/new-axios'

const LoginPage = () => {
  const router = useRouter()
  // let pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
  //   cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  //   forceTLS: true,
  //   channelAuthorization: {
  //     endpoint: "http://localhost:3030/pusher/auth",
  //   },
  // });

  // useEffect(() => {
  //   Pusher.logToConsole = true;
  //   let pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
  //     cluster: "ap1",
  //   });

  //   let channel = pusher.subscribe(process.env.NEXT_PUBLIC_PUSHER_CHANNEL);
  //   channel.bind("event-test-realtime", function (data) {
  //     console.log(JSON.stringify(data));
  //   });
  // }, []);

  useEffect(() => {
    // const response = newAxios.get("/api/test-response");
    // console.log(response.data);
  }, [])

  return (
    <>
      <div className="h-screen flex justify-center items-center bg-[#FAFAFA]">
        <div className="w-11/12">
          <div className="flex relative">
            <div className="w-1/2 hidden md:flex justify-center items-center">
              <img src="/login-image.svg" alt="login-image" className=" w-4/5" />
            </div>
            <div className="flex-grow px-5 bg-white py-5 rounded-lg">
              <div className="mb-5 w-full">
                <div>
                  <p className="font-bold text-3xl">Welcome Back!</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-light text-sm">Login to continue</span>
                </div>
              </div>
              <div className="mb-5">
                <div className="mb-3">
                  <TextField className="w-full" id="email" type="email" label="Email" variant="outlined" size="small" />
                </div>
                <div className="mb-3">
                  <TextField
                    className="w-full"
                    id="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#333333', color: '#fff' }}
                    size="small"
                    onClick={() => router.replace('/dashboard')}
                  >
                    Login
                  </Button>
                </div>
                <div>
                  <a href="" className="font-light text-gray-500 text-sm">
                    Forgot password?
                  </a>
                </div>
              </div>
              <a href="" className="font-light text-gray-500 text-sm absolute bottom-5">
                Don't have an account yet? <span className="text-blue-700">Sign Up</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
