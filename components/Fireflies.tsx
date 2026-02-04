import React, { useEffect, useRef } from 'react';

interface Firefly {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
  opacitySpeed: number;
  pulseAngle: number;
  pulseSpeed: number;
  history: { x: number; y: number }[];
}

const Fireflies: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-night-forest-with-insects-2414.mp3");
    audio.loop = true;
    audio.volume = 0.2;
    audioRef.current = audio;

    const attemptPlay = async () => {
      try {
        await audio.play();
      } catch (error) {
        const handleInteraction = () => {
          audio.play().catch(() => { });
          ['click', 'touchstart', 'keydown'].forEach(event =>
            document.removeEventListener(event, handleInteraction)
          );
        };

        ['click', 'touchstart', 'keydown'].forEach(event =>
          document.addEventListener(event, handleInteraction)
        );
      }
    };

    attemptPlay();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let fireflies: Firefly[] = [];
    const particleCount = 60;
    const trailLength = 10;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createFirefly = (): Firefly => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random(),
      opacitySpeed: (Math.random() - 0.5) * 0.02,
      pulseAngle: Math.random() * Math.PI * 2,
      pulseSpeed: 0.05 + Math.random() * 0.05,
      history: [],
    });

    const init = () => {
      resizeCanvas();
      fireflies = Array.from({ length: particleCount }, createFirefly);
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      fireflies.forEach((f) => {
        f.history.push({ x: f.x, y: f.y });
        if (f.history.length > trailLength) {
          f.history.shift();
        }

        f.x += f.speedX;
        f.y += f.speedY;

        if (f.x < 0) f.x = canvas.width;
        if (f.x > canvas.width) f.x = 0;
        if (f.y < 0) f.y = canvas.height;
        if (f.y > canvas.height) f.y = 0;

        f.opacity += f.opacitySpeed;
        if (f.opacity <= 0 || f.opacity >= 1) {
          f.opacitySpeed *= -1;
        }

        f.pulseAngle += f.pulseSpeed;
        const currentRadius = f.radius + Math.sin(f.pulseAngle) * (f.radius * 0.3);

        for (let i = 0; i < f.history.length; i++) {
          const point = f.history[i];
          const fade = (i / f.history.length);
          const trailRadius = Math.max(0, currentRadius * fade * 0.8);

          ctx.beginPath();
          ctx.arc(point.x, point.y, trailRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 215, 0, ${Math.abs(f.opacity) * fade * 0.3})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(f.x, f.y, Math.max(0, currentRadius), 0, Math.PI * 2);

        ctx.fillStyle = `rgba(255, 215, 0, ${Math.abs(f.opacity)})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "gold";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(update);
    };

    window.addEventListener('resize', resizeCanvas);
    init();
    update();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none mix-blend-screen"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default Fireflies;