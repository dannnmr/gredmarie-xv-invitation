'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { invitationConfig } from '@/config/invitation.config';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ParentsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { parents } = invitationConfig;

  useGSAP(() => {
    // Animación de aparición de la línea dividida
    gsap.fromTo('.split-line-left, .split-line-right',
      { scaleX: 0, transformOrigin: 'outer' },
      { scaleX: 1, duration: 2, ease: 'power4.inOut', scrollTrigger: { trigger: containerRef.current, start: 'top 75%' } }
    );
    // Configurar transformOrigin: izquierda dibuja a la derecha (right), derecha dibuja a la izquierda (left)
    gsap.set('.split-line-left', { transformOrigin: 'right center' });
    gsap.set('.split-line-right', { transformOrigin: 'left center' });
    gsap.fromTo('.split-text-top',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.5, delay: 1, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 75%' } }
    );
    gsap.fromTo('.split-text-bottom',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.5, delay: 1.5, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 75%' } }
    );
    
    // Animación del Ampersand
    gsap.fromTo('.ampersand-outline',
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 2, delay: 0.8, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top 75%' } }
    );

    // Parallax para la flor
    gsap.to('.parents-parallax', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
      y: -60,
      ease: 'none'
    });

    // Efecto flotante infinito
    gsap.to('.flower-float', {
      y: 20,
      rotation: 2,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-12 md:py-16 px-6 relative w-full flex flex-col items-center justify-center bg-transparent overflow-hidden">
      
      {/* Elementos Decorativos de la flor con Parallax y Flotación */}
      <div className="absolute inset-0 w-full h-full opacity-15 pointer-events-none z-0 mix-blend-screen parents-parallax pt-10">
        <div className="w-full h-full flower-float relative">
          <Image src="/decoration/flor_blanca.png" alt="Flor decorativa" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain object-center md:scale-100 scale-125" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        <div className="split-text-top mb-8">
          <h3 className="font-serif text-sm md:text-base text-slate-300 italic uppercase tracking-[0.3em]">
            {parents.topLabel}
          </h3>
        </div>
        
        <div className="w-full flex flex-col items-center justify-center relative">
          {/* Nombre del padre (arriba) */}
          <div className="split-text-top text-3xl sm:text-4xl md:text-5xl font-display text-white tracking-wider mb-4 z-20 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            {parents.fatherName}
          </div>
          
          {/* Contenedor central: Línea + Ampersand */}
          <div className="relative w-full flex items-center justify-center h-10">
            {/* Ampersand contorneado (centro) */}
            <div 
              className="ampersand-outline absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl md:text-6xl font-serif text-transparent z-10 select-none px-6"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}
            >
              &
            </div>

            {/* Línea divisoria plateada con hueco transparente al medio */}
            <div className="flex w-full items-center justify-between z-0">
              <div className="split-line-left w-[35%] md:w-[42%] h-[1px] bg-gradient-to-r from-transparent to-white/80 shadow-[0_0_8px_rgba(255,255,255,0.5)]"></div>
              <div className="split-line-right w-[35%] md:w-[42%] h-[1px] bg-gradient-to-l from-transparent to-white/80 shadow-[0_0_8px_rgba(255,255,255,0.5)]"></div>
            </div>
          </div>
          
          {/* Nombre de la madre (abajo) */}
          <div className="split-text-bottom text-3xl sm:text-4xl md:text-5xl font-display text-white tracking-wider mt-4 z-20 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            {parents.motherName}
          </div>
        </div>
      </div>
    </section>
  );
}
