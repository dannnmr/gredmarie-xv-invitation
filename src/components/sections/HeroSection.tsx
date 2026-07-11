'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { invitationConfig } from '@/config/invitation.config';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroSectionProps {
  isRevealed: boolean;
}

export function HeroSection({ isRevealed }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    // Parallax del fondo
    gsap.to(imageRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Fade del contenido general al hacer scroll hacia abajo
    gsap.to(contentRef.current, {
      opacity: 0,
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Revelación del Hero cuando el sobre termina de abrirse
    if (isRevealed) {
      const tl = gsap.timeline();

      // Animación del eyebrow (XV Años)
      tl.fromTo('.hero-eyebrow', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        0.5
      );

      // Animación de la imagen del nombre bajando y apareciendo
      tl.fromTo(nameRef.current, 
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out' },
        0.7
      );

      // Animación de la frase inferior (glassmorphism)
      tl.fromTo(quoteRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
        1.2
      );
    }
  }, { scope: containerRef, dependencies: [isRevealed] });

  // CSS Puro para el efecto Shimmer Plateado
  const shimmerStyle = `
    @keyframes silverShimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
  `;

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-screen overflow-hidden flex items-center justify-center bg-black"
    >
      <style>{shimmerStyle}</style>

      {/* Imagen de Fondo (Parallax) */}
      <div 
        ref={imageRef} 
        className="absolute top-[-25%] bottom-[-25%] left-[-10%] right-[-10%] z-0"
      >
        <Image
          src={invitationConfig.assets.heroBackground}
          alt="Hero Background"
          fill
          priority
          className="object-cover"
        />
        {/* Gradiente Oscuro para Legibilidad */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.7)_0%,_rgba(0,0,0,0.4)_40%,_rgba(0,0,0,0.1)_100%)]" />
      </div>

      {/* Contenedor Principal (Fade on Scroll) */}
      <div 
        ref={contentRef}
        className="relative z-10 w-full max-w-[800px] h-full flex flex-col items-center justify-between py-16 px-6 text-center"
      >
        <div className="flex flex-col items-center justify-center flex-1 w-full mt-10">
          
          <p className="hero-eyebrow font-sans text-xs md:text-sm text-theme-gold tracking-[0.4em] uppercase mb-10 opacity-0">
            XV Años
          </p>

          <div className="relative flex justify-center items-center w-full">
            {/* Watermark Gigante XV */}
            <span 
              className="absolute font-serif text-[15rem] md:text-[24rem] font-medium opacity-90 z-0 select-none pointer-events-none drop-shadow-[0_0_15px_rgba(192,192,192,0.4)]"
              style={{
                background: 'linear-gradient(90deg, #333 0%, #555 40%, #ffffff 50%, #C0C0C0 60%, #555 70%, #333 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 0.8,
                letterSpacing: '-0.05em',
                animation: 'silverShimmer 6s linear infinite'
              }}
            >
              XV
            </span>

            {/* Imagen del Nombre (Reemplazar src con tu PNG real) */}
            <div 
              ref={nameRef}
              className="relative z-10 w-full max-w-[600px] flex justify-center opacity-0 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
            >
              {/* Se usa un PNG con el nombre estilizado. Placeholder por ahora */}
              <img src="/hero/gredmarie_nombre.png" alt={invitationConfig.client.name} className="w-[110%] h-auto object-contain" />
            </div>
          </div>
        </div>

        {/* Cita Inferior con Glassmorphism */}
        <p 
          ref={quoteRef}
          className="font-serif italic text-lg md:text-xl text-white/90 leading-relaxed max-w-[340px] px-6 py-4 bg-black/35 backdrop-blur-md border border-theme-gold/30 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] opacity-0 mb-8"
        >
          {invitationConfig.client.finalPhrase}
        </p>

      </div>
    </section>
  );
}
