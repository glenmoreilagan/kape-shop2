'use client'
import React from 'react'
// import { SyncLoader } from 'react-spinners'
import CircularProgress from '@mui/material/CircularProgress'

const Loader = ({ isLoading }) => {
  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-[9999] overflow-hidden 
          flex flex-col items-center justify-center ${!isLoading && 'hidden'}`}
        style={{ background: 'rgba(17, 24, 39, 0.8)' }}
      >
        {/* <SyncLoader color='#285676' loading={isLoading} /> */}
        <CircularProgress className='text-[#CCC]' />
        <p className='text-center text-white mt-10'>This may take a few seconds, please don't close this page.</p>
      </div>
    </>
  )
}

export default Loader
