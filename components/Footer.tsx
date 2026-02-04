import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const smokeRef = useRef<SVGGElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (smokeRef.current) {
        const puffs = smokeRef.current.children;
        gsap.to(puffs, {
          y: -50,
          x: "random(-10, 20)",
          scale: "random(1.5, 2.5)",
          opacity: 0,
          duration: "random(3, 5)",
          stagger: {
            each: 0.5,
            repeat: -1
          },
          ease: "sine.out"
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(titleRef.current,
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
      )
        .fromTo(subRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 0.8, duration: 1, ease: "power2.out" },
          "-=1"
        );

      gsap.to(titleRef.current, {
        textShadow: "0 0 30px rgba(255, 215, 0, 0.9), 0 0 60px rgba(255, 165, 0, 0.6), 0 0 90px rgba(255, 140, 0, 0.4)",
        color: "#FFF8E1",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(textContainerRef.current, {
        y: "-=15",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black flex flex-col justify-end">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(180deg, #0a1a0a 0%, #1a2e1a 30%, #000814 70%, #000000 100%)'
        }}
      >
        <div className="absolute inset-0 opacity-30" style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(255, 215, 0, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(255, 165, 0, 0.1) 0%, transparent 50%)'
        }}>
          <div className="w-full h-full" style={{
            animation: 'aurora 15s ease-in-out infinite alternate'
          }}></div>
        </div>
      </div>

      <style>{`
        @keyframes aurora {
          0% { opacity: 0.2; }
          50% { opacity: 0.4; }
          100% { opacity: 0.25; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes firefly {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>

      <div className="absolute inset-0 z-0 opacity-60"
        style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '70px 70px' }}>
      </div>

      <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none overflow-visible">
        {Array.from({ length: 15 }).map((_, i) => (
          <circle
            key={i}
            cx={`${Math.random() * 100}%`}
            cy={`${20 + Math.random() * 60}%`}
            r="2"
            fill="#FFD700"
            opacity="0"
            filter="blur(1px)"
          >
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur={`${3 + Math.random() * 3}s`}
              repeatCount="indefinite"
              begin={`${Math.random() * 3}s`}
            />
            <animate
              attributeName="cy"
              values={`${20 + Math.random() * 60}%;${10 + Math.random() * 50}%;${20 + Math.random() * 60}%`}
              dur={`${8 + Math.random() * 4}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="cx"
              values={`${Math.random() * 100}%;${Math.random() * 100}%;${Math.random() * 100}%`}
              dur={`${10 + Math.random() * 5}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      <div
        ref={textContainerRef}
        className="absolute top-1/4 left-0 w-full z-30 text-center px-4"
      >
        <h2
          ref={titleRef}
          className="text-6xl md:text-8xl font-serif font-bold text-[#FFD700] mb-4 tracking-wide opacity-0"
          style={{ fontFamily: '"Times New Roman", serif' }}
        >
          Thank You
        </h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mb-6 opacity-50"></div>
        <p
          ref={subRef}
          className="text-lg md:text-2xl font-light text-yellow-100/80 tracking-widest uppercase opacity-0"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          For wandering through our tales
        </p>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full h-auto min-h-[60vh] z-10 pointer-events-none"
        viewBox="0 0 1440 600"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="hillGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a2f1a" />
            <stop offset="100%" stopColor="#050a05" />
          </linearGradient>
          <linearGradient id="hillGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f1f0f" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
        </defs>

        <path fill="url(#hillGrad1)" d="M0,400 C300,350 600,200 900,350 C1200,500 1440,300 1440,400 V600 H0 Z" />

        <g transform="translate(800, 220) scale(1.5)">
          <path fill="#0d160d" d="M10,100 Q15,60 10,40 Q-20,10 -50,30 Q-60,5 -30,-20 Q-10,-40 20,-30 Q40,-60 70,-40 Q90,-20 80,10 Q110,20 100,50 Q80,80 60,90 Q50,130 40,150 L10,150 Z" />
          <path fill="#080c08" d="M25,90 Q30,130 10,180 L60,180 Q40,130 45,90 Z" />
        </g>

        <path fill="url(#hillGrad2)" d="M0,500 C400,450 800,550 1440,450 V600 H0 Z" />

        <g transform="translate(350, 520)">
          <g ref={smokeRef} transform="translate(10, -25)">
            <circle r="4" fill="rgba(255,255,255,0.25)" />
            <circle r="5" fill="rgba(255,255,255,0.22)" />
            <circle r="6" fill="rgba(255,255,255,0.18)" />
            <circle r="4" fill="rgba(255,255,255,0.2)" />
            <circle r="5" fill="rgba(255,255,255,0.15)" />
          </g>
          <circle cx="0" cy="0" r="15" fill="#3a2a1a" stroke="#5D4037" strokeWidth="2" />
          <circle cx="0" cy="0" r="12" fill="#2c1e16" />

          <g>
            <circle cx="25" cy="-5" r="8" fill="#FFD700" opacity="0.2" filter="blur(8px)">
              <animate attributeName="opacity" values="0.2;0.3;0.2" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="25" cy="-5" r="5" fill="#FFA500" opacity="0.9">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="25" cy="-5" r="3" fill="#FFF8E1" opacity="1" />
          </g>
          <rect x="-5" y="5" width="10" height="15" fill="#1f1f1f" rx="2" />
        </g>
      </svg>

      <div className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8) 100%)' }}>
      </div>
    </section>
  );
};

export default Footer;