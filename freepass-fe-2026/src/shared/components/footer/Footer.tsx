"use client"

import Link from 'next/link'
import { Facebook, Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#215E61] to-[#18484b] text-white">
      <div className="px-4 lg:px-8 py-8 lg:py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <Image src="/logoShopPutih.png" alt="logoFoot" width={128} height={12} />
          <p className="text-sm md:text-base">
            © 2026 Zillshop. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="https://github.com/Djianyoy" className="hover:text-[#1b767a] transition-colors"><Github className="w-5 h-5" /></a>
            <a href="https://www.instagram.com/zildjianklfh/" className="hover:text-[#1b767a] transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="https://linkedin.com/in/zildjianalkhalifah" className="hover:text-[#1b767a] transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
