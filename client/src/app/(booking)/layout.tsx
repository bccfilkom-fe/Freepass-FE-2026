'use client'

import { useRevealer } from "@/hooks/useRevealer"
import { ReactNode } from "react"

export default function BookingLayout({ children }: { children: ReactNode }) {
  useRevealer()

  return (
    <>
      <div className="revealer"></div>
      {children}
    </>
  )
}
