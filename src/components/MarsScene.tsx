import { useEffect, useRef } from 'react';

export function MarsScene() {
  const marsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number;
    let t = 0;
    const el = marsRef.current;
    if (!el) return;

    const animate = () => {
      t += 0.003;
      const drift = Math.sin(t) * 6;
      el.style.transform = `translateY(${drift}px)`;
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className="fixed pointer-events-none"
      style={{ zIndex: 1, right: '-8vw', bottom: '-12vw' }}
    >
      {/* Planet body */}
      <div
        ref={marsRef}
        className="relative"
        style={{ width: '55vw', height: '55vw', maxWidth: 700, maxHeight: 700 }}
      >
        {/* Atmosphere glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 40% 40%, rgba(232,98,26,0.15) 0%, rgba(193,68,14,0.08) 50%, transparent 70%)',
            transform: 'scale(1.25)',
            filter: 'blur(30px)',
            animation: 'glowPulse 4s ease-in-out infinite',
          }}
        />

        {/* Planet surface */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at 32% 28%, #e8622a 0%, #c1440e 25%, #8b2500 55%, #5a1500 80%, #2a0800 100%)
            `,
            boxShadow: `
              inset -25px -25px 60px rgba(0,0,0,0.7),
              inset 15px 10px 40px rgba(232,98,26,0.25),
              0 0 60px rgba(193,68,14,0.3),
              0 0 120px rgba(193,68,14,0.15)
            `,
          }}
        >
          {/* Surface detail stripes */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `
                repeating-linear-gradient(
                  -8deg,
                  transparent 0%,
                  transparent 6%,
                  rgba(120,40,10,0.25) 6%,
                  rgba(120,40,10,0.25) 8%,
                  transparent 8%,
                  transparent 14%,
                  rgba(180,60,20,0.15) 14%,
                  rgba(180,60,20,0.15) 16%
                )
              `,
              animation: 'marsRotate 80s linear infinite',
            }}
          />

          {/* Valles Marineris canyon */}
          <div
            className="absolute"
            style={{
              top: '38%', left: '15%', width: '55%', height: '6%',
              background: 'linear-gradient(90deg, transparent, rgba(60,10,0,0.6) 20%, rgba(40,5,0,0.7) 50%, rgba(60,10,0,0.5) 80%, transparent)',
              borderRadius: '50%',
              transform: 'rotate(-5deg)',
              filter: 'blur(2px)',
            }}
          />

          {/* Polar ice cap */}
          <div
            className="absolute"
            style={{
              top: '4%', left: '35%', width: '30%', height: '14%',
              background: 'radial-gradient(ellipse, rgba(220,200,180,0.5) 0%, rgba(200,160,120,0.2) 60%, transparent 80%)',
              borderRadius: '50%',
              filter: 'blur(3px)',
            }}
          />

          {/* Craters */}
          {[
            { top: '25%', left: '20%', size: '8%', opacity: 0.4 },
            { top: '60%', left: '45%', size: '6%', opacity: 0.35 },
            { top: '45%', left: '65%', size: '10%', opacity: 0.3 },
            { top: '70%', left: '25%', size: '5%', opacity: 0.4 },
            { top: '30%', left: '55%', size: '4%', opacity: 0.35 },
          ].map((c, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                top: c.top, left: c.left,
                width: c.size, height: c.size,
                background: `radial-gradient(circle at 40% 40%, rgba(60,10,0,${c.opacity}) 0%, transparent 70%)`,
                boxShadow: `inset 1px 1px 3px rgba(255,100,50,0.1)`,
              }}
            />
          ))}

          {/* Red clouds animation layer */}
          <div
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{ opacity: 0.35 }}
          >
            <div
              className="absolute"
              style={{
                top: '20%', left: '-30%', width: '80%', height: '15%',
                background: 'radial-gradient(ellipse, rgba(200,80,20,0.5) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(8px)',
                animation: 'cloudDrift 35s linear infinite',
              }}
            />
            <div
              className="absolute"
              style={{
                top: '55%', left: '-40%', width: '70%', height: '12%',
                background: 'radial-gradient(ellipse, rgba(180,60,10,0.4) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(10px)',
                animation: 'cloudDrift 45s linear infinite 8s',
              }}
            />
          </div>

          {/* Surface light bloom */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 32% 28%, rgba(255,140,60,0.18) 0%, transparent 45%)',
            }}
          />
        </div>

        {/* Thin atmosphere rim */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '3px solid rgba(232,98,26,0.12)',
            boxShadow: '0 0 40px rgba(193,68,14,0.2), inset 0 0 20px rgba(232,98,26,0.05)',
          }}
        />
      </div>
    </div>
  );
}

export function EarthPlanet() {
  return (
    <div
      className="fixed pointer-events-none"
      style={{ zIndex: 1, left: '3vw', top: '8vh' }}
    >
      <div
        className="relative rounded-full overflow-hidden"
        style={{
          width: '12vw', height: '12vw', maxWidth: 160, maxHeight: 160,
          animation: 'float 12s ease-in-out infinite',
        }}
      >
        {/* Earth glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 40% 35%, rgba(30,100,200,0.2) 0%, rgba(10,50,120,0.1) 60%, transparent 80%)',
            transform: 'scale(1.3)',
            filter: 'blur(15px)',
          }}
        />
        {/* Earth surface */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 38% 32%, #1a5fb4 0%, #0d3a78 30%, #0a2855 60%, #050f25 100%)',
            boxShadow: 'inset -8px -8px 20px rgba(0,0,0,0.7), inset 4px 3px 12px rgba(100,180,255,0.15)',
            animation: 'earthRotateAnim 60s linear infinite',
          }}
        >
          {/* Continent blobs */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div style={{
              position:'absolute', top:'25%', left:'20%', width:'35%', height:'25%',
              background: 'rgba(34,139,34,0.5)', borderRadius: '40% 60% 50% 50%',
              filter: 'blur(2px)',
            }} />
            <div style={{
              position:'absolute', top:'40%', left:'50%', width:'30%', height:'20%',
              background: 'rgba(40,160,40,0.4)', borderRadius: '50% 40% 60% 50%',
              filter: 'blur(2px)',
            }} />
            <div style={{
              position:'absolute', top:'55%', left:'30%', width:'20%', height:'15%',
              background: 'rgba(34,139,34,0.35)', borderRadius: '50%',
              filter: 'blur(2px)',
            }} />
          </div>
          {/* Cloud layer */}
          <div style={{
            position:'absolute', inset:0,
            background: 'radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.12) 0%, transparent 50%)',
            borderRadius: '50%',
          }} />
        </div>
        {/* Atmosphere rim */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '2px solid rgba(100,180,255,0.15)',
            boxShadow: '0 0 20px rgba(50,120,220,0.2)',
          }}
        />
      </div>

      {/* Label */}
      <div className="text-center mt-2 font-mono-tech text-xs" style={{ color: 'rgba(100,180,255,0.5)', letterSpacing: '0.2em' }}>
        EARTH
      </div>
    </div>
  );
}

export function FlyingRocket({ delay, top, scale }: { delay: number; top: string; scale?: number }) {
  return (
    <div
      className="fixed pointer-events-none"
      style={{
        top,
        left: 0,
        zIndex: 2,
        animation: `rocketFly ${18 + delay * 4}s linear infinite ${delay}s`,
        transform: 'rotate(-20deg)',
        scale: scale ?? 1,
      }}
    >
      <svg width="50" height="100" viewBox="0 0 50 100" fill="none">
        <defs>
          <radialGradient id={`rg${delay}`} cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#e8e0d0" />
            <stop offset="100%" stopColor="#a09080" />
          </radialGradient>
        </defs>
        {/* Body */}
        <ellipse cx="25" cy="50" rx="10" ry="35" fill={`url(#rg${delay})`} />
        {/* Nose cone */}
        <path d="M15 25 Q25 0 35 25 Z" fill="#d0c8b8" />
        {/* Fins */}
        <path d="M15 70 L5 88 L18 78 Z" fill="#b0a898" />
        <path d="M35 70 L45 88 L32 78 Z" fill="#b0a898" />
        {/* Window */}
        <circle cx="25" cy="40" r="5" fill="rgba(120,200,255,0.6)" stroke="#90b8d0" strokeWidth="1.5" />
        {/* Exhaust flame */}
        <ellipse cx="25" cy="88" rx="6" ry="14" fill="rgba(255,120,20,0.7)" style={{ filter: 'blur(2px)' }} />
        <ellipse cx="25" cy="92" rx="3" ry="8" fill="rgba(255,220,80,0.9)" style={{ filter: 'blur(1px)' }} />
      </svg>
    </div>
  );
}

export function Spaceship({ delay, top }: { delay: number; top: string }) {
  return (
    <div
      className="fixed pointer-events-none"
      style={{
        top,
        left: 0,
        zIndex: 2,
        animation: `spaceshipGlide ${30 + delay * 8}s linear infinite ${delay}s`,
      }}
    >
      <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
        {/* Main hull */}
        <ellipse cx="60" cy="20" rx="45" ry="10" fill="rgba(80,90,110,0.85)" stroke="rgba(180,200,220,0.3)" strokeWidth="0.5" />
        {/* Bridge */}
        <ellipse cx="55" cy="16" rx="18" ry="7" fill="rgba(100,115,135,0.9)" />
        {/* Cockpit */}
        <ellipse cx="50" cy="15" rx="8" ry="5" fill="rgba(100,180,220,0.4)" stroke="rgba(150,220,255,0.3)" strokeWidth="0.8" />
        {/* Engine pods */}
        <ellipse cx="90" cy="22" rx="12" ry="5" fill="rgba(70,80,100,0.8)" />
        <ellipse cx="30" cy="22" rx="10" ry="4" fill="rgba(70,80,100,0.8)" />
        {/* Engine glow */}
        <ellipse cx="102" cy="22" rx="4" ry="3" fill="rgba(100,200,255,0.5)" style={{ filter: 'blur(2px)' }} />
        <ellipse cx="18" cy="22" rx="3" ry="2" fill="rgba(80,180,255,0.4)" style={{ filter: 'blur(2px)' }} />
        {/* Lights */}
        <circle cx="15" cy="20" r="1.5" fill="rgba(255,80,80,0.9)" />
        <circle cx="105" cy="20" r="1.5" fill="rgba(80,255,80,0.9)" />
      </svg>
    </div>
  );
}

export function RedClouds() {
  return (
    <>
      {[0, 1, 2, 3].map(i => (
        <div
          key={i}
          className="fixed pointer-events-none"
          style={{
            top: `${20 + i * 18}%`,
            left: 0,
            width: `${35 + i * 8}vw`,
            height: `${6 + i * 2}vh`,
            background: `radial-gradient(ellipse, rgba(${120 + i * 20},${40 + i * 5},${10},0.25) 0%, transparent 70%)`,
            filter: 'blur(15px)',
            borderRadius: '50%',
            animation: `cloudDrift ${40 + i * 12}s linear infinite ${i * 7}s`,
            zIndex: 1,
          }}
        />
      ))}
    </>
  );
}

export function FogLayer() {
  return (
    <>
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="fixed pointer-events-none"
          style={{
            bottom: `${5 + i * 12}%`,
            left: 0,
            width: '200%',
            height: `${8 + i * 4}vh`,
            background: `linear-gradient(90deg, transparent 0%, rgba(80,20,5,${0.08 + i * 0.04}) 30%, rgba(60,15,3,${0.06 + i * 0.03}) 60%, transparent 100%)`,
            filter: 'blur(20px)',
            animation: `fogDrift ${50 + i * 15}s linear infinite ${i * 10}s`,
            zIndex: 1,
          }}
        />
      ))}
    </>
  );
}
