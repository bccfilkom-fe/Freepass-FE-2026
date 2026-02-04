"use client"
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(useGSAP);

function PointerHandler() {
    const pathname = usePathname();
    useGSAP(() => {
        const ctx = gsap.context(() => {
            const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');

            elements.forEach(el => {
                el.addEventListener('mouseenter', () => gsap.to("#pointer", { scale: 5 }));
                el.addEventListener('mouseleave', () => gsap.to("#pointer", { scale: 1 }));
            });
        });

        return () => ctx.revert();
    }, [pathname])
    return null;
}

export default PointerHandler