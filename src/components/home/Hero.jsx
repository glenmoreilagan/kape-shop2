'use client'
import React from 'react'

import { BiLeftArrow } from 'react-icons/bi'

const Hero = () => {
  return (
    <>
      <section id='home' className='h-screen flex justify-center bg-[#FAFAFA] mb-[50px]'>
        <div className='flex justify-center items-center max-w-7xl mx-auto'>
          <div className='w-full md:w-1/2'>
            <div className='px-3'>
              <h1 className='text-center md:text-left mb-6 text-4xl md:text-[3.5rem] leading-[3.5rem] uppercase font-bold text-[#191919]'>
                We are more than just a place to sip.
              </h1>

              <p className='mb-6 text-gray-500 text-center md:text-left'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit a et expedita nemo quaerat perferendis
                molestiae consectetur aliquid.
              </p>

              <div className='flex justify-center md:block'>
                <button className='text-white bg-[#191919] w-32 px-3 py-3 text-xs transition hover:scale-110 rounded-full flex gap-3 items-center justify-around font-medium'>
                  View More
                  <span className='bg-orange-600 p-1 rounded-full'>
                    <BiLeftArrow className='rotate-180' />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className='hidden md:flex justify-center items-center flex-1 '>
            <img src={'/hero-image.svg'} className=' w-[30rem]' />
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
