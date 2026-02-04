'use client'

import Navbar from "@/components/navbar/Navbar";
import { useRevealer } from "@/hooks/useRevealer";
import { ReactNode } from "react";

export default function BarberLayout({ children }: { children: ReactNode }) {
  useRevealer()

  return (
    <>
      <div className="revealer"></div>
      <section className="w-full min-h-screen relative">
        <Navbar />
        { children }
      </section>
    </>
  )
}