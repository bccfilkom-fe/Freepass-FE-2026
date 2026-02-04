"use client"
import Link from "next/link"
import CharFlow from "../components/CharFlow"
import BtnArrow from "../components/BtnArrow"
import BtnBulat from "../components/BtnBulat"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger, SplitText } from "gsap/all"
import BlockReveal from "../components/BlockReveal"

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

function LandingPage() {
  const target = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const split = SplitText.create("h3, p", {
      type: "lines",
      mask: "lines"
    })
    gsap.fromTo(target.current,
      {
        clipPath: "inset(10% 10% 80% 10%)"
      }, {
      clipPath: "inset(0% 0% 0% 0%)",
      scrollTrigger: {
        trigger: target.current,
        scrub: true,
        markers: true,
        start: "top 50%",
        end: "top 5%"
      }
    })

    gsap.fromTo(split.lines, {
      yPercent: 100
    }, {
      yPercent: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: split.lines,
        markers: true,
        start: "top 90%",
        toggleActions: "restart none none reverse"
      }
    })
  }, { scope: target })
  return (
    <>
      <header className="fixed top-0 right-0 w-full h-fit bg-white/80 backdrop-blur-xs p-4 px-6 flex items-center justify-between z-10">
        <CharFlow>
          <p className='text-3xl leading-1 font-bold my-3'>nexStore</p>
        </CharFlow>
        <Link href={"/login"}>
          <BtnBulat teks="Login" btnBg="bg-slate-900" pointerBg="bg-slate-100" border="" cl="text-white rounded-2xl px-8">
          </BtnBulat>
        </Link>
      </header>
      <section className="mt-18 bg-amber-200 relative h-[70dvh] justify-center p-10 flex flex-col gap-10">
        <p className="text-5xl font-black">Welcome to nexStore</p>
        <p>Kelola inventori Anda dengan mudah dan efisien. Pantau stok, lacak pergerakan barang, dan tingkatkan produktivitas bisnis Anda.</p>
        <Link href={"/product"}>
          <BtnArrow bgArr="bg-black" colorArr="white">
            <p className="w-fit px-4 py-2 text-xl font-bold">
              Mulai Kelola Produk
            </p>
          </BtnArrow>
        </Link>
      </section>
      <section className="bg-amber-100 bg-linear-to-b from-amber-200 to-blue-50 p-6 flex flex-col flex-wrap md:flex-row gap-5 items-center
      [&>div]:sticky [&>div]:md:top-[20%] [&>div]:border [&>div]:border-gray-100
      ">

        <div className="flex flex-col gap-5 shadow-sm bg-white w-90 p-8 rounded-2xl top-[20%]">
          <div className="bg-blue-600/20 w-fit h-fit p-2 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
          </div>
          <h3 className="text-xl font-bold">Kelola Produk</h3>
          <p>Kelola semua produk Anda dalam satu tempat dengan mudah dan terorganisir.</p>
        </div>

        <div className="flex flex-col gap-5 shadow-sm bg-white w-90 p-8 rounded-2xl top-[25%]">
          <div className="bg-green-700/20 w-fit h-fit p-2 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
          </div>

          <h3 className="text-xl font-bold">Tracking Inventory</h3>
          <p>Lacak pergerakan stok barang masuk dan keluar secara real-time.</p>
        </div>

        <div className="flex flex-col gap-5 shadow-sm bg-white w-90 p-8 rounded-2xl top-[30%]">
          <div className="bg-purple-900/20 w-fit h-fit p-2 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
            </svg>
          </div>
          <h3 className="text-xl font-bold">Kelola Kategori</h3>
          <p>Kelompokkan produk Anda ke dalam kategori untuk kemudahan manajemen.</p>
        </div>

        <div className="flex flex-col gap-5 shadow-sm bg-white w-90 p-8 rounded-2xl top-[35%]">
          <div className="bg-yellow-500/30 w-fit h-fit p-2 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold">Aman</h3>
          <p>Data Anda aman dengan sistem keamanan kami yang terjamin.</p>
        </div>
      </section>
      <section className="bg-blue-50 min-h-screen pt-30 flex flex-col justify-center">
        <h3 className="text-4xl text-center font-bold mx-auto sticky top-[30%]">
          Kelola Inventory Anda dengan Mudah
        </h3>
        <div ref={target} className="bg-black relative w-vw h-dvh mt-20 [clip-path:inset(10%_10%_80%_10%)] bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover">
          <div className="absolute bottom-[40%] flex flex-col  gap-5 left-[5%] **:">
            <h3 className="text-6xl font-bold bg-amber-400 p-2 px-5">
              nexStore
            </h3>
            <p className="bg-amber-400 p-2 w-fit">inventory management web</p>
          </div>
        </div>
      </section>
      {/* <div className="h-screen"></div> */}
    </>
  )
}

export default LandingPage