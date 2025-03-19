import React, { useEffect, useState } from 'react'

import { faker } from '@faker-js/faker'

const avatars = [
  'https://api.dicebear.com/9.x/lorelei/svg?seed=Andrea&rotate=10',
  'https://api.dicebear.com/9.x/lorelei/svg?seed=Ryker&rotate=10',
  'https://api.dicebear.com/9.x/lorelei/svg?seed=Leo&rotate=10',
  'https://api.dicebear.com/9.x/lorelei/svg?seed=Caleb&rotate=10',
]

export default function Testimony() {
  const [fakeData, setFakeData] = useState(null)

  useEffect(() => {
    setFakeData(faker.person.fullName())
  }, [])

  return (
    <div className='bg-white w-full p-8 shadow-sm rounded-md'>
      <div className='flex gap-3 items-center'>
        <div className='bg-primary-foreground rounded-full shadow-sm'>
          <img
            src={`${avatars[Math.floor(Math.random() * avatars.length)]}`}
            alt='avatar'
            width={50}
            height={50}
            className='rounded-full'
          />
        </div>

        <div>
          <p>{fakeData}</p>
          <small className='text-gray-400'>Customer</small>
        </div>
      </div>

      <div className='mt-6'>
        <p className='text-gray-600 text-[.9em] leading-7'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia laborum aliquid delectus vero consequatur
          fugiat eaque, reiciendis sit voluptates recusandae.
        </p>
      </div>
    </div>
  )
}
