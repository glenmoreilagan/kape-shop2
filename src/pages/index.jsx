import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Hero from '@/components/home/Hero'
import NavBar from '@/components/NavBar'
import Products from '@/components/home/Products'
import Footer from '@/components/Footer'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <div style={{ minHeight: 'calc(100vh - var(--const-default-nav-height))' }}>
        <NavBar />
        <Hero />
        {/* <OurServices /> */}
        <Products />

        <div className='bg-[#FAFAFA] py-20'>
          <div className='max-w-7xl mx-auto px-3'>
            <div className='h-24'>
              <h1 className='uppercase font-bold text-2xl text-primary text-center'>What clients say</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
              {Array.from({ length: 6 }).map((item) => (
                <div className='bg-white w-full p-8 shadow-sm rounded-md'>
                  <div className='flex gap-3 items-center'>
                    <div>
                      <img
                        src='https://th.bing.com/th/id/OIP.6Q8RT0hh7ld6AaJeoZb_MAHaHa?w=500&h=500&rs=1&pid=ImgDetMain'
                        alt='avatar'
                        width={50}
                        height={50}
                        className='rounded-full'
                      />
                    </div>

                    <div>
                      <p>Juan Dela Cruz</p>
                      <small className='text-gray-400'>Customer</small>
                    </div>
                  </div>

                  <div className='mt-6'>
                    <p className='text-gray-600 text-[.9em] leading-7'>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia laborum aliquid delectus vero
                      consequatur fugiat eaque, reiciendis sit voluptates recusandae.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
