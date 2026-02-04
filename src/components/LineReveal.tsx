"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger, SplitText } from "gsap/all"
import { ReactNode, useRef } from "react"

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

function LineReveal({text}:{text:ReactNode}) {
    const target = useRef<HTMLHeadingElement | HTMLParagraphElement | HTMLDivElement>(null);
    useGSAP(() => {
        const split = SplitText.create("h1, h2, h3, h4, p, div", {
            type: "lines chars",
            mask: "lines",
        })

        gsap.from(split.chars, {
            y: 100,
            stagger: 0.05,
            scrollTrigger: {
                trigger: split.lines,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        })
    }, {scope: target});
  return (
    <div ref={target} className="container">
        {text}
    </div>
  );
}

export default LineReveal