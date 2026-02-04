'use client'

import MainButton from "@/components/button/MainButton"
import { useRevealer } from "@/hooks/useRevealer"
import { useTransitionRouterWithProgress } from "@/hooks/useTransitionRouterWithProgress"
import Image from "next/image"

const ShopPage = () => {
  useRevealer()
  const router = useTransitionRouterWithProgress()

  return (
    <>
      <div className="revealer"></div>
      <section className='w-full h-screen flex flex-col items-center justify-center'>
        <header className="flex flex-col justify-center items-center">
          <div className="h-72 lg:h-96 aspect-square relative">
            <Image src="/coming_soon.webp" className="object-contain" sizes="200" fill alt="Forgot password image"/>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-wrap mb-3 text-center">Coming Soon</h1>
          <h2 className="text-center opacity-50">Oops! This Page Is Still Cooking</h2>
        </header>

        <main className="w-full max-w-3xl p-5 flex flex-col gap-5 items-center text-center">
          <p>We’re busy putting the finishing touches on this page. <br />
            Give us a little time and come back soon for something awesome.</p>
          <MainButton onClick={() => router.replace("/home")}>
            Back to Home
          </MainButton>
        </main>
      </section>
    </>
  )
}

export default ShopPage