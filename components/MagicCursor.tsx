import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

const MagicCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef<TrailPoint[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const colors = [
      '#FFD700',
      '#FFA500',
      '#FFF8E1',
      '#FDB931',
      '#FFFFFF'
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (x: number, y: number, burst = false) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = burst ? Math.random() * 3 + 1 : Math.random() * 1.5;

      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        size: burst ? Math.random() * 4 + 2 : Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 1.0
      });

      if (Math.random() > 0.5) {
        createParticle(e.clientX, e.clientY);
      }
    };

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 12; i++) {
        createParticle(e.clientX, e.clientY, true);
      }
    };

    const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
      let rot = Math.PI / 2 * 3;
      let x = cx;
      let y = cy;
      let step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (trailRef.current.length > 2) {
        ctx.beginPath();
        ctx.moveTo(trailRef.current[0].x, trailRef.current[0].y);

        for (let i = 1; i < trailRef.current.length - 2; i++) {
          const xc = (trailRef.current[i].x + trailRef.current[i + 1].x) / 2;
          const yc = (trailRef.current[i].y + trailRef.current[i + 1].y) / 2;
          ctx.quadraticCurveTo(trailRef.current[i].x, trailRef.current[i].y, xc, yc);
        }

        if (trailRef.current.length > 2) {
          const last = trailRef.current[trailRef.current.length - 1];
          const secondLast = trailRef.current[trailRef.current.length - 2];
          ctx.quadraticCurveTo(secondLast.x, secondLast.y, last.x, last.y);
        }

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 2;
        ctx.strokeStyle = `rgba(255, 215, 0, 0.4)`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#FFD700';
        ctx.stroke();

        ctx.shadowBlur = 0;
      }

      for (let i = trailRef.current.length - 1; i >= 0; i--) {
        trailRef.current[i].age -= 0.05;
        if (trailRef.current[i].age <= 0) {
          trailRef.current.splice(i, 1);
        }
      }
      if (trailRef.current.length > 30) {
        trailRef.current.shift();
      }

      particles = particles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.015;
        p.rotation += p.rotationSpeed;

        if (p.life <= 0) return false;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;

        ctx.globalAlpha = p.life;

        drawStar(ctx, 0, 0, 4, p.size, p.size / 2.5);

        ctx.restore();

        return true;
      });

      animationFrameId = requestAnimationFrame(update);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClick);

    resizeCanvas();
    update();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none mix-blend-screen"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default MagicCursor;