"use client"
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react'

function BtnBulat({ teks, btnBg, pointerBg, border, cl }: { teks: string, btnBg: string, pointerBg: string, border: string, cl: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const pointer = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const el = ref.current;
    const p = pointer.current;
    const w = el?.offsetWidth;
    let rw = 0;
    if (w) rw = w * 1.2;
    const ctx = gsap.context(() => {
      el?.addEventListener('mouseenter', () => gsap.to(pointer.current, { width: rw, height: rw, scale: 1 }));
      el?.addEventListener('mouseleave', () => gsap.to(pointer.current, { width: 40, height: 40, scale: 0 }));
    });

    gsap.set(p, {
      top: 0,
      left: 0,
      scale: 0
    });

    const handleMouseMove = (event: MouseEvent) => {
      const currrect = el?.getBoundingClientRect();
      const { clientX, clientY } = event;
      if (currrect) {
        gsap.to(p, {
          x: clientX - currrect.left,
          y: clientY - currrect.top,
          duration: 1,
          xPercent: -50,
          yPercent: -50,
        })
      }
    };

    el?.addEventListener("mousemove", handleMouseMove);

    return () => {
      el?.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  })
  return (
    <>
      <div ref={ref} id="btnTarget" className={`${btnBg} p-4 py-2 ${border} cursor-pointer relative ${cl} overflow-clip`}>{teks}
        <div ref={pointer} className={`absolute w-10 h-10 ${pointerBg} rounded-full -bottom-1/1 pointer-events-none z-10 mix-blend-exclusion`}>
        </div>
      </div>
    </>
  )
}

export default BtnBulat