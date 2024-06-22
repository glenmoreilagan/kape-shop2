'use client'
import React from 'react'

import themes from '@/configs/themes'

import moment from 'moment'

// import { GrLinkedin, GrFacebook } from 'react-icons/gr'

const Footer = () => {
  return (
    <>
      <div className="h-24 flex justify-center items-center bg-[#333333] mt-24">
        <div className="px-5 flex flex-col md:flex-row justify-evenly items-center w-11/12">
          <div className="flex-1 flex flex-col items-center md:items-start">
            <p className="text-xs text-white">
              © {moment().format('Y')} {themes.appName}.
            </p>
            <p className="text-gray-300 text-xs">Developed by Glenmore</p>
            <div className="flex items-center mt-2">
              {/* <GrFacebook className="mx-1 rounded-sm text-lg text-white" />
              <GrLinkedin className="mx-1 rounded-sm text-lg text-white" /> */}
            </div>
          </div>
          <div className="flex-1 text-right text-gray-300">
            <a href="#" className="text-xs text-right">
              Privacy Policy
            </a>{' '}
            |{' '}
            <a href="#" className="text-xs text-right">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
