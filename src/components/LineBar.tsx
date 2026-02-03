"use client"

import gsap from "gsap";
import { ReactNode, useRef } from "react"

function LineBar({children, pxHeight}:{children : ReactNode, pxHeight?: number}) {
  const target = useRef<HTMLDivElement>(null);
  const lineShow = () => {
    gsap.fromTo(target.current, {
      width: "0%",
    }, {
      width: "100%",
      duration: 0.5,
      ease: "power2.inOut"
    })
  }
  const lineHide = () => {
    gsap.to(target.current, {
      width: "0%",
      duration: 0.5,
      ease: "power2.inOut"
    })
  }
  return (
    <>
      <div className="w-fit h-fit" onMouseEnter={() => lineShow()} onMouseLeave={() => lineHide()}>
        {children}
        <div ref={target} className={`bg-black w-0`} style={pxHeight ? {height : `${pxHeight}px`} : {height : "1px"}}></div>
      </div>
    </>
  )
}

export default LineBar