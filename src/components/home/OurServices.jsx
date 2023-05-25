'use client'
import React from 'react'

import { BiCoffeeTogo, BiCoffee, BiCustomize } from 'react-icons/bi'

const OurServices = () => {
  const services = [
    {
      title: 'Specialty Coffee Beverages',
      desc: 'Indulge in our expertly crafted espresso-based drinks, such as lattes, cappuccinos, macchiatos, and more, made with the finest beans and steamed to perfection.',
      logo: <BiCoffee size={40} className="text-[#ffedbc]" />,
    },
    {
      title: 'Cold Brew and Iced Coffees',
      desc: "Beat the heat with our refreshing cold brews and iced coffees, brewed and chilled to perfection for a smooth and bold flavor that's perfect for hot summer days.",
      logo: <BiCoffeeTogo size={40} className="text-[#ffedbc]" />,
    },
    {
      title: 'Customizable Coffee Options',
      desc: 'Create your own coffee masterpiece with our customizable coffee options, where you can choose your preferred beans, roast level, brewing method, and add-ons to tailor your coffee just the way you like it.',
      logo: <BiCustomize size={40} className="text-[#ffedbc]" />,
    },
  ]

  return (
    <>
      <section id="services" className="h-screen flex justify-center bg-white mb-[50px] md:mb-0">
        <div className="flex justify-center items-center w-11/12">
          <div className="w-full h-full flex flex-col md:flex-row justify-center items-center gap-5">
            {services.map((serv) => {
              return (
                <div
                  key={serv.title}
                  className="w-full md:w-1/4 md:h-1/2 px-5 py-5 rounded-md transition ease-in-out delay-150 shadow-sm hover:scale-105 hover:shadow-lg"
                >
                  <div className="flex justify-center mb-5">
                    <div className="bg-[#8B5D33] rounded-md p-1">{serv.logo}</div>
                  </div>
                  <div className="flex justify-center mb-5">
                    <h4 className="uppercase font-bold text-[#be8a5e]">{serv.title}</h4>
                  </div>
                  <div>
                    <p className="text-center text-[#616161] text-sm font-light">{serv.desc}</p>
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
