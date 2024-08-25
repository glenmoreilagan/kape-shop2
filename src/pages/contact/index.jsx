'use client'
import React from 'react'
import themes from '@/configs/themes'
import NavBar from '@/components/NavBar'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import Footer from '@/components/Footer'
import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const CONTACT_SCHEMA = z.object({
  fname: z.string().min(1, 'First Name is required'),
  lname: z.string().min(1, 'Last Name is required'),
  email: z.string().min(1, 'Email is required').email(),
  message: z.string().min(1, 'Message is required'),
})

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    setValue,
    formState: { errors, isValidating },
  } = useForm({ resolver: zodResolver(CONTACT_SCHEMA) })

  const submitForm = (data) => {
    console.log(data)
  }

  return (
    <>
      <NavBar />
      <div className='bg-gray-50'>
        <section className='max-w-7xl mx-auto' style={{ minHeight: 'calc(100vh - var(--const-default-nav-height))' }}>
          <div className='flex flex-col lg:flex-row justify-between lg:py-10'>
            <div className='hidden px-3 lg:block lg:px-0'>
              <img src='/mockups/Rectangle 43 (1).png' alt='' />
            </div>

            <div className='flex-1 rounded-md bg-white'>
              <div className='p-6'>
                <h1 className='font-bold text-3xl mb-10'>Contact Us</h1>

                <p className='text-gray-600 text-sm leading-[1.6rem]'>
                  Stay connected with us and let your voice be heard. Whether you have questions, need assistance, or
                  just want to share your thoughts, we're here to help you every step of the way. Reach out to us and
                  experience our commitment to providing exceptional support and service.
                </p>
              </div>
              <form onSubmit={handleSubmit(submitForm)} className='px-6'>
                {/* <div className='flex flex-col lg:flex-row gap-3 mb-3'> */}
                <div className='flex-1 mb-3'>
                  <label className='font-bold text-sm text-gray-600'>First Name</label>
                  <Input {...register('fname')} autoComplete='off' />
                  <p className='text-red-600 text-xs'>{errors?.fname?.message}</p>
                </div>
                <div className='flex-1 mb-3'>
                  <label className='font-bold text-sm text-gray-600'>Last Name</label>
                  <Input {...register('lname')} autoComplete='off' />
                  <p className='text-red-600 text-xs'>{errors?.lname?.message}</p>
                </div>
                {/* </div> */}
                <div className='flex-1 mb-3'>
                  <label className='font-bold text-sm text-gray-600'>Email</label>
                  <Input {...register('email')} autoComplete='off' />
                  <p className='text-red-600 text-xs'>{errors?.email?.message}</p>
                </div>
                <div className='flex-1 mb-3'>
                  <label className='font-bold text-sm text-gray-600'>What can we help you with?</label>
                  <Textarea {...register('message')} autoComplete='off' />
                  <p className='text-red-600 text-xs'>{errors?.message?.message}</p>
                </div>
                <div className='flex-1 mb-3 mt-5'>
                  <Button type='submit'>Submit</Button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

export default ContactPage
