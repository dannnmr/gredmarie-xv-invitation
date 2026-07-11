'use client';

import { useEffect, useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useCountdown } from '@/hooks/useCountdown';
import { invitationConfig } from '@/config/invitation.config';
// Importa ScrollMovingElement si quieres usarlo en el futuro:
// import { ScrollMovingElement } from '@/components/ui/ScrollMovingElement';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function CountdownSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const countdown = useCountdown(invitationConfig.event.date);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(() => {
    gsap.from('.time-capsule', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      scale: 0.9,
      duration: 1.2,
      stagger: 0.15,
      ease: 'back.out(1.2)'
    });
  }, { scope: containerRef });

  const items = [
    { label: 'DÍAS', value: isMounted ? countdown.days : 0 },
    { label: 'HRS', value: isMounted ? countdown.hours : 0 },
    { label: 'MIN', value: isMounted ? countdown.minutes : 0 },
    { label: 'SEG', value: isMounted ? countdown.seconds : 0 },
  ];

  return (
    <section 
      ref={containerRef}
      className="py-24 px-6 relative w-full flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* Luz de fondo sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse,_rgba(30,58,138,0.15)_0%,_transparent_60%)] blur-[40px] pointer-events-none z-0"></div>

      {/* Títulos */}
      <div className="relative z-10 text-center mb-16">
        <p className="font-sans text-[0.65rem] text-theme-gold tracking-[0.4em] uppercase font-bold mb-4 drop-shadow-[0_0_8px_rgba(192,192,192,0.3)]">
          Empieza la cuenta
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-theme-secondary drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          Falta muy poco
        </h2>
      </div>

      {/* Cápsulas de tiempo */}
      <div className="relative z-10 flex flex-wrap justify-center gap-4 md:gap-6">
        {items.map((item, idx) => (
          <div key={idx} className="time-capsule relative">
            <div className="flex flex-col items-center justify-center w-[75px] h-[100px] md:w-[90px] md:h-[120px] bg-white/5 backdrop-blur-md border border-white/20 rounded-[40px] shadow-[0_10px_30px_rgba(0,0,0,0.5),_inset_0_0_15px_rgba(192,192,192,0.1)] transition-transform duration-300 hover:scale-105 hover:border-theme-gold/50">
              <span className="font-serif text-3xl md:text-4xl text-theme-secondary font-medium tracking-tight">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="font-sans text-[0.6rem] md:text-xs text-theme-gold tracking-[0.15em] font-bold mt-2">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 
        Si decides usar el "efecto taxi" en el futuro, descomenta esto:
        <ScrollMovingElement 
          src="/images/tu-auto-o-taxi.png" 
          alt="Decoración en movimiento" 
          width={150} 
          height={70} 
          bottomOffset="20px" 
        />
      */}
    </section>
  );
}
