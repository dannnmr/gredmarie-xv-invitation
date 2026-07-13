'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { invitationConfig } from '@/config/invitation.config';
import { FairyDust } from '@/components/ui/FairyDust';

import discoBallsImg from '../../../public/hero/bolas_disco_azul.png';
import starsWhiteImg from '../../../public/decoration/estrellas_blanco.png';
import heroBgImg from '../../../public/hero/copa_azul_fondo.png';
import heroNameImg from '../../../public/hero/gredmarie_nombre.png';

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

    // GSAP removed for stardust, replaced with CSS animations for better performance.

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
      className="relative w-full h-[100svh] min-h-screen overflow-hidden flex items-center justify-center bg-transparent"
    >

      {/* Elementos Decorativos */}
      {/* Bola de Disco Colgante */}
      <div className="absolute top-[0%] left-1/2 -translate-x-1/2 w-[70%] md:w-[60%] max-w-[500px] z-10 pointer-events-none floating-disco opacity-90">
        <Image src={discoBallsImg} placeholder="blur" alt="Bolas de Disco" className="object-contain w-full h-auto" priority loading="eager" />
      </div>

      {/* Polvo de Estrellas (CSS puro alto rendimiento, color blanco/plateado) */}
      <div className="absolute top-[15%] left-[5%] md:left-[10%] opacity-70 w-16 md:w-24 pointer-events-none z-10 animate-pulse">
        <Image src={starsWhiteImg} alt="Estrellas" className="object-contain w-full h-auto animate-[spin_25s_linear_infinite]" />
      </div>
 
      <div className="absolute bottom-[35%] right-[5%] md:right-[15%] opacity-50 w-12 md:w-16 pointer-events-none z-10 animate-pulse" style={{ animationDelay: '1.5s' }}>
        <Image src={starsWhiteImg} alt="Estrellas" className="object-contain w-full h-auto animate-[spin_15s_linear_infinite_reverse]" />
      </div>

      <div className="absolute top-[40%] left-[10%] opacity-40 w-8 md:w-12 pointer-events-none z-10 animate-pulse" style={{ animationDelay: '0.8s' }}>
        <Image src={starsWhiteImg} alt="Estrellas" className="object-contain w-full h-auto animate-[spin_20s_linear_infinite]" />
      </div>

      {/* Imagen de Fondo (Parallax) */}
      <div 
        ref={imageRef} 
        className="absolute inset-[-2%] z-0"
      >
        <Image
          src={heroBgImg}
          placeholder="blur"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Gradiente Oscuro para Legibilidad */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.3)_40%,rgba(0,0,0,0.1)_100%)]" />
      </div>

      {/* FairyDust después del fondo para que no quede tapado */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <FairyDust count={25} />
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
              <Image src={heroNameImg} placeholder="blur" alt={invitationConfig.client.name} priority className="w-[110%] h-auto object-contain" />
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

      {/* Difuminado hacia la siguiente sección para mezclar con el fondo principal */}
      <div className="absolute bottom-0 left-0 w-full h-48 md:h-64 bg-gradient-to-t from-[#010308] to-transparent z-20 pointer-events-none"></div>
    </section>
  );
}
