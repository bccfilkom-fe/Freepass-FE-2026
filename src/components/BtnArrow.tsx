"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

function BtnArrow({ bgArr, colorArr, children }: { bgArr: string, colorArr: string, children: React.ReactNode }) {
  const [w, setW] = useState<number>(0);
  const el = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);

  const handleHover = () => {
    const tl = gsap.timeline();
    tl.fromTo(right.current, {
      width: 0,
      height: 0,
      transformOrigin: "bottom left"
    }, {
      width: w,
      height: w,
    }).fromTo(left.current, {
      width: w,
      height: w,
    }, {
      width: 0,
      height: 0,
      transformOrigin: "bottom right"
    }, '<')
  }

  const handleUnhover = () => {
    const tl = gsap.timeline();
    tl.fromTo(right.current, {
      width: w,
      height: w,
      ease: "power4.inOut"
    }, {
      width: 0,
      height: 0,
      transformOrigin: "bottom left",
      ease: "power4.inOut"
    }).fromTo(left.current, {
      width: 0,
      height: 0,
      transformOrigin: "bottom right",
      ease: "power4.inOut"
    }, {
      width: w,
      height: w,
      ease: "power4.inOut"
    }, '<')
  }

  useGSAP(() => {
    if (el.current) {
      setW(el.current.offsetHeight);
    }
  }, []);
  return (
    <>
      <div ref={el} className="flex items-end w-fit" onMouseEnter={handleHover} onMouseLeave={handleUnhover}>
        <div ref={left} className={`flex ${bgArr} aspect-square items-center justify-center rounded-full`}
          style={{ width: `${w}px`, height: `${w}px` }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={colorArr} style={{ width: `${w / 2}px`, height: `${w / 2}px` }} className="animate-pulse">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </div>
        {children}
        <div ref={right} className={`${bgArr} aspect-square flex items-center justify-center w-0 rounded-full`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={colorArr} style={{ width: `${w / 2}px`, height: `${w / 2}px` }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </>
  )
}

export default BtnArrow