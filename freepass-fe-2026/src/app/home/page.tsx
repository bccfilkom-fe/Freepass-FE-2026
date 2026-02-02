import HeroBanner from '@/src/feature/home/components/HeroBanner'
import Footer from '@/src/shared/components/footer/Footer'
import Navbar from '@/src/shared/components/navbar/container/Navbar'
import React from 'react'

const page = () => {
  return (
    <>
    <Navbar/>
    <HeroBanner/>
    <Footer/>
    </>
  )
}

export default page