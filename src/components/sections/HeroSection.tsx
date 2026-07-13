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
    // Efecto sutil de movimiento sin escalar el contenedor
    gsap.to(imageRef.current, {
      y: 60, // Movimiento en píxeles, no en porcentaje, para evitar recortar la imagen de más
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Animación de la bola de disco colgando
    gsap.fromTo('.floating-disco', 
      { rotation: -2 },
      { rotation: 2, transformOrigin: 'top center', duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' }
    );

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

    // Animación flotante para las decoraciones
    gsap.to('.floating-deco-1', { y: -20, rotation: 5, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.floating-deco-3', { y: -15, rotation: 10, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    // Animación reluciente (shimmer) para el XV gigante
    gsap.to('.hero-xv-text', {
      backgroundPosition: '200% center',
      duration: 3,
      repeat: -1,
      ease: 'linear'
    });

  }, { scope: containerRef, dependencies: [isRevealed] });

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-screen overflow-hidden flex items-center justify-center bg-black"
    >

      {/* Elementos Decorativos */}
      {/* Bola de Disco Colgante */}
      <div className="absolute top-[0%] left-1/2 -translate-x-1/2 w-[70%] md:w-[60%] max-w-[500px] z-10 pointer-events-none floating-disco opacity-90">
        <Image src="/hero/bolas_disco_azul.png" alt="Bolas de Disco" width={400} height={200} className="object-contain w-full h-auto" priority />
      </div>

      <div className="absolute top-[15%] left-[-8%] opacity-60 w-56 md:w-55 pointer-events-none z-10 floating-deco-1">
        <Image src="/decoration/estrellas_blanco.png" alt="Estrellas" width={100} height={100} className="object-contain w-full h-auto" />
      </div>
 
      <div className="absolute bottom-[25%] right-[-5%] md:left-[10%] opacity-80 w-56 md:w-55 pointer-events-none z-10 floating-deco-3">
        <Image src="/decoration/estrellas_blanco.png" alt="Estrellas" width={150} height={150} className="object-contain w-full h-auto" />
      </div>

      {/* Imagen de Fondo (Parallax) */}
      <div 
        ref={imageRef} 
        className="absolute inset-[-2%] z-0"
      >
        <Image
          src={invitationConfig.assets.heroBackground}
          alt="Hero Background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Gradiente Oscuro para Legibilidad */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.4)_40%,rgba(0,0,0,0.1)_100%)]" />
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
              className="hero-xv-text absolute font-serif text-[15rem] md:text-[24rem] font-medium opacity-90 z-0 select-none pointer-events-none drop-shadow-[0_0_15px_rgba(192,192,192,0.4)]"
              style={{
                background: 'linear-gradient(90deg, #444 0%, #aaa 30%, #ffffff 50%, #aaa 70%, #444 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 0.8,
                letterSpacing: '-0.05em'
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
          className="font-serif italic text-[clamp(1rem,1.2vw,1.4rem)] font-normal text-white/85 leading-[1.5] max-w-[340px] px-[1.2rem] py-[0.8rem] bg-black/35 backdrop-blur-[8px] border border-theme-gold/30 rounded-[4px] shadow-[0_4px_20px_rgba(0,0,0,0.5)] text-center opacity-0 mt-auto mb-[clamp(2rem,5vw,4rem)]"
        >
          {invitationConfig.client.finalPhrase}
        </p>

      </div>

      {/* Difuminado hacia la sección Portrait */}
      <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none"></div>
    </section>
  );
}
