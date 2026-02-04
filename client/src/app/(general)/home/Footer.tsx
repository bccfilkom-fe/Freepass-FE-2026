import { useGSAP } from "@gsap/react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import ScrollTrigger from "gsap/src/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const shortcutSections = [
  "Home",
  "Services",
]

export default function Footer() {
  useGSAP(() => {
    gsap.from("#big_title", {
      scrollTrigger: {
        trigger: "#footer",
        start: "top bottom",
        end: "bottom 80%",
        scrub: true
      },
      yPercent: -100,
      autoAlpha: 0
    })

  }, [])

  return (
    <section id="footer" className='relative z-1 mx-auto w-[98vw] mb-[1vw] rounded-b-2xl h-fit bg-secondary-foreground overflow-hidden text-secondary'>
      <div className='w-full h-fit grid grid-cols-1 lg:grid-cols-[2fr_1fr]'>
        {/* logo and contact */}
        <div className='w-full p-[clamp(2rem,4vw,4vw)] flex flex-col gap-10'>
          <div className='flex gap-2 sm:gap-5 items-center'>
            <div className="relative w-[100px] aspect-square bg-white rounded-md">
              <Image className='rounded-full object-cover' fill src="/logo.svg" alt="logo_image" />
            </div>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold'>Toeankoe Barbershop</h2>
          </div>

          <div className='flex gap-10 flex-col sm:flex-row'>
            {/* no telp */}
            <div className='flex flex-col gap-1'>
              <h3 className='text-md sm:text-xl font-bold uppercase'>Our Contact</h3>
              <Link href={"https://wa.me/6288803452744"} target="_blank">
                <span className='flex gap-3 items-center link hover:opacity-50 active:scale-95 duration-75 transition-all ease-in-out origin-left'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="var(--secondary)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.6 14.522c-2.395 2.52-8.504-3.534-6.1-6.064c1.468-1.545-.19-3.31-1.108-4.609c-1.723-2.435-5.504.927-5.39 3.066c.363 6.746 7.66 14.74 14.726 14.042c2.21-.218 4.75-4.21 2.215-5.669c-1.268-.73-3.009-2.17-4.343-.767"/></svg>
                  <p className='text-lg'>+62 888 0345 2744</p>
                </span>
              </Link>
            </div>

            {/* social media */}
            <div className='flex flex-col gap-1'>
              <h3 className='text-md sm:text-xl font-bold uppercase'>Social Media</h3>
              <Link href={"https://www.instagram.com/toeankoe_barbershop/"} target="_blank">
                <span className='flex gap-3 items-center link hover:opacity-50 active:scale-95 duration-75 transition-all ease-in-out origin-left'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="var(--secondary)" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"/></svg>
                  <p className='text-lg'>@toeankoe_barbershop</p>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* shortcut */}
        <ul className='flex flex-col justify-center p-[clamp(2rem,4vw,4vw)]'>
          {shortcutSections.map((section, index) => (
            <li className='link shortcut uppercase overflow-hidden text-2xl md:text-4xl' key={index}>
              {section.split("").map((char, index) => {
                return (
                  <span
                    style={{
                      transitionDelay: `${index * 0.02}s`
                    }}
                    key={index}>
                      {char}
                  </span>
                )
              })}
            </li>
          ))}
        </ul>
      </div>

      {/* big title */}
      <div className="w-full h-fit overflow-hidden">
        <h1 id="big_title" className='text-[12vw] text-center font-extrabold leading-[17vw] mask-b-from-50% font-michroma'>TOEANKOE</h1>
      </div>
    </section>
  )
}