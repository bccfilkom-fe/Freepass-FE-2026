"use client"
import gsap from 'gsap';
import { useEffect } from 'react'

function Pointer2() {
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const { pageX, pageY } = event;
            gsap.to("#pointer", {
                x: pageX - 40 / 2,
                y: pageY - 40 / 2,
            })
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);
    return (
        <>
            <div id="pointer" className={`absolute top-0 left-0 w-10 h-10 bg-slate-300 rounded-full pointer-events-none z-10 mix-blend-exclusion`}>
            </div>
        </>
    )
}

export default Pointer2