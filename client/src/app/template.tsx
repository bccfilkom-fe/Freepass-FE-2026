'use client'

import { usePathname } from 'next/navigation'
import React, { ReactNode, useEffect } from 'react'
import Lenis from "lenis";

const Template = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()

  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafId: number | null = null;

    lenis = new Lenis();
    lenis.start();
      
    function raf(time: number) {
      if (lenis) {
        lenis.raf(time * 0.5);
        rafId = requestAnimationFrame(raf);
      }
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (lenis) {
        lenis.destroy();
      }
    }
  }, [pathname]);

  return (
    <>
      {children}
    </>
  )
}

export default Template