import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const HeroBanner = () => {
  return (
    <section className="relative w-screen h-[250px] md:h-[500px] lg:h-[600px] overflow-hidden flex items-center justify-center bg-cover bg-center">
        
        <div className="absolute w-screen h-full ">
          <Image src="/BgBanner.webp" alt="BgBanner" width={9000} height={9000} />
        </div>

        
        <div className="text-center text-white px-4 z-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            New Arrivals
          </h1>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-gray-100">
            Discover our latest collection
          </p>
          <Link href="/shop">
            <button className="bg-white text-gray-900 px-4 md:px-12 py-2 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Shop Now
            </button>
          </Link>
        </div>
      </section>
  )
}

export default HeroBanner