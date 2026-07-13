'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function PortraitSection() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal and subtle parallax for the portrait
    gsap.fromTo(imageRef.current,
      { opacity: 0, scale: 0.95, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-8 md:py-12 px-6 flex flex-col items-center justify-center bg-theme-primary overflow-hidden"
    >
      <div className="absolute inset-0 bg-theme-accent/5 z-0"></div>
      
      {/* Difuminado suave desde la sección anterior (Hero, que es bg-black) */}
      <div className="absolute top-0 left-0 w-full h-32 md:h-48 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none"></div>

      {/* Elementos Decorativos de Estrellas */}
      <div className="absolute inset-0 w-full h-full opacity-40 pointer-events-none z-0 mix-blend-screen">
        <Image src="/decoration/strellas_linea.png" alt="Línea de estrellas" fill className="object-cover md:object-contain object-top" />
      </div>
      <div className="absolute top-[10%] left-[5%] opacity-40 w-16 md:w-24 pointer-events-none z-10 floating-deco-1">
        <Image src="/decoration/estrellas_blanco.png" alt="Estrellas" width={100} height={100} className="object-contain w-full h-auto" />
      </div>
      <div className="absolute bottom-[10%] right-[5%] opacity-50 w-20 md:w-32 pointer-events-none z-10 floating-deco-2">
        <Image src="/decoration/estrellas_blanco.png" alt="Estrellas" width={100} height={100} className="object-contain w-full h-auto" />
      </div>

      {/* Decorative subtle lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05)_0%,_transparent_50%)] blur-[30px] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-[220px] md:max-w-[260px] mx-auto">
        {/* Frame / Container */}
        <div 
          ref={imageRef}
          className="relative w-full aspect-[3/4] rounded-t-full rounded-b-[2rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)] border-[1px] border-theme-gold/50 p-1.5 bg-gradient-to-b from-theme-gold/10 to-transparent"
        >
          <div className="relative w-full h-full rounded-t-full rounded-b-[1.7rem] overflow-hidden">
            <Image
              src="/decoration/foto_gredmarie.jpg"
              alt="Gredmarie"
              fill
              className="object-cover transition-transform duration-[10s] hover:scale-110"
              sizes="(max-width: 768px) 250px, 300px"
            />
            {/* Elegant overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Nombre de la quinceañera */}
      <div className="relative z-10 mt-6 text-center">
        <h3 className="font-serif text-3xl md:text-4xl text-theme-gold/90 italic tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Gredmarie
        </h3>
      </div>
    </section>
  );
}
