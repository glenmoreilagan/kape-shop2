import React from 'react'
import { useRouter } from 'next/router'

import { FaBoxes } from 'react-icons/fa'

export default function CategoryDisplay({ categories }) {
  const router = useRouter()

  if (!categories) return <h1>Loading...</h1>
  return (
    <>
      {categories?.data.map((row, i) => (
        <div
          className='group border rounded-md w-48 mb-4 cursor-pointer hover:bg-gray-100'
          onClick={() => router.push(`sales/products/${row.uuid}`)}
        >
          <div className='mb-3 overflow-hidden rounded-md'>
            <img
              src={`https://picsum.photos/id/${i}/200/200`}
              className='w-full rounded-md group-hover:scale-125 transition-transform duration-500 ease-in-out'
              alt='Category Icon'
            />
          </div>
          <div className='px-3 space-y-3 mb-3'>
            <h4 className='font-bold uppercase text-md truncate' title={row.category}>
              {row.category}
            </h4>
            <div className='flex gap-2'>
              <FaBoxes />
              <span className='text-gray-400 font-bold text-xs'>{row.products_count}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
