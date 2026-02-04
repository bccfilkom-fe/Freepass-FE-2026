"use client"
import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { CSSRulePlugin, ScrollTrigger, SplitText } from "gsap/all"
import { ReactNode, useRef, useState } from "react"

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

function BlockReveal({ twBlockColor, children }: { twBlockColor: string, children: ReactNode }) {
    const [jumlah, setJumlah] = useState<number>(0);
    const target = useRef<HTMLDivElement>(null);
    useGSAP(() => {
        const ctx = gsap.context(() => {
            const split = SplitText.create("h1, h2, h3, h4, h5, h6, p", {
                type: "lines",
                mask: "lines",
                linesClass: "blockReveal",
                autoSplit: true
            })

            gsap.fromTo(split.lines, {
                "--width": "100%",
                "--color": `var(${twBlockColor})`,
            }, {
                "--width": "0%",
                "--color": `var(${twBlockColor})`,
                ease: "power3.inOut",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: split.lines,
                    start: "top 80%",
                    markers: true,
                    toggleActions: "play none none reverse"
            }
            })
        }, target)
    })
    return (
        <>
            <div ref={target} className="">
                {children}
            </div>
        </>
    )
}

export default BlockReveal