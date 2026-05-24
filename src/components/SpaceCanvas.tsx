import { useEffect, useRef } from 'react';

interface Star { x: number; y: number; r: number; speed: number; phase: number; }
interface Particle { x: number; y: number; vx: number; vy: number; r: number; alpha: number; color: string; }
interface Meteor { x: number; y: number; len: number; speed: number; active: boolean; alpha: number; }

export function SpaceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let t = 0;

    const stars: Star[] = [];
    const particles: Particle[] = [];
    const meteors: Meteor[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Init stars
    for (let i = 0; i < 260; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.4 + 0.1,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Init dust particles
    for (let i = 0; i < 60; i++) {
      particles.push(createParticle());
    }

    // Init meteors (inactive)
    for (let i = 0; i < 5; i++) {
      meteors.push(createMeteor(false));
    }

    function createParticle(): Particle {
      const colors = ['#c1440e', '#e8621a', '#f59e0b', '#8b2500', '#ff6030'];
      return {
        x: Math.random() * (window.innerWidth || 1200),
        y: Math.random() * (window.innerHeight || 800),
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(Math.random() * 0.4 + 0.1),
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    }

    function createMeteor(active: boolean): Meteor {
      return {
        x: Math.random() * window.innerWidth * 1.5 - window.innerWidth * 0.3,
        y: -20,
        len: Math.random() * 120 + 60,
        speed: Math.random() * 8 + 6,
        active,
        alpha: 1,
      };
    }

    let meteorTimer = 0;

    function draw() {
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      // Deep space gradient background
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#020408');
      bg.addColorStop(0.5, '#04060f');
      bg.addColorStop(1, '#0a0408');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Nebula glow
      const neb1 = ctx.createRadialGradient(W * 0.75, H * 0.3, 0, W * 0.75, H * 0.3, W * 0.35);
      neb1.addColorStop(0, 'rgba(120, 30, 10, 0.06)');
      neb1.addColorStop(1, 'transparent');
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, W, H);

      const neb2 = ctx.createRadialGradient(W * 0.2, H * 0.7, 0, W * 0.2, H * 0.7, W * 0.25);
      neb2.addColorStop(0, 'rgba(30, 60, 120, 0.05)');
      neb2.addColorStop(1, 'transparent');
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, W, H);

      // Stars
      stars.forEach(s => {
        const brightness = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${brightness * 0.9})`;
        ctx.shadowBlur = s.r > 1 ? 4 : 0;
        ctx.shadowColor = 'rgba(180, 200, 255, 0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Dust particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10 || p.x < -10 || p.x > W + 10) {
          particles[i] = createParticle();
          particles[i].y = H + 10;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (0.6 + 0.4 * Math.sin(t * 0.5 + i));
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Meteors
      meteorTimer++;
      if (meteorTimer > 180) {
        meteorTimer = 0;
        const idx = meteors.findIndex(m => !m.active);
        if (idx !== -1) {
          meteors[idx] = { ...createMeteor(true) };
        }
      }

      meteors.forEach((m, i) => {
        if (!m.active) return;
        m.x += m.speed * 1.6;
        m.y += m.speed * 1.0;

        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.len * 1.2, m.y - m.len * 0.75);
        grad.addColorStop(0, `rgba(255, 160, 80, ${m.alpha})`);
        grad.addColorStop(0.3, `rgba(255, 80, 20, ${m.alpha * 0.6})`);
        grad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.len * 1.2, m.y - m.len * 0.75);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(255, 100, 30, 0.8)';
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Head glow
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,200,120,${m.alpha})`;
        ctx.fill();

        if (m.x > W + 100 || m.y > H + 100) {
          meteors[i].active = false;
        }
      });

      t += 0.015;
      raf = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
