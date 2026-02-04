import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const SplitTextInner: React.FC<{ children: string; charClass?: string }> = ({ children, charClass }) => {
  return (
    <span className="inline-block relative z-10">
      {children.split('').map((char, index) => (
        <span
          key={index}
          className={`${charClass} inline-block whitespace-pre`}
          style={{ opacity: 0.1 }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

const TextReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const particlesRef = useRef<SVGGElement>(null);
  const rootRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const chars = textRef.current?.querySelectorAll('.char-reveal');

      if (!containerRef.current || !chars) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "center center",
          end: "+=2000",
          scrub: 1,
        }
      });

      tl.to(chars, {
        opacity: 1,
        color: "#FFA500",
        textShadow: "0 0 30px rgba(255, 165, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.4)",
        duration: 2.5,
        stagger: 0.08,
        ease: "power2.out"
      })
        .to(chars, {
          color: "#FFD700",
          textShadow: "0 0 40px rgba(255, 215, 0, 0.9), 0 0 80px rgba(255, 215, 0, 0.5)",
          duration: 1.5,
          ease: "sine.inOut"
        }, "-=0.5")
        .to(chars, {
          color: "#FFF8E1",
          textShadow: "0 4px 20px rgba(0,0,0,0.6), 0 0 15px rgba(255, 215, 0, 0.3)",
          duration: 1.5
        }, "+=1")
        .to({}, { duration: 2 })
        .to(textRef.current, {
          opacity: 0,
          y: -50,
          filter: "blur(10px)",
          duration: 2,
          ease: "power2.in"
        });

      if (particlesRef.current) {
        gsap.to(particlesRef.current.children, {
          y: "random(-100, 100)",
          x: "random(-50, 50)",
          opacity: "random(0.2, 0.8)",
          scale: "random(0.5, 1.5)",
          duration: "random(5, 10)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.1
        });
      }

      if (rootRef.current) {
        gsap.to(rootRef.current, {
          y: -50,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex justify-center items-center text-white overflow-hidden relative"
      style={{ background: '#1a120b' }}
    >
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      <svg className="absolute top-8 left-8 w-24 h-24 opacity-20 pointer-events-none" viewBox="0 0 100 100">
        <path d="M0,0 Q25,0 25,25 L25,50 Q25,25 50,25 L100,25" stroke="#FFD700" fill="none" strokeWidth="1" />
        <circle cx="50" cy="25" r="3" fill="#FFD700" />
      </svg>
      <svg className="absolute top-8 right-8 w-24 h-24 opacity-20 pointer-events-none" viewBox="0 0 100 100" style={{ transform: 'scaleX(-1)' }}>
        <path d="M0,0 Q25,0 25,25 L25,50 Q25,25 50,25 L100,25" stroke="#FFD700" fill="none" strokeWidth="1" />
        <circle cx="50" cy="25" r="3" fill="#FFD700" />
      </svg>

      <div className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #2c1e16 0%, #1a120b 60%, #000000 100%)',
        }}
      />

      <svg
        ref={rootRef}
        className="absolute top-0 left-0 w-full h-64 z-10 opacity-30 pointer-events-none"
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
      >
        <path fill="#0f0a06" d="M0,0 C100,50 200,150 300,50 C400,-50 500,100 600,20 C700,-60 800,80 900,10 C1000,-60 1100,120 1200,30 C1300,-60 1400,10 1440,0 V-50 H0 Z" />
        <path fill="#0f0a06" d="M100,0 C150,120 200,200 250,100 C280,40 220,0 100,0 Z" opacity="0.6" />
        <path fill="#0f0a06" d="M1200,0 C1150,150 1250,220 1350,120 C1400,60 1350,0 1200,0 Z" opacity="0.6" />
      </svg>

      <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-visible">
        <g ref={particlesRef} fill="#FFD700">
          {Array.from({ length: 20 }).map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * 100 + "%"}
              cy={Math.random() * 100 + "%"}
              r={Math.random() * 2 + 1}
              opacity="0"
              filter="blur(1px)"
            />
          ))}
        </g>
      </svg>

      <div className="relative z-20 w-4/5 md:w-3/5 text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-60"></div>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" stroke="#FFD700" strokeWidth="1" opacity="0.8" />
            <circle cx="12" cy="12" r="6" stroke="#FFD700" strokeWidth="0.5" opacity="0.4" />
          </svg>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent via-[#FFD700] to-transparent opacity-60"></div>
        </div>

        <p
          ref={textRef}
          className="text-4xl md:text-6xl font-serif font-light leading-snug will-change-[opacity,transform]"
          style={{
            fontFamily: '"Times New Roman", Times, serif',
            letterSpacing: '0.02em'
          }}
        >
          <SplitTextInner charClass="char-reveal">
            In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell...
          </SplitTextInner>
        </p>

        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-60"></div>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" stroke="#FFD700" strokeWidth="1" fill="none" opacity="0.6" />
          </svg>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent via-[#FFD700] to-transparent opacity-60"></div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-20 translate-y-1">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="tornPaperShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="-5" stdDeviation="5" floodColor="#000" floodOpacity="0.5" />
            </filter>
          </defs>

          <path
            fill="#150f09"
            filter="url(#tornPaperShadow)"
            d="M0,224 L48,234.7 C96,245,192,267,288,250.7 C384,235,480,181,576,186.7 C672,192,768,256,864,261.3 C960,267,1056,213,1152,197.3 C1248,181,1344,203,1392,213.3 L1440,224 V320 H0 Z"
          />

          <path
            fill="#0a0502"
            filter="url(#tornPaperShadow)"
            d="M0,288 L48,272 C96,256,192,224,288,218.7 C384,213,480,235,576,250.7 C672,267,768,277,864,266.7 C960,256,1056,224,1152,218.7 C1248,213,1344,235,1392,245.3 L1440,256 V320 H0 Z"
          />

          <path
            fill="#000000"
            d="M0,320 L1440,320 L1440,290 C1350,300 1250,310 1150,300 C950,280 850,310 750,315 C650,320 550,290 450,295 C350,300 250,310 150,315 C100,317 50,319 0,320 Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default TextReveal;