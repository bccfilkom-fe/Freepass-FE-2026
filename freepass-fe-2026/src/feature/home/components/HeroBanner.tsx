import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const HeroBanner = () => {
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        
        <div className="absolute w-full h-full ">
          <Image src="/BgBanner.webp" alt="BgBanner" width={1400} height={1400} />
        </div>

        
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 ">
              New arrivals
            </h1>
            <Link href="/shop">
              <button className="mt-4 px-8 py-4 border-2 border-white text-white font-medium rounded hover:bg-white hover:text-gray-900 transition-all duration-300 text-base sm:text-lg">
                Shop now
              </button>
            </Link>
          </div>
        </div>
      </section>
  )
}

export default HeroBanner