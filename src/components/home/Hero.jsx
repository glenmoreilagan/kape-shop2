'use client'
import React from 'react'

import { BiLeftArrow } from 'react-icons/bi'

const Hero = () => {
  return (
    <>
      <section id='home' className='h-screen flex justify-center bg-[#FAFAFA]'>
        <div className='flex justify-center items-center max-w-7xl mx-auto'>
          <div className='w-full md:w-1/2'>
            <div className='px-3'>
              <h1 className='text-center md:text-left mb-6 text-4xl md:text-[6.5rem] leading-[5rem] uppercase font-bold text-default-foreground'>
                Everyday With <span className='text-5xl md:text-8xl capitalize parisienne-regular text-[#BE8A5E]'>coffee</span>
              </h1>

              <p className='mb-6 text-gray-400 text-center md:text-left'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit a et expedita nemo quaerat perferendis
                molestiae consectetur aliquid.
              </p>

              <div className='flex justify-center md:block'>
                <button className='text-white bg-default-foreground w-32 px-3 py-3 text-xs transition delay-150 hover:scale-110 rounded-md flex gap-3 items-center justify-around font-medium'>
                  View More
                  <span className='bg-[#BE8A5E] p-1 rounded-full'>
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
