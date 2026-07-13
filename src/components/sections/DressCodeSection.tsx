'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Ban } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';
import { Sparkle } from '@/components/ui/Sparkle';
import { FairyDust } from '@/components/ui/FairyDust';
import dressCodeImg from '../../../public/decoration/codedress.png';

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
      y: 80,
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
      className="relative w-full py-20 px-6 flex flex-col items-center justify-center bg-transparent overflow-hidden"
    >
      {/* Luz azul/plateada de fondo para el glassmorphism */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[400px] bg-[radial-gradient(ellipse,_rgba(30,58,138,0.2)_0%,_transparent_70%)] blur-[40px] z-0 pointer-events-none" />

      <FairyDust count={20} />

      {/* Light Beam Diagonal (Efecto Alfombra Roja) */}
      <div className="absolute top-[-30%] left-[-20%] w-[150%] h-[40%] bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.04),transparent)] rotate-[-40deg] pointer-events-none z-0" />
      <div className="absolute top-[30%] left-[-20%] w-[150%] h-[20%] bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.02),transparent)] rotate-[-40deg] pointer-events-none z-0" />

      {/* Sparkles Decorativos */}
      <Sparkle className="top-[15%] right-[10%] w-12 md:w-16 opacity-60" delay={0.2} speed={18} />
      <Sparkle className="bottom-[20%] left-[5%] md:left-[10%] w-10 md:w-14 opacity-50" delay={1.5} speed={25} reverse />

      {/* Tarjeta Glassmorphism en forma de Arco */}
      <div 
        ref={cardRef}
        className="relative z-10 w-full max-w-[350px] px-6 py-10 flex flex-col items-center text-center bg-white/5 backdrop-blur-xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.8),_inset_0_0_20px_rgba(192,192,192,0.05)]"
        style={{ borderRadius: '150px 150px 0 0' }}
      >
        
        <span className="font-sans text-[0.65rem] text-theme-gold tracking-[0.2em] uppercase mb-2">
          Sugerencia de estilo
        </span>
        
        {/* Encabezado Outline (Estilo Evento) */}
        <div className="relative flex items-start justify-center mt-2 mb-4 w-full">
          <span 
            className="font-display text-[3rem] md:text-[5rem] text-transparent leading-[0.85] z-0 tracking-wider text-center drop-shadow-md"
            style={{ WebkitTextStroke: '0.5px rgba(220,220,220,0.9)' }} 
          >
            Dress Code
          </span>
          <span className="font-serif italic text-xl text-theme-gold absolute right-[10%] md:right-[5%] top-2 opacity-90">
            
          </span>
        </div>

        {/* Elemento flotante con la imagen real */}
        <div 
          ref={floatRef}
          className="relative w-full max-w-[180px] h-[180px] mt-2 mb-6 z-[1] drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center pointer-events-none"
        >
           <Image 
             src={dressCodeImg} 
             placeholder="blur"
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
