'use client'

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SimpleNavbar({ title }: { title: string }) {
  const router = useRouter()

  return (
    <nav className="w-full flex justify-start items-center px-5 py-3 border-y gap-4 bg-white">
      <div
        className="p-2 border aspect-square rounded-md cursor-pointer hover:bg-secondary/10 transition" 
        onClick={() => router.back()}>
          <ChevronLeft />
      </div>
      <h1 className="text-xl font-light">{title}</h1>
    </nav>
  )
}