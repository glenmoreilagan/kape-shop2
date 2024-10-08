'use client'
import React from 'react'

import themes from '@/configs/themes'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

const AboutPage = () => {
  return (
    <>
      <NavBar />
      <section className='max-w-7xl mx-auto space-y-10' style={{ minHeight: 'calc(100vh - var(--const-default-nav-height))' }}>
        <div className='md:flex items-center justify-center hidden py-10'>
          <img src='/mockups/Group 22.png' alt='About Image' />
        </div>
        <div className='px-3 md:px-0'>
          <h1 className='font-bold text-3xl'>ABOUT US</h1>

          <p className='my-5'>
            Welcome to <span className='font-bold'>{themes.appName}</span>!
          </p>

          <p className='my-5'>
            At [Your Coffee Shop Name], we are passionate about crafting exceptional coffee experiences for our valued
            customers. Located in the heart of [Your City/Town], our cozy coffee shop is a haven for coffee lovers
            seeking a warm and welcoming ambiance, coupled with the irresistible aroma of freshly brewed coffee.
          </p>

          <p className='my-5'>
            We take pride in sourcing only the finest beans from around the world and expertly roasting them to
            perfection. Our skilled baristas are trained to create an array of specialty coffee beverages, ranging from
            classic espresso-based drinks to unique seasonal creations that will delight your taste buds. Whether you're
            a latte lover, a cappuccino connoisseur, or an adventurous coffee explorer, we have something to satisfy
            every palate.
          </p>

          <p className='my-5'>
            But it's not just about the coffee at [Your Coffee Shop Name]. We are committed to providing outstanding
            customer service and creating a sense of community for our patrons. Our friendly and knowledgeable staff are
            always ready to greet you with a smile and make your visit a memorable one. We believe that a cup of coffee
            is more than just a beverage - it's a catalyst for connection, conversation, and shared moments of joy.
          </p>

          <p className='my-5'>
            In addition to our delicious coffee, we also offer a tempting selection of freshly baked pastries and
            delectable treats to complement your coffee experience. Whether you're in need of a quick pick-me-up in the
            morning, a cozy spot for a catch-up with friends, or a quiet corner to curl up with a book, [Your Coffee
            Shop Name] is the perfect destination.
          </p>

          <p className='my-5'>
            Join us at [Your Coffee Shop Name] and let us be your go-to coffee haven. We look forward to serving you
            with our passion for coffee and genuine hospitality. Visit us today and experience the warm and inviting
            atmosphere of our coffee shop. Cheers to great coffee moments!
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default AboutPage
