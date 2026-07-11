'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { MapPin } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';

export function LocationSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.location-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="py-24 px-6 relative w-full flex flex-col items-center justify-center bg-theme-primary"
    >
      <div className="location-card max-w-lg w-full flex flex-col items-center text-center p-10 rounded-2xl border border-theme-gold/20 bg-theme-accent/5 backdrop-blur-sm">
        <div className="w-16 h-16 rounded-full bg-theme-accent/20 flex items-center justify-center mb-6">
          <MapPin className="w-8 h-8 text-theme-gold" />
        </div>
        
        <h2 className="font-display text-4xl text-theme-secondary mb-4">Ubicación</h2>
        <p className="font-serif text-lg text-theme-secondary/80 mb-8 max-w-sm">
          {invitationConfig.event.locationName}
        </p>

        <a 
          href={invitationConfig.event.locationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 rounded-full bg-theme-gold text-theme-primary hover:bg-white transition-colors duration-300 font-sans tracking-widest text-xs uppercase font-bold shadow-[0_0_15px_rgba(192,192,192,0.3)]"
        >
          Ver en el mapa
        </a>
      </div>
    </section>
  );
}
