'use client'

import { useRevealer } from "@/hooks/useRevealer"
import Hero from "./Hero"
import Services from "./Services"
import Barbers from "./Barbers"
import Operational from "./Operational"
import Gallery from "./Gallery"
import Category from "./Category"
import Step from "./Step"
import Footer from "./Footer"
import Quote from "./Quote"

const HomePage = () => {
  useRevealer()

  return (
    <>
      <div className="revealer"></div>
      <Hero />
      <Services />
      <Quote />
      <Barbers />
      <Operational/>
      <Gallery />
      <Category />
      <Step />
      <Footer />
    </>
  )
}

export default HomePage