'use client'
import React from 'react'

import { BiCoffeeTogo, BiCoffee, BiCustomize, BiSolidCoffee, BiSolidCoffeeAlt, BiSolidCoffeeTogo } from 'react-icons/bi'

const OurServices = () => {
  const services = [
    {
      title: 'Specialty Coffee Beverages',
      desc: 'Indulge in our expertly crafted espresso-based drinks, such as lattes, cappuccinos, macchiatos, and more, made with the finest beans and steamed to perfection.',
      logo: <BiCoffee size={40} className='text-primary-yellow' />,
    },
    {
      title: 'Cold Brew and Iced Coffees',
      desc: "Beat the heat with our refreshing cold brews and iced coffees, brewed and chilled to perfection for a smooth and bold flavor that's perfect for hot summer days.",
      logo: <BiCoffeeTogo size={40} className='text-primary-yellow' />,
    },
    {
      title: 'Customizable Coffee Options',
      desc: 'Create your own coffee masterpiece with our customizable coffee options, where you can choose your preferred beans, roast level, brewing method, and add-ons to tailor your coffee just the way you like it.',
      logo: <BiCustomize size={40} className='text-primary-yellow' />,
    },
  ]

  const images = [
    { image: <BiSolidCoffeeTogo size={75} />, title: 'Nutella \n Mudslide', price: '300.00' },
    { image: <BiSolidCoffee size={75} />, title: 'Caramel \n Frappuccinno', price: '250.00' },
    { image: <BiSolidCoffeeAlt size={75} />, title: 'Hot \n chocolate', price: '340.00' },
  ]

  return (
    <>
      <section id='services' className=' bg-[#FFF3EF] text-[#191919]'>
        <div className='items-center px-3 max-w-7xl mx-auto py-10'>
          <div className='flex justify-center gap-3 flex-col md:flex-row'>
            {images.map((item) => {
              return (
                <div key={item.title} className='flex gap-3 items-center w-72'>
                  <div className='flex justify-center items-center bg-orange-600 p-3 rounded-full text-[#FAF9F6]'>
                    {item.image}
                  </div>
                  <div>
                    <div className='mb-3 font-bold'>
                      <p className=' whitespace-pre-line'>{item.title}</p>
                    </div>

                    <p className='text-orange-600 font-bold'>P {item.price}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default OurServices
