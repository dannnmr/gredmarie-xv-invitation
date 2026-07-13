'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Calendar } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';
import { getCalendarLinks } from '@/lib/calendar';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function SaveTheDateSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Fade & Float Up para los elementos de texto y la caja de cristal
    gsap.fromTo('.std-element', 
      { y: 60, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out'
      }
    );

    // Fade in para la marca de agua gigante
    gsap.fromTo('.std-watermark',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 0.1, duration: 2, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: 'top 70%' } }
    );

    // Parallax para las estrellas
    gsap.to('.std-parallax-1', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1, // Suaviza el parallax
      },
      y: -100, // Se mueve más rápido hacia arriba
      ease: 'none'
    });

    gsap.to('.std-parallax-2', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
      y: -50,
      ease: 'none'
    });
  }, { scope: containerRef });

  const eventDate = invitationConfig.event.date;
  
  // Extraemos día, mes y año de forma amigable (español)
  const day = eventDate.getDate();
  const year = eventDate.getFullYear();
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const monthName = months[eventDate.getMonth()];

  const handleCalendarClick = () => {
    const { googleUrl, icsUrl } = getCalendarLinks(
      eventDate,
      `XV Años de ${invitationConfig.client.name}`,
      invitationConfig.client.finalPhrase,
      invitationConfig.event.locationName
    );

    // Detectar si es dispositivo Apple (iOS / Mac)
    const isAppleDevice = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent);

    if (isAppleDevice) {
      // Descargar archivo .ics para Apple Calendar
      const link = document.createElement('a');
      link.href = icsUrl;
      link.download = 'invitacion.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Abrir Google Calendar para Android y Desktop (Windows/Linux)
      window.open(googleUrl, '_blank');
    }
  };

  return (
    <section 
      ref={containerRef}
      className="py-12 px-6 relative w-full flex flex-col items-center justify-center bg-transparent overflow-hidden"
    >
      {/* Elementos Decorativos de Estrellas con Parallax */}
      <div className="absolute inset-0 w-full h-full opacity-40 pointer-events-none z-0 mix-blend-screen std-parallax-1 ">
        <Image src="/decoration/strellas_linea.png" alt="Línea de estrellas" fill sizes="100vw" className="object-cover md:object-contain object-bottom rotate-180" />
      </div>
      <div className="absolute top-[25%] right-[5%] opacity-50 w-16 md:w-24 pointer-events-none z-0 std-parallax-2 animate-[pulse_5s_ease-in-out_infinite]">
        <Image src="/decoration/estrellas_blanco.png" alt="Estrellas" width={100} height={100} className="object-contain w-full h-auto" />
      </div>
      <div className="absolute bottom-[10%] left-[8%] opacity-40 w-15 md:w-25 pointer-events-none z-0 std-parallax-1 animate-[pulse_4s_ease-in-out_infinite_reverse]">
        <Image src="/decoration/estrellas_blanco.png" alt="Estrellas" width={100} height={100} className="object-contain w-full h-auto" />
      </div>

      {/* Marca de agua gigante de la fecha (solo bordes) */}
      <div 
        className="std-watermark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[30rem] font-display text-transparent z-0 select-none pointer-events-none"
        style={{ WebkitTextStroke: '2px rgba(212,175,55,0.8)' }}
      >
        {day}
      </div>

      <div className="relative z-10 text-center flex flex-col items-center mt-8 md:mt-12">
        <h2 className="std-element font-sans text-xs tracking-[0.4em] uppercase text-theme-gold mb-10">
          Save the Date
        </h2>
        
        <div className="flex flex-col items-stretch w-full max-w-[340px] md:max-w-[480px]">
          <div className="std-element flex items-center justify-between mb-6 border-y border-theme-gold/30 py-6 px-12 md:px-12 backdrop-blur-sm bg-theme-primary/40 rounded-3xl shadow-[0_0_20px_rgba(30,58,138,0.15)] w-full">
            <div className="flex flex-col items-center flex-1">
              <span className="font-serif text-xl md:text-2xl text-theme-secondary/80 uppercase">Viernes</span>
              <span className="font-sans text-[0.65rem] md:text-xs tracking-widest text-theme-gold mt-1">{invitationConfig.event.receptionTime} Hrs</span>
            </div>
            
            <div className="w-px h-16 bg-theme-gold/30 mx-2"></div>
            
            <div className="flex flex-col items-center flex-[1.5]">
              <span className="font-display text-7xl md:text-8xl text-theme-secondary drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] leading-none">
                {day}
              </span>
            </div>
            
            <div className="w-px h-16 bg-theme-gold/30 mx-2"></div>
            
            <div className="flex flex-col items-center flex-1">
              <span className="font-serif text-xl md:text-2xl text-theme-secondary/80 uppercase">{monthName}</span>
              <span className="font-sans text-[0.65rem] md:text-xs tracking-widest text-theme-gold mt-1">{year}</span>
            </div>
          </div>

          {/* Botón de Calendario Unificado */}
          <div className="std-element w-full">
            <button 
              onClick={handleCalendarClick}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-theme-gold text-theme-gold hover:bg-theme-gold hover:text-theme-primary transition-all duration-300 font-sans text-[0.7rem] md:text-xs tracking-widest uppercase font-bold cursor-pointer w-full bg-theme-primary/40 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.3)]"
            >
              <Calendar className="w-4 h-4" />
              Añadir al calendario
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
