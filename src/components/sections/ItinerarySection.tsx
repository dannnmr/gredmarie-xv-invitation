'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Sparkles, Martini, Heart, Camera, Utensils, Music, Cake } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const IconMap = {
  sparkles: Sparkles,
  martini: Martini,
  heart: Heart,
  camera: Camera,
  utensils: Utensils,
  music: Music,
  cake: Cake,
};

export function ItinerarySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animar la línea central creciendo hacia abajo
    gsap.fromTo(lineRef.current, 
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
          end: 'bottom 80%',
          scrub: true,
        }
      }
    );

    // Animar cada bloque del itinerario
    const blocks = gsap.utils.toArray('.itinerary-block');
    blocks.forEach((block: any) => {
      gsap.from(block, {
        scrollTrigger: {
          trigger: block,
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

  }, { scope: containerRef });

  const { itinerary } = invitationConfig;

  return (
    <section 
      ref={containerRef}
      className="py-24 px-6 relative w-full bg-theme-primary"
    >
      <div className="text-center mb-20">
        <h2 className="font-display text-5xl md:text-6xl text-theme-gold drop-shadow-[0_0_15px_rgba(192,192,192,0.3)]">
          Itinerario
        </h2>
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Línea central guía */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-theme-secondary/10 -translate-x-1/2"></div>
        {/* Línea animada (progreso) */}
        <div ref={lineRef} className="absolute left-1/2 top-0 w-[2px] bg-theme-gold -translate-x-1/2 shadow-[0_0_8px_#C0C0C0]"></div>

        <div className="flex flex-col gap-12 md:gap-20">
          {itinerary.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            const Icon = (IconMap as any)[item.icon || 'sparkles'] || Sparkles;

            return (
              <div key={idx} className="itinerary-block relative flex w-full items-center justify-between">
                
                {/* Contenido Izquierda */}
                <div className={`w-[45%] ${isLeft ? 'text-right' : 'opacity-0 invisible'}`}>
                  {isLeft && (
                    <>
                      <h3 className="font-serif text-2xl md:text-3xl text-theme-secondary">{item.time}</h3>
                      <h4 className="font-sans text-xs md:text-sm tracking-widest uppercase text-theme-gold mt-1">{item.title}</h4>
                      <p className="font-sans text-xs text-theme-secondary/60 mt-2">{item.description}</p>
                    </>
                  )}
                </div>

                {/* Ícono central */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-theme-primary border border-theme-gold flex items-center justify-center z-10 shadow-[0_0_15px_rgba(192,192,192,0.2)]">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-theme-secondary" />
                </div>

                {/* Contenido Derecha */}
                <div className={`w-[45%] ${!isLeft ? 'text-left' : 'opacity-0 invisible'}`}>
                  {!isLeft && (
                    <>
                      <h3 className="font-serif text-2xl md:text-3xl text-theme-secondary">{item.time}</h3>
                      <h4 className="font-sans text-xs md:text-sm tracking-widest uppercase text-theme-gold mt-1">{item.title}</h4>
                      <p className="font-sans text-xs text-theme-secondary/60 mt-2">{item.description}</p>
                    </>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
