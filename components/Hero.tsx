import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const sunRef = useRef<SVGGElement>(null);
  const raysRef = useRef<SVGGElement>(null);
  const cloudsRef = useRef<SVGGElement>(null);
  const birdsRef = useRef<SVGGElement>(null);
  const layer1Ref = useRef<SVGGElement>(null);
  const layer2Ref = useRef<SVGGElement>(null);
  const layer3Ref = useRef<SVGGElement>(null);
  const frameRef = useRef<SVGSVGElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const startIdleMushroom = (target: Element) => {
    gsap.to(target, {
      rotation: "random(-3, 3)",
      duration: "random(2, 4)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "bottom center",
      overwrite: 'auto'
    });
  };

  const startIdleLantern = (target: Element) => {
    gsap.to(target, {
      rotation: "random(-3, 3)",
      duration: "random(2.5, 4)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "top center",
      overwrite: 'auto'
    });
  };

  const handleMushroomEnter = (e: React.MouseEvent<SVGGElement>) => {
    const target = e.currentTarget;
    const baseScale = parseFloat(target.dataset.baseScale || "1");

    gsap.to(target, {
      scale: baseScale * 1.4,
      rotation: 0,
      duration: 0.4,
      ease: "back.out(3)",
      overwrite: 'auto'
    });
    gsap.to(target.querySelectorAll(".glow-cap"), {
      filter: "url(#glow)",
      fill: "#FF4081",
      duration: 0.3
    });
    gsap.to(target, {
      y: -10,
      duration: 0.3,
      ease: "power2.out",
      overwrite: false
    });
  };

  const handleMushroomLeave = (e: React.MouseEvent<SVGGElement>) => {
    const target = e.currentTarget;
    const baseScale = parseFloat(target.dataset.baseScale || "1");

    gsap.to(target, {
      scale: baseScale,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      overwrite: 'auto',
      onComplete: () => startIdleMushroom(target)
    });
    gsap.to(target.querySelectorAll(".glow-cap"), {
      filter: "none",
      fill: "#D81B60",
      duration: 0.3
    });
  };

  const handleLanternEnter = (e: React.MouseEvent<SVGGElement>) => {
    const target = e.currentTarget;
    gsap.to(target, {
      rotation: 15,
      transformOrigin: "top center",
      duration: 0.3,
      yoyo: true,
      repeat: 5,
      ease: "sine.inOut",
      overwrite: 'auto'
    });
    gsap.to(target.querySelector(".light"), {
      opacity: 1,
      fill: "#FFFF00",
      filter: "url(#glow)",
      duration: 0.3
    });
  };

  const handleLanternLeave = (e: React.MouseEvent<SVGGElement>) => {
    const target = e.currentTarget;
    gsap.to(target, {
      rotation: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)",
      overwrite: 'auto',
      onComplete: () => startIdleLantern(target)
    });
    gsap.to(target.querySelector(".light"), {
      opacity: 0.6,
      fill: "#FFC107",
      filter: "none",
      duration: 0.3
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      gsap.set(titleRef.current, { y: 100, autoAlpha: 0, scale: 0.8, filter: "blur(20px)" });

      const mushrooms = containerRef.current.querySelectorAll('.mushroom-group');
      mushrooms.forEach(m => startIdleMushroom(m));

      const lanterns = containerRef.current.querySelectorAll('.lantern-group');
      lanterns.forEach(l => startIdleLantern(l));

      gsap.to(raysRef.current, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center"
      });

      if (birdsRef.current) {
        gsap.fromTo(birdsRef.current,
          { x: -200 },
          {
            x: 2000,
            duration: 20,
            repeat: -1,
            ease: "linear",
            delay: 1
          }
        );
        gsap.to(birdsRef.current, {
          y: "+=20",
          yoyo: true,
          repeat: -1,
          duration: 2,
          ease: "sine.inOut"
        });
      }

      if (cloudsRef.current) {
        gsap.to(cloudsRef.current.children, {
          x: "+=100",
          yoyo: true,
          repeat: -1,
          duration: 10,
          ease: "sine.inOut",
          stagger: 2
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 1,
        }
      });

      tl.to(frameRef.current, {
        scale: 30,
        rotation: 0,
        ease: "power2.inOut",
        duration: 3
      }, 0);

      tl.to(layer3Ref.current, { scale: 2.8, y: 200, transformOrigin: "50% 100%" }, 0);
      tl.to(layer2Ref.current, { scale: 1.6, y: 80, transformOrigin: "50% 100%" }, 0);
      tl.to(layer1Ref.current, { scale: 1.2, y: 20, transformOrigin: "50% 100%" }, 0);

      tl.to(sunRef.current, { y: -80 }, 0);

      tl.to(titleRef.current, {
        autoAlpha: 1,
        scale: 1,
        filter: "blur(0px)",
        y: 0,
        ease: "expo.out",
        duration: 1.5
      }, 0.8);

      tl.to(overlayRef.current, { opacity: 1 }, 2);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full relative overflow-hidden bg-[#87CEEB]">

      <svg
        className="absolute inset-0 w-full h-full z-0"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4facfe" />
            <stop offset="50%" stopColor="#00f2fe" />
            <stop offset="100%" stopColor="#e0f7fa" />
          </linearGradient>

          <radialGradient id="sunGrad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#FFF9C4" />
            <stop offset="40%" stopColor="#FFD54F" />
            <stop offset="100%" stopColor="rgba(255, 213, 79, 0)" />
          </radialGradient>

          <linearGradient id="hill1Grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#66bb6a" />
            <stop offset="100%" stopColor="#2E7D32" />
          </linearGradient>

          <linearGradient id="hill2Grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9ccc65" />
            <stop offset="100%" stopColor="#558B2F" />
          </linearGradient>

          <linearGradient id="hill3Grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dcedc8" />
            <stop offset="100%" stopColor="#7CB342" />
          </linearGradient>

          <filter id="shadowDepth" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
            <feOffset dx="0" dy="8" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.4" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="offsetblur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="sunGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="15" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="1920" height="1080" fill="url(#skyGrad)" />

        <g ref={sunRef} transform="translate(960, 450)">
          <g ref={raysRef} opacity="0.6">
            {Array.from({ length: 16 }).map((_, i) => (
              <path
                key={i}
                d="M0,0 L-40,-900 L40,-900 Z"
                fill="white"
                transform={`rotate(${i * 22.5})`}
              />
            ))}
          </g>
          <circle r="140" fill="url(#sunGrad)" filter="url(#sunGlow)">
            <animate attributeName="r" values="140;145;140" dur="4s" repeatCount="indefinite" />
          </circle>
        </g>

        <g ref={cloudsRef} opacity="0.8">
          <path fill="#ffffff" d="M100,200 Q150,150 200,200 T300,200 T400,200 V250 H100 Z" filter="blur(10px)" opacity="0.6" />
          <path fill="#ffffff" d="M1600,150 Q1650,100 1700,150 T1800,150 V200 H1600 Z" filter="blur(15px)" opacity="0.5" />
          <path fill="#ffffff" d="M800,100 Q850,50 900,100 T1000,100 T1100,100 V150 H800 Z" filter="blur(20px)" opacity="0.4" />
        </g>

        <g ref={layer1Ref} filter="url(#shadowDepth)">
          <path
            d="M-100,1080 L-100,600 Q400,400 960,550 Q1500,750 2020,450 L2020,1080 Z"
            fill="#546E7A"
            opacity="0.9"
          />
        </g>

        <g ref={birdsRef} transform="translate(0, 300)">
          <path d="M0,0 Q10,-10 20,0" fill="none" stroke="#263238" strokeWidth="3" />
          <path d="M20,0 Q30,-10 40,0" fill="none" stroke="#263238" strokeWidth="3" />

          <g transform="translate(50, -30) scale(0.8)">
            <path d="M0,0 Q10,-10 20,0" fill="none" stroke="#263238" strokeWidth="3" />
            <path d="M20,0 Q30,-10 40,0" fill="none" stroke="#263238" strokeWidth="3" />
          </g>
          <g transform="translate(-40, 20) scale(0.6)">
            <path d="M0,0 Q10,-10 20,0" fill="none" stroke="#263238" strokeWidth="3" />
            <path d="M20,0 Q30,-10 40,0" fill="none" stroke="#263238" strokeWidth="3" />
          </g>
        </g>

        <g ref={layer2Ref} filter="url(#shadowDepth)">
          <path
            d="M-200,1080 L-200,700 Q300,550 800,750 T1800,650 L2120,800 L2120,1080 Z"
            fill="url(#hill1Grad)"
          />
          <g opacity="0.9">
            <circle cx="200" cy="700" r="25" fill="#1B5E20" />
            <circle cx="230" cy="720" r="30" fill="#2E7D32" />
            <circle cx="1600" cy="700" r="35" fill="#33691E" />
            <circle cx="1650" cy="730" r="45" fill="#558B2F" />
            <circle cx="220" cy="710" r="3" fill="#FFEB3B" />
            <circle cx="1630" cy="710" r="3" fill="#E91E63" />
          </g>

          <g className="lantern-group cursor-pointer" transform="translate(1650, 775)" onMouseEnter={handleLanternEnter} onMouseLeave={handleLanternLeave}>
            <line x1="0" y1="-45" x2="0" y2="0" stroke="#3E2723" strokeWidth="2" />
            <g>
              <path d="M-12,0 L12,0 L18,15 L12,30 L-12,30 L-18,15 Z" fill="#4E342E" />
              <rect className="light" x="-8" y="5" width="16" height="20" fill="#FFC107" opacity="0.6" />
              <circle cx="0" cy="-5" r="4" fill="none" stroke="#3E2723" strokeWidth="2" />
            </g>
          </g>
        </g>

        <g ref={layer3Ref} filter="url(#shadowDepth)">
          <path
            d="M-200,1080 L-200,900 Q600,750 1200,950 T2200,850 L2200,1080 Z"
            fill="url(#hill2Grad)"
          />

          <g transform="translate(1400, 950)">
            <circle r="70" fill="#3E2723" stroke="#5D4037" strokeWidth="6" />
            <circle r="60" fill="#43A047" />
            <circle cx="0" cy="0" r="40" fill="none" stroke="#2E7D32" strokeWidth="3" opacity="0.6" />
            <circle cx="20" cy="0" r="8" fill="#FFD700" />
          </g>

          <g transform="translate(400, 920)">
            <g data-base-scale="1" className="mushroom-group cursor-pointer origin-bottom" onMouseEnter={handleMushroomEnter} onMouseLeave={handleMushroomLeave}>
              <rect x="-6" y="0" width="12" height="20" fill="#FCE4EC" />
              <path className="glow-cap" d="M-20,0 Q0,-35 20,0 Z" fill="#D81B60" />
              <circle className="glow-cap" cx="-8" cy="-10" r="3" fill="white" opacity="0.8" />
              <circle className="glow-cap" cx="10" cy="-15" r="2" fill="white" opacity="0.8" />
            </g>
            <g data-base-scale="0.8" className="mushroom-group cursor-pointer origin-bottom" transform="translate(30, 10) scale(0.8)" onMouseEnter={handleMushroomEnter} onMouseLeave={handleMushroomLeave}>
              <rect x="-6" y="0" width="12" height="20" fill="#FCE4EC" />
              <path className="glow-cap" d="M-20,0 Q0,-35 20,0 Z" fill="#D81B60" />
              <circle className="glow-cap" cx="5" cy="-8" r="4" fill="white" opacity="0.8" />
            </g>
            <g data-base-scale="0.6" className="mushroom-group cursor-pointer origin-bottom" transform="translate(-25, 15) scale(0.6)" onMouseEnter={handleMushroomEnter} onMouseLeave={handleMushroomLeave}>
              <rect x="-6" y="0" width="12" height="20" fill="#FCE4EC" />
              <path className="glow-cap" d="M-20,0 Q0,-35 20,0 Z" fill="#D81B60" />
            </g>
          </g>

          <g fill="white" className="pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <circle
                key={i}
                cx={300 + Math.random() * 1400}
                cy={900 + Math.random() * 150}
                r={Math.random() * 4 + 2}
                fill={['#FFEB3B', '#FFFFFF', '#FFCDD2', '#E1BEE7'][Math.floor(Math.random() * 4)]}
              />
            ))}
          </g>
        </g>

        <g opacity="0.5" className="pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <circle
              key={`p-${i}`}
              cx={Math.random() * 1920}
              cy={Math.random() * 1080}
              r={Math.random() * 3}
              fill="white"
              filter="blur(1px)"
            >
              <animate
                attributeName="cy"
                values={`${Math.random() * 1080};${Math.random() * 1080 + 100}`}
                dur={`${5 + Math.random() * 5}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0.8;0"
                dur={`${3 + Math.random() * 3}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      </svg>

      <div
        className="absolute inset-0 z-[35] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.3) 100%)'
        }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[50] w-full text-center pointer-events-none">
        <h1
          ref={titleRef}
          className="font-roboto font-bold whitespace-nowrap opacity-0 select-none inline-block px-4"
          style={{
            fontSize: 'clamp(3rem, 10vw, 9rem)',
            background: 'linear-gradient(to bottom, #FFECB3 0%, #FFD700 30%, #FFA000 70%, #FF6F00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.6))',
            lineHeight: 1.1
          }}
        >
          Free Pass BCC
        </h1>
      </div>

      <svg
        ref={frameRef}
        className="absolute inset-0 w-full h-full z-40 pointer-events-none origin-center"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <mask id="holeMask">
            <rect x="0" y="0" width="100" height="100" fill="white" />
            <circle cx="50" cy="50" r="12" fill="black" />
          </mask>
          <filter id="woodGrain">
            <feTurbulence type="fractalNoise" baseFrequency="1.5 0.1" numOctaves="3" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="monoNoise" />
            <feBlend in="SourceGraphic" in2="monoNoise" mode="multiply" />
          </filter>
        </defs>

        <g mask="url(#holeMask)">
          <rect x="-50" y="-50" width="200" height="200" fill="#3E2723" filter="url(#woodGrain)" />
          <radialGradient id="vignette" cx="50%" cy="50%" r="50%">
            <stop offset="30%" stopColor="transparent" />
            <stop offset="100%" stopColor="black" stopOpacity="0.8" />
          </radialGradient>
          <rect x="-50" y="-50" width="200" height="200" fill="url(#vignette)" />
        </g>

        <circle cx="50" cy="50" r="12.2" fill="none" stroke="#251612" strokeWidth="0.8" />
      </svg>

      <div
        ref={overlayRef}
        className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black via-black/90 to-transparent z-[60] opacity-0"
      />
    </div>
  );
};

export default Hero;