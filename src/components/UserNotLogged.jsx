import React from 'react'
import { useRouter } from 'next/navigation'

import { MdOutlineDoNotTouch } from 'react-icons/md'
import { Button } from '@mui/material'

export default function UserNotLogged() {
  const router = useRouter()

  return (
    <div className='h-screen'>
      <div className='h-full flex justify-center items-center px-20'>
        <div className='w-full'>
          <div className='flex justify-center h-32'>
            <MdOutlineDoNotTouch className='text-5xl text-red-900' />
          </div>
          <h1 className='text-2xl text-center'>Opps you are not logged in</h1>
          <div className='flex justify-center mt-5'>
            <Button variant='contained' className='bg-primary-gray' onClick={() => router.push('/login')}>
              Back to login page
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
