'use client'

import { useRevealer } from "@/hooks/useRevealer"
import Footer from "./Footer"
import Hero from "./Hero"
import Quote from "./Quote"
import Services from "./Services"

const HomePage = () => {
  useRevealer()

  return (
    <>
      <div className="revealer"></div>
      <Hero />
      <Services />
      <Quote />
      {/* <Barbers /> */}
      {/* <Operational/> */}
      {/* <Gallery /> */}
      {/* <Category /> */}
      {/* <Step /> */}
      <Footer />
    </>
  )
}

export default HomePage