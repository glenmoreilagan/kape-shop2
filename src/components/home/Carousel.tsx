'use client'
import React, { FC, useEffect, useState } from 'react'
import ItemsCarousel from 'react-items-carousel'
// https://kareemaly.github.io/react-items-carousel/

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Box, Button } from '@mui/material'

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

import { ModalStateViewProductCard, SelectProductToView } from '@/store/useViewProductCardStore'

const items = [
  {
    id: 1,
    image: 'DBAFD1BA971A4121B74F356BD51127D4-removebg-preview.png',
    title: 'Chocolate Mint Crème Frappuccino®',
    price: 'P199',
  },
  {
    id: 2,
    image: '22f8e0db2106468d953bce434f5328a3-removebg-preview.png',
    title: 'Caramel Crunch Crème Frappuccino®',
    price: 'P299',
  },
  {
    id: 3,
    image: 'abd48a12ed76482790f2079db420f2c4-removebg-preview.png',
    title: 'Strawberry Crème Frappuccino®',
    price: 'P259',
  },
  {
    id: 4,
    image: '7FD73D3C93AF43FFA84400A42EFC9F87-removebg-preview.png',
    title: 'Chocolate Java Mint Frappuccino®',
    price: 'P299',
  },
  {
    id: 5,
    image: '1fd99578d31f4072a52892398d8f1fa8-removebg-preview.png',
    title: 'Cookie Crumble Frappuccino®',
    price: 'P259',
  },
  {
    id: 5,
    image: 'c297d3528849499f81322d561575d94b-removebg-preview.png',
    title: 'Espresso Frappuccino®',
    price: 'P259',
  },
]

type ItemsProps = {
  items: [
    {
      id: number
      image: string
      title: string
    }
  ]
}

const Carousel: FC<ItemsProps> = ({ items }) => {
  const { SetShowViewProduct } = ModalStateViewProductCard()
  const { SetSelectedProduct } = SelectProductToView()

  const [isMobile, setIsMobile] = useState(false)

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth <= 640) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  const handleViewProduct = (item: { id: number; image: string; title: string }) => {
    SetShowViewProduct(true)
    SetSelectedProduct(item)
  }

  // create an event listener
  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {items?.map((item) => {
        return (
          <div key={item.id} className='rounded-md bg-[#FAF9F6] group' onClick={() => handleViewProduct(item)}>
            {/* <CardMedia sx={{ height: 250 }} image={item.image} title={item.title} /> */}
            <div className='overflow-hidden'>
              <img
                src={item.image}
                alt={item.title}
                className='aspect-square group-hover:scale-125 duration-500 ease-in-out rounded-t-md'
              />
            </div>
            <div className='px-3 py-3 space-y-3'>
              <p className='font-bold text-md md:text-sm text-slate-600'>{item.title}</p>
              <p className=' text-gray-500 text-xs md:text-sm font-medium'>129.00</p>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Carousel
