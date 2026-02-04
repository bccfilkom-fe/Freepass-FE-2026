'use client'

import { useRevealer } from "@/hooks/useRevealer"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  useRevealer()

  return (
    <>
      <div className="revealer"></div>
      <section className='w-full h-screen bg-backround'>
        { children }
      </section>
    </>
  )
}
