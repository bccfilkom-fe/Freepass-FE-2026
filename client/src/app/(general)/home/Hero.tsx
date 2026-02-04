'use client'

import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subTitleRef = useRef<HTMLHeadingElement>(null)
  const paragraphRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!titleRef.current || !subTitleRef.current || !paragraphRef.current) return 

    const titleSplit = SplitText.create(titleRef.current, {
      type: "chars"
    })
    const subTitleSplit = SplitText.create(subTitleRef.current, {
      type: "words"
    })
    const paragraphSplit = SplitText.create(paragraphRef.current, {
      type: "lines"
    })

    const textTimeline = gsap.timeline()

    textTimeline
      .from(titleSplit.chars, {
        delay: 1.3,
        yPercent: 100,
        duration: 1,
        stagger: 0.05,
        ease: "expo.out"
      })
      .from(subTitleSplit.words, {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.05,
        ease: "expo.out"
      }, "-=0.5")
      .from(paragraphSplit.lines, {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.05,
        ease: "expo.out"
      }, "-=0.5")

    return () => {
      textTimeline.kill()
      titleSplit.revert()
      subTitleSplit.revert()
      paragraphSplit.revert()
    }
  }, [])

  return (
    <section id='hero' className='w-full flex flex-col max-w-[1620px] p-6 lg:p-12 pt-25 h-dvh relative mx-auto bg-primary  '>
      <header className='relative h-[60dvh] md:h-[80dvh] mb-5 sm:mb-10'>
        <video
          src="/hero_movie.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload='metadata'
          className="object-cover pointer-events-none w-[clamp(180px,25vw,400px)] aspect-2/3 absolute bottom-0 left-1/2 -translate-x-1/2">  
        </video>

        <h1 ref={titleRef} className='text-white text-[clamp(5rem,20vw,15rem)] whitespace-nowrap font-semibold tracking-tighter mix-blend-difference'>Toeankoe</h1>
        <h2 ref={subTitleRef} className='text-2xl md:text-5xl xl:text-6xl text-right'>Barbershop</h2>
      </header>
      <footer ref={paragraphRef} className='flex flex-col gap-2 sm:gap-4 mt-auto  '>
        <h3 className='font-michroma text-xl sm:text-2xl lg:text-5xl font-bold'>Your Style, Your Way</h3>
        <p className='w-full text-base sm:text-xl lg:text-2xl leading-5'>Experience effortless grooming with our all-in-one platform: shop, reserve, and personalize your visit.”</p>
      </footer>
    </section>
  )
}
