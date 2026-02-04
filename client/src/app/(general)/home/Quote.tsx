import gsap from "gsap"
import SplitText from "gsap/src/SplitText"
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/src/ScrollTrigger"
import { useRef } from "react"

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Quote() {
  const fadeTextRef = useRef<HTMLParagraphElement>(null)
  const quoteSectionRef = useRef<HTMLDivElement>(null)
  
  useGSAP(() => {
    gsap.set(quoteSectionRef.current, {
      clipPath: "circle(150% at 50% 50%)",
    })

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#quote",
        start: "top top",
        end: "bottom bottom",
        toggleActions: "play reverse play reverse",
        scrub: true
      }
    })

    const fadeText = SplitText.create(fadeTextRef.current, {
      type: "chars",
    })

    timeline.from(fadeText.chars, {
      opacity: 0.1,
      duration: 4,
      stagger: 0.5
    }).to(quoteSectionRef.current, {
      duration: 80,
      clipPath: "circle(0% at 50% 90%)",
      ease: "sine.out"
    })

    return () => {
      timeline.kill()
      fadeText.revert()
    }
  }, [])

  return (
    <section id='quote' className='relative z-3 w-full h-fit p-[5vw]'>
      <div ref={quoteSectionRef} className="quote-section-wrapper className='relative z-2 w-full h-[300vh] p-[5vw]">

        {/* background quote */}
        <div className='absolute z-0 top-0 left-0 w-full h-full bg-[url(/bg_quote.webp)] bg-fixed bg-center bg-cover brightness-30'></div>

        <p ref={fadeTextRef} className='sticky top-[50vh] -translate-y-1/2 fade-text uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white text-right w-full max-w-5xl mx-auto'>
          <svg className="block" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M2.5 5H11v7.65L6.518 19H3.795l2.666-6H2.5zM13 5h8.5v7.65L17.018 19h-2.723l2.666-6H13z"/></svg>
          A good barber <br /> understand that <br /> most of the work <br /> happens before <br /> the first cut.
        </p>
      </div>
    </section>
  )
}