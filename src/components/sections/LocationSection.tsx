'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { MapPin } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function LocationSection() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animación de aparición de los elementos de texto
    gsap.fromTo('.loc-anim', 
      { opacity: 0, y: 30 },
      {
        opacity: 1, 
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );

    // Efecto parallax de la imagen de fondo (estilo editorial)
    gsap.fromTo(imageRef.current,
      { opacity: 0, scale: 1.1, x: 50 },
      {
        opacity: 0.15,
        scale: 1,
        x: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );

    // Rotación infinita para el botón circular
    gsap.to('.rotating-text', {
      rotation: 360,
      duration: 25,
      repeat: -1,
      ease: 'none'
    });

  }, { scope: containerRef });

  const { locationName, locationAddress, locationUrl } = invitationConfig.event as any;
  
  // Separamos el nombre principal de detalles adicionales si los hay (usando paréntesis)
  const venueTitle = locationName.split('(')[0].trim();
  const venueSubtitle = locationName.includes('(') ? locationName.split('(')[1].replace(')', '').trim() : 'Recepción del Evento';

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[50vh] py-16 px-6 md:px-12 flex flex-col justify-center bg-black overflow-hidden z-10"
    >
      {/* Imagen de fondo estilo editorial (Lado inferior) */}
      <div 
        ref={imageRef}
        className="absolute bottom-[-10%] right-[-10%] w-[100%] max-w-[800px] h-[70%] z-0 pointer-events-none opacity-0"
      >
        <Image 
          src="/decoration/flores_azules_fondo.png" 
          alt="Decoración Ubicación"
          fill
          className="object-contain object-bottom md:object-right-bottom opacity-50"
          sizes="(max-width: 800px) 100vw, 800px"
        />
      </div>

      {/* Contenedor Principal con Tipografía Masiva */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col">
        
        {/* Etiqueta Superior */}
        <p className="loc-anim font-sans text-theme-gold text-xs tracking-[0.4em] uppercase mb-8 flex items-center gap-4 opacity-0">
          <span className="w-10 h-px bg-theme-gold"></span>
          El Lugar
        </p>

        {/* Nombre Masivo */}
        <h2 className="loc-anim font-display text-[clamp(4.5rem,12vw,10rem)] text-theme-secondary leading-[0.85] font-light mb-8 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] opacity-0">
          {venueTitle}
        </h2>

        {/* Divisor y Grid de Dirección */}
        <div className="loc-anim border-t border-theme-gold/30 pt-8 mt-4 opacity-0">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 md:gap-8 max-w-4xl">
            
            {/* Detalles de la Dirección */}
            <div className="flex flex-col max-w-md">
              {venueSubtitle && (
                <h3 className="font-sans text-theme-secondary text-[1.2rem] font-light tracking-[0.1em] uppercase mb-2">
                  {venueSubtitle}
                </h3>
              )}
              <p className="font-sans text-white/60 text-[0.95rem] leading-[1.6] tracking-[0.05em]">
                {locationAddress}
              </p>
            </div>

            {/* Botón Circular Estilo Avant-Garde */}
            <div className="relative z-50 flex-shrink-0 self-start md:self-auto pointer-events-auto">
              <a 
                href={locationUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative block outline-none cursor-pointer"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <div className="relative w-[110px] h-[110px] rounded-full border border-white/20 flex items-center justify-center text-theme-gold bg-white/5 transition-all duration-300 group-hover:scale-105 group-active:scale-95 shadow-xl hover:bg-white/10">
                  
                  {/* SVG de Texto Rotativo */}
                  <svg viewBox="0 0 100 100" className="rotating-text absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none">
                    <path id="circleTextPathLocation" d="M 50, 50 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" fill="transparent" />
                    <text className="text-[7.2px] fill-theme-gold font-sans tracking-[0.25em] uppercase font-bold">
                      <textPath href="#circleTextPathLocation" startOffset="0%">
                        VER EN GOOGLE MAPS • RUTA AL EVENTO • 
                      </textPath>
                    </text>
                  </svg>
                  
                  <MapPin size={38} strokeWidth={1} className="text-theme-secondary transition-colors group-hover:text-theme-gold pointer-events-none" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Difuminado hacia la siguiente sección (Dress Code) */}
      <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none"></div>
    </section>
  );
}
