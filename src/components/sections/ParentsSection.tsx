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

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.parents-text', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef });

  const { parents } = invitationConfig;

  return (
    <section 
      ref={containerRef}
      className="py-24 px-6 relative w-full flex flex-col items-center text-center bg-theme-primary text-theme-secondary overflow-hidden"
    >
      <div className="absolute inset-0 bg-theme-accent/5 pointer-events-none z-0"></div>
      
      {/* Elementos Decorativos de Estrellas para continuidad */}
      <div className="absolute inset-0 w-full h-full opacity-20 pointer-events-none z-0 mix-blend-screen">
        <Image src="/decoration/flor_blanca.png" alt="Línea de estrellas" fill className="object-cover md:object-contain object-bottom" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        <h3 className="parents-text font-serif text-lg md:text-xl text-theme-gold/80 italic mb-5">
          {parents.topLabel}
        </h3>
        
        <div className="parents-text flex flex-col items-center gap-4 mb-16">
          <p className="font-display text-4xl md:text-5xl text-theme-secondary tracking-wide drop-shadow-[0_0_8px_rgba(192,192,192,0.3)]">
            {parents.fatherName}
          </p>
          <span className="font-sans text-sm tracking-[0.3em] text-theme-gold">&</span>
          <p className="font-display text-4xl md:text-5xl text-theme-secondary tracking-wide drop-shadow-[0_0_8px_rgba(192,192,192,0.3)]">
            {parents.motherName}
          </p>
        </div>
{/* 
        {parents.godparents && parents.godparents.length > 0 && (
          <div className="parents-text mb-16">
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-theme-gold mb-6">Padrinos</h4>
            <div className="flex flex-col gap-4">
              {parents.godparents.map((gp, idx) => (
                <p key={idx} className="font-serif text-lg text-theme-secondary">
                  <span className="italic opacity-70 block text-sm mb-1">{gp.role}</span>
                  {gp.couple}
                </p>
              ))}
            </div>
          </div>
        )} */}

        <p className="parents-text font-serif text-sm md:text-base leading-relaxed tracking-wider text-theme-secondary/80 max-w-md mt-1">
          {parents.invitationText}
        </p>
      </div>
    </section>
  );
}
