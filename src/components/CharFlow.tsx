"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger, SplitText } from "gsap/all"
import { ReactNode, useLayoutEffect, useRef } from "react"

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

function CharFlow({ children }: { children: ReactNode }) {
    const target = useRef<HTMLHeadingElement | HTMLParagraphElement | HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const split = new SplitText("h1, h2, h3, h4, h5, h6, p",
                {
                    type: "lines chars",
                });

            tl.current = gsap.timeline({ paused: true })
                .to(split.chars, {
                    yPercent: -100,
                    ease: "power4.inOut",
                    stagger: {
                        each: 0.05,
                        from: "start",
                        grid: [2, split.lines[0].children.length]
                    }
                });
        }, target);

        return () => ctx.revert();
    }, []);

    const animateChar = () => { tl.current?.play() }
    const backChar = () => { tl.current?.reverse() }

    return (
        <div ref={target} className=" relative container overflow-clip w-fit" onMouseOver={animateChar} onMouseLeave={backChar}>
            {children}
            <div className="absolute">
                {children}
            </div>
        </div>
    );
}

export default CharFlow