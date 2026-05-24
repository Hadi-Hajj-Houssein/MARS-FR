import { useEffect, useRef } from 'react';

export function RadarWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf: number;
    let angle = 0;

    const blips: { x: number; y: number; age: number; r: number }[] = [];
    for (let i = 0; i < 6; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = Math.random() * 40 + 10;
      blips.push({ x: 60 + Math.cos(a) * d, y: 60 + Math.sin(a) * d, age: Math.random() * 60, r: Math.random() * 2 + 1.5 });
    }

    function draw() {
      const cx = 60, cy = 60, r = 55;
      ctx.clearRect(0, 0, 120, 120);

      // Background
      ctx.fillStyle = 'rgba(5,10,20,0.9)';
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Grid rings
      [0.25, 0.5, 0.75, 1].forEach(f => {
        ctx.beginPath();
        ctx.arc(cx, cy, r * f, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(193,68,14,0.2)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Cross hairs
      ctx.strokeStyle = 'rgba(193,68,14,0.15)';
      ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy - r); ctx.lineTo(cx, cy + r); ctx.stroke();

      // Sweep gradient
      const sweepGrad = ctx.createConicalGradient
        ? null
        : null;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      const grad = ctx.createLinearGradient(0, 0, r, 0);
      grad.addColorStop(0, 'rgba(193,68,14,0.7)');
      grad.addColorStop(0.5, 'rgba(193,68,14,0.2)');
      grad.addColorStop(1, 'transparent');

      // Sweep sector
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, r, -0.4, 0.02);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Beam line
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(r, 0);
      ctx.strokeStyle = 'rgba(232,98,26,0.9)';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(232,98,26,0.8)';
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();

      // Blips
      blips.forEach(b => {
        b.age += 0.5;
        const fade = Math.max(0, 1 - (b.age % 120) / 90);
        if (b.age % 120 < 2) b.age = b.age - (b.age % 120);
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,98,26,${fade * 0.9})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(232,98,26,0.7)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(232,98,26,0.9)';
      ctx.fill();

      // Border
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(193,68,14,0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();

      angle += 0.04;
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={120} height={120} />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: '1px solid rgba(193,68,14,0.3)',
          animation: 'radarPing 3s ease-out infinite',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

export function HoloBar({ label, value, max = 100 }: { label: string; value: number; max?: number }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-1">
        <span className="font-mono-tech text-xs" style={{ color: 'rgba(232,98,26,0.7)', letterSpacing: '0.15em' }}>{label}</span>
        <span className="font-mono-tech text-xs" style={{ color: 'rgba(245,158,11,0.9)' }}>{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(193,68,14,0.2)' }}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, #7a1f08, #c1440e ${pct > 60 ? '60%' : '100%'}, #e8621a)`,
            boxShadow: '0 0 6px rgba(232,98,26,0.6)',
          }}
        />
      </div>
    </div>
  );
}

export function DataStream() {
  const lines = Array.from({ length: 20 }, (_, i) => {
    const types = [
      `SYS.INIT [${(Math.random() * 99).toFixed(0).padStart(2, '0')}]`,
      `ATMO.CO2: ${(95 + Math.random()).toFixed(1)}%`,
      `TEMP: -${(50 + Math.random() * 30).toFixed(1)}°C`,
      `PRESS: ${(0.6 + Math.random() * 0.1).toFixed(2)} kPa`,
      `SIGNAL: OK`,
      `ORBIT: ${(i * 47 + 120).toString().padStart(4, '0')} km`,
      `COMM: ACTIVE`,
      `HULL: NOMINAL`,
      `FUEL: ${(Math.random() * 40 + 60).toFixed(0)}%`,
      `SOL: ${(i * 7 + 300).toString()} DAYS`,
    ];
    return types[i % types.length];
  });

  return (
    <div className="data-scroll-container" style={{ height: 120 }}>
      <div className="data-scroll font-mono-tech text-xs" style={{ color: 'rgba(193,68,14,0.5)', lineHeight: '1.8', letterSpacing: '0.1em' }}>
        {[...lines, ...lines].map((l, i) => (
          <div key={i}>&gt; {l}</div>
        ))}
      </div>
    </div>
  );
}

export function AlarmLights({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 100 }}>
      {/* Corner alarm lights */}
      {[
        { top: 12, left: 12 },
        { top: 12, right: 12 },
        { bottom: 12, left: 12 },
        { bottom: 12, right: 12 },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 rounded-full alarm-light"
          style={{ ...pos }}
        />
      ))}
      {/* Full screen tint */}
      <div className="absolute inset-0 alarm-overlay" />
      {/* Alert text */}
      <div
        className="absolute top-6 left-1/2 font-orbitron text-sm tracking-widest alarm-overlay"
        style={{
          transform: 'translateX(-50%)',
          color: '#ff4040',
          textShadow: '0 0 10px #ff2020',
          animation: 'alarmBlink 0.8s step-end infinite',
        }}
      >
        ⚠ LAUNCH SEQUENCE INITIATED ⚠
      </div>
    </div>
  );
}

export function ScanlineEffect() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 50,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)',
      }}
    />
  );
}

export function MissionTimer({ seconds }: { seconds: number }) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const fmt = (n: number) => n.toString().padStart(2, '0');
  return (
    <span className="font-mono-tech" style={{ color: 'rgba(245,158,11,0.85)' }}>
      {fmt(h)}:{fmt(m)}:{fmt(s)}
    </span>
  );
}
