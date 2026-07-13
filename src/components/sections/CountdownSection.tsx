'use client';

import { useEffect, useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useCountdown } from '@/hooks/useCountdown';
import { invitationConfig } from '@/config/invitation.config';

const EightPointStarSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,0 51.9,45.4 67.7,32.3 54.6,48.1 100,50 54.6,51.9 67.7,67.7 51.9,54.6 50,100 48.1,54.6 32.3,67.7 45.4,51.9 0,50 45.4,48.1 32.3,32.3 48.1,45.4" fill="white" />
  </svg>
);

const HollowStarSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="white" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,5 61,35 95,35 68,54 78,85 50,65 22,85 32,54 5,35 39,35" strokeLinejoin="round" />
  </svg>
);

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
    // Fade & Float Up para el título
    gsap.fromTo('.countdown-title',
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }
    );

    // Fade & Float Up para las cápsulas
    gsap.fromTo('.time-capsule', 
      { y: 60, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out'
      }
    );

    // Parallax para las decoraciones estáticas
    gsap.to('.cd-parallax-1', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
      y: -80,
      ease: 'none'
    });

    // Animaciones para las nuevas estrellas
    gsap.to('.animated-star', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        toggleActions: 'play pause resume pause',
      },
      opacity: 0.4,
      scale: 1.2,
      duration: 'random(1, 2)',
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut',
      stagger: { each: 0.2, from: 'random' }
    });

    gsap.to('.animated-star-float', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        toggleActions: 'play pause resume pause',
      },
      y: '-=15',
      x: 'random(-5, 5)',
      rotation: 'random(-15, 15)',
      duration: 'random(2.5, 4)',
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      stagger: { each: 0.3, from: 'random' }
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
      className="py-24 px-6 relative w-full flex flex-col items-center justify-center bg-transparent overflow-hidden"
    >
      {/* Resplandor radial de luz central (Efecto Discoteca) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] bg-[radial-gradient(circle_at_center,rgba(200,160,80,0.1)_0%,transparent_70%)] rounded-full z-0 pointer-events-none" />

      {/* Bola de Disco Gigante (Gira infinitamente con CSS) */}
      <div className="absolute top-[20%] -left-[20%] md:-left-[10%] opacity-30 w-64 md:w-96 pointer-events-none z-0">
        <Image 
          src="/decoration/bola disco.png" 
          alt="Bola de disco" 
          width={400} 
          height={400} 
          className="object-contain grayscale mix-blend-screen w-full h-auto animate-[spin_40s_linear_infinite]" 
        />
      </div>

      {/* Estrellas Flotantes SVG (Animadas con GSAP) */}
      <div className="absolute inset-0 z-0 pointer-events-none cd-parallax-1">
        <EightPointStarSVG className="animated-star animated-star-float absolute top-[10%] right-[10%] w-16 h-16 drop-shadow-[0_0_8px_white]" />
        <HollowStarSVG className="animated-star animated-star-float absolute bottom-[20%] right-[20%] w-12 h-12 drop-shadow-[0_0_6px_white]" />
        <EightPointStarSVG className="animated-star animated-star-float absolute top-[30%] left-[20%] w-10 h-10 drop-shadow-[0_0_8px_white]" />
        <EightPointStarSVG className="animated-star animated-star-float absolute bottom-[10%] left-[10%] w-8 h-8 drop-shadow-[0_0_8px_white]" />
        <HollowStarSVG className="animated-star animated-star-float absolute top-[50%] right-[5%] w-6 h-6 drop-shadow-[0_0_6px_white]" />
      </div>

      {/* Títulos */}
      <div className="countdown-title relative z-10 text-center mb-16 w-full flex flex-col items-center">
        <p className="font-sans text-[0.65rem] text-theme-gold tracking-[0.4em] uppercase font-bold mb-4 drop-shadow-[0_0_8px_rgba(192,192,192,0.3)]">
          Empieza la cuenta
        </p>
        
        {/* Encabezado Outline (Estilo Evento) */}
        <div className="relative flex items-start justify-center mt-2 mb-2 w-full">
          <span 
            className="font-display text-[4rem] md:text-[6rem] text-transparent leading-[0.85] z-0 tracking-wider text-center drop-shadow-md"
            style={{ WebkitTextStroke: '1px rgba(220,220,220,0.9)' }} 
          >
            Falta muy<br/>poco
          </span>
        </div>
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
