'use client'
import React from 'react'

import themes from '@/configs/themes'

const Hero = () => {
  return (
    <>
      <section id="home" className="h-screen flex justify-center bg-[#FAFAFA] mb-[50px] md:mb-0">
        <div className="flex justify-center items-center w-11/12">
          <div className="w-full md:w-1/2">
            <div className="px-5">
              <h1 className="text-center md:text-left text-[#333333] tracking-wider leading-7 mb-10">
                <span className="font-bold text-2xl">We</span> are more than just a place to sip, It's where your taste
                buds will take a trip. Our coffee is made with the finest beans, Ethically-sourced and expertly roasted
                to extremes.
              </h1>

              <div className="flex justify-center md:block">
                <button className="text-[#333333] hover:text-white hover:bg-[#333333] border border-[#333333] w-40 p-2 transition ease-in-out delay-150 hover:scale-110 rounded-md">
                  ORDER NOW
                </button>
              </div>
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center flex-1 ">
            <img src={'/hero-image.svg'} className=" w-[30rem]" />
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
