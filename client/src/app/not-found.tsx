'use client'

import MainButton from "@/components/button/MainButton"
import { useRouter } from "@bprogress/next"
import Image from "next/image"

export default function NotFoundPage() {
  const router = useRouter()

  return (
    <section className='w-full h-screen flex flex-col items-center justify-center'>
      <header className="flex flex-col justify-center items-center">
        <div className="h-72 lg:h-96 aspect-square relative">
          <Image src="/something_wrong.webp" className="object-contain" sizes="200" fill alt="Forgot password image"/>
        </div>
        <h1 className="text-7xl lg:text-9xl font-extrabold">404</h1>
        <h2>Page not found</h2>
      </header>

      <main className="w-full max-w-3xl p-5 flex flex-col gap-5 items-center text-center">
        <p>Sorry, we couldn&apos;t find this page. But don&apos;t worry, you can find another page or back to home</p>
        <MainButton onClick={() => router.replace("/home", { showProgress: true })}>
          Back to Home
        </MainButton>
      </main>
    </section>
  )
}
