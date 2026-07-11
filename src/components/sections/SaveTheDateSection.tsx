'use client';

import { useRef } from 'react';
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
    gsap.from('.std-element', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      scale: 0.9,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'back.out(1.2)'
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
      className="py-20 px-6 relative w-full flex flex-col items-center justify-center bg-theme-primary overflow-hidden"
    >
      <div className="absolute inset-0 bg-theme-accent/5 z-0"></div>

      <div className="relative z-10 text-center flex flex-col items-center">
        <h2 className="std-element font-sans text-xs tracking-[0.4em] uppercase text-theme-gold mb-10">
          Save the Date
        </h2>
        
        <div className="std-element flex items-center justify-center gap-6 md:gap-10 mb-8 border-y border-theme-gold/30 py-6 px-12 md:px-20 backdrop-blur-sm bg-theme-primary/40 rounded-3xl shadow-[0_0_20px_rgba(30,58,138,0.15)]">
          <div className="flex flex-col items-center">
            <span className="font-serif text-xl md:text-2xl text-theme-secondary/80 uppercase">Viernes</span>
          </div>
          
          <div className="w-px h-16 bg-theme-gold/30"></div>
          
          <div className="flex flex-col items-center">
            <span className="font-display text-7xl md:text-8xl text-theme-secondary drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] leading-none">
              {day}
            </span>
          </div>
          
          <div className="w-px h-16 bg-theme-gold/30"></div>
          
          <div className="flex flex-col items-center">
            <span className="font-serif text-xl md:text-2xl text-theme-secondary/80 uppercase">{monthName}</span>
            <span className="font-sans text-xs tracking-widest text-theme-gold mt-1">{year}</span>
          </div>
        </div>

        <p className="std-element font-sans text-sm tracking-[0.2em] text-theme-secondary/70 mb-8">
          Recepción a partir de las <span className="text-theme-gold font-bold">{invitationConfig.event.receptionTime} Hrs</span>
        </p>

        {/* Botón de Calendario Unificado */}
        <div className="std-element mt-2">
          <button 
            onClick={handleCalendarClick}
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-theme-gold text-theme-gold hover:bg-theme-gold hover:text-theme-primary transition-all duration-300 font-sans text-xs tracking-widest uppercase font-bold cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            Agendar Evento
          </button>
        </div>
      </div>
    </section>
  );
}
