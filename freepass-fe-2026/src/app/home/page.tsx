import FeaturedProducts from '@/src/feature/home/components/FeaturedProducts'
import HeroBanner from '@/src/feature/home/components/HeroBanner'
import React from 'react'

const page = () => {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <FeaturedProducts />
    </main>
  )
}

export default page