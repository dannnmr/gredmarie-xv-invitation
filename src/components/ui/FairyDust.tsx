'use client';

import { useEffect, useState, useRef } from 'react';

interface FairyDustProps {
  count?: number;
}

export function FairyDust({ count = 25 }: FairyDustProps) {
  const [particles, setParticles] = useState<{ id: number; left: string; top: string; delay: string; duration: string; tx: string; ty: string }[]>([]);

  useEffect(() => {
    // Compute purely on client to avoid hydration mismatch
    const generated = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 4}s`,
      duration: `${Math.random() * 3 + 3}s`, // between 3s and 6s
      tx: `${(Math.random() - 0.5) * 50}px`, // drift left or right
      ty: `-${Math.random() * 60 + 40}px` // drift up
    }));
    setParticles(generated);
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-1 h-1 bg-white rounded-full blur-[1px] opacity-0"
          style={{
            left: p.left,
            top: p.top,
            animation: `fairyFloat ${p.duration} ease-in-out infinite alternate ${p.delay}`,
            // Using CSS variables to pass random transform values to the keyframe
            '--tx': p.tx,
            '--ty': p.ty
          } as React.CSSProperties}
        />
      ))}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fairyFloat {
          0% { transform: translateY(0px) translateX(0px); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(var(--ty)) translateX(var(--tx)); opacity: 0; }
        }
      `}} />
    </div>
  );
}
