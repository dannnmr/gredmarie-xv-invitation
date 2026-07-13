'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Watermark } from '@/components/ui/Watermark';
import { FairyDust } from '@/components/ui/FairyDust';
import portraitImg from '../../../public/decoration/foto_gredmarie.jpg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function PortraitSection() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Oscurecimiento dinámico global
    gsap.fromTo('.scroll-dim',
      { opacity: 0 },
      {
        opacity: 0.85,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        }
      }
    );

    // Animación Base de la Foto
    gsap.fromTo(imageRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
      }
    );

    // Tipografía Editorial Gigante (Watermark)
    gsap.fromTo('.editorial-text', 
      { y: 150, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 2, 
        ease: 'power4.out', 
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' } 
      }
    );

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="py-10 md:py-16 relative w-full flex flex-col items-center justify-center bg-transparent overflow-hidden"
    >
      {/* Capa de oscurecimiento */}
      <div className="scroll-dim absolute inset-0 bg-[#010308] z-[-1] pointer-events-none"></div>

      {/* Texto Editorial Gigante (Watermark) */}
      <div className="absolute top-[15%] md:top-[10%] left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none z-0 w-full overflow-visible">
        <Watermark 
          text="GREDMARIE"
          className="editorial-text font-serif text-[20vw] md:text-[18vw] lg:text-[15rem] leading-none whitespace-nowrap opacity-0"
          strokeColor="rgba(220,220,220,0.8)"
        />
      </div>

      {/* Polvo de estrellas optimizado */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex justify-center items-center opacity-70">
        <div className="relative w-full max-w-[500px] h-full">
          <FairyDust count={40} />
        </div>
      </div>

      {/* Contenedor Principal de la Foto */}
      <div className="relative z-10 w-full max-w-[220px] md:max-w-[260px] mx-auto mt-8 md:mt-12">
        
        {/* Marco Glassmorphism con sombra profunda y borde dorado sutil */}
        <div 
          ref={imageRef}
          className="relative w-full aspect-[3/4] overflow-hidden rounded-t-full rounded-b-[2.5rem] p-2.5 md:p-3 bg-white/5 backdrop-blur-md border border-theme-gold/30 shadow-[0_30px_60px_rgba(0,0,0,0.8)] transition-all duration-500"
        >
          <div className="relative w-full h-full overflow-hidden rounded-t-full rounded-b-[2rem]">
            <Image
              src={portraitImg}
              placeholder="blur"
              alt="Gredmarie"
              fill
              className="object-cover transition-transform duration-[10s] hover:scale-110"
              sizes="(max-width: 768px) 260px, 320px"
              priority
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#010308]/90 via-transparent to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
