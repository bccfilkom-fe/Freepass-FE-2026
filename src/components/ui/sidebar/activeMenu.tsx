"use client"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

function ActiveMenu({ children, href }: { children: ReactNode, href: string }) {
  const pathname = usePathname();
  return (
    <div className={`flex w-full items-center px-4 py-3 text-sm font-medium hover:text-white hover:[&_svg]:text-white transition-all duration-200 hover:bg-black/70 rounded-lg group cursor-pointer
      ${pathname === href? "bg-black text-white [&_svg]:text-white" : "bg-white text-black"}`}>
      {children}
    </div>
  )
}

export default ActiveMenu