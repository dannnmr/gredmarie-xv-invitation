'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Ban } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';

export function DressCodeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animación de entrada de la tarjeta
    gsap.from(cardRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });

    // Animación flotante continua para el ícono/imagen central
    gsap.to(floatRef.current, {
      y: -15,
      rotation: 2,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, { scope: containerRef });

  const { dressCode } = invitationConfig;

  return (
    <section 
      ref={containerRef}
      className="py-16 px-6 relative w-full flex justify-center bg-black overflow-hidden"
    >
      {/* Luz azul/plateada de fondo para el glassmorphism */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[400px] bg-[radial-gradient(ellipse,_rgba(30,58,138,0.2)_0%,_transparent_70%)] blur-[40px] z-0 pointer-events-none" />

      {/* Tarjeta Glassmorphism en forma de Arco */}
      <div 
        ref={cardRef}
        className="relative z-10 w-full max-w-[350px] px-6 py-10 flex flex-col items-center text-center bg-white/5 backdrop-blur-xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.8),_inset_0_0_20px_rgba(192,192,192,0.05)]"
        style={{ borderRadius: '150px 150px 0 0' }}
      >
        
        <span className="font-sans text-[0.65rem] text-theme-gold tracking-[0.2em] uppercase mb-2">
          Sugerencia de estilo
        </span>
        
        <h2 className="font-display text-5xl md:text-6xl text-theme-secondary font-normal m-0 leading-none z-10 relative">
          Dress Code
        </h2>

        {/* Elemento flotante con la imagen real */}
        <div 
          ref={floatRef}
          className="relative w-full max-w-[180px] h-[180px] mt-2 mb-6 z-[1] drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center pointer-events-none"
        >
           <Image 
             src="/decoration/codedress.png" 
             alt="Dress Code" 
             fill 
             sizes="(max-width: 768px) 180px, 180px"
             className="object-contain" 
           />
        </div>
        
        {/* Círculos de texturas de colores */}
        <div className="flex flex-wrap justify-center gap-3 mb-6 z-10 relative">
          {dressCode.colors?.map((color, idx) => (
            <div 
              key={idx} 
              className="w-[50px] h-[50px] rounded-full border border-theme-gold/50 shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Nota especial */}
        <div className="flex flex-col items-center gap-2 border-t border-theme-gold/20 pt-6 mt-2 w-[85%]">
          <span className="font-display text-3xl text-theme-gold leading-[0.8]">
            Nota Especial
          </span>
          <div className="flex items-start gap-2 mt-2">
            <Ban size={14} className="text-theme-gold mt-[2px] shrink-0" />
            <p className="font-sans text-white/70 text-[0.75rem] leading-relaxed tracking-[0.05em] italic m-0 text-left">
              {dressCode.notes}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
