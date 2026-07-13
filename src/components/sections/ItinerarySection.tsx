'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import { Sparkles, Martini, Heart, Camera, Utensils, Music, Cake } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';
import { Sparkle } from '@/components/ui/Sparkle';
import { FairyDust } from '@/components/ui/FairyDust';

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
      const content = block.querySelectorAll('.itinerary-content');
      const scrubTargets = block.querySelectorAll('.itinerary-circle, .itinerary-image');

      if (content.length) {
        gsap.from(content, {
          scrollTrigger: {
            trigger: block,
            start: 'top 85%',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      }

      if (scrubTargets.length) {
        gsap.from(scrubTargets, {
          scrollTrigger: {
            trigger: block,
            start: 'top 90%',
            end: 'top 50%',
            scrub: 1,
          },
          scale: 0,
          opacity: 0.2,
          ease: 'power1.out',
          stagger: 0.1
        });
      }
    });

  }, { scope: containerRef });

  const { itinerary } = invitationConfig;

  return (
    <section 
      ref={containerRef}
      className="py-20 md:py-32 px-4 relative w-full bg-transparent overflow-hidden flex flex-col items-center"
    >
      {/* Fondo de flores azules muy sutil */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-screen">
        <Image
          src="/decoration/tunel_luces.png"
          alt="Fondo flores azules"
          fill
          className="object-cover"
        />
      </div>

      {/* Sparkles Decorativos */}
      <FairyDust count={20} />
      <Sparkle className="top-[5%] left-[5%] w-12 md:w-16 opacity-60" delay={0.5} speed={15} />
      <Sparkle className="top-[40%] right-[2%] md:right-[5%] w-8 md:w-12 opacity-40" delay={1.5} speed={25} reverse />
      <Sparkle className="bottom-[15%] left-[10%] w-16 md:w-20 opacity-30" delay={0.2} speed={20} />
      <Sparkle className="bottom-[5%] right-[15%] w-10 md:w-14 opacity-50" delay={2} speed={18} reverse />

      <div className="relative z-10 text-center mb-16 md:mb-24 flex items-start justify-center w-full">
        {/* Encabezado Outline (Estilo Evento) */}
        <span 
          className="font-display text-[4rem] md:text-[6rem] text-transparent leading-[0.85] z-0 tracking-wider text-center drop-shadow-md"
          style={{ WebkitTextStroke: '0.5px rgba(220,220,220,0.9)' }} 
        >
          Itinerario
        </span>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-2 md:px-6">
        <div className="relative flex flex-col gap-6 md:gap-12 w-full">
          {/* Resplandor central detrás de la línea */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[50vw] max-w-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] -translate-x-1/2 pointer-events-none z-0"></div>
          
          {/* Línea central guía */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 z-0"></div>
          {/* Línea animada (progreso) */}
          <div ref={lineRef} className="absolute left-8 md:left-1/2 top-0 w-[2px] bg-theme-gold -translate-x-1/2 shadow-[0_0_8px_#C0C0C0] z-[1]"></div>

          {itinerary.map((item, idx) => {
            const isDesktopLeft = idx % 2 === 0;

            return (
              <div key={idx} className="itinerary-block relative flex w-full items-center justify-between">
                
                {/* Contenido Izquierda (Desktop ONLY) */}
                <div className={`itinerary-content hidden md:flex w-1/2 pr-12 items-center justify-end gap-6 ${isDesktopLeft ? '' : 'opacity-0 invisible'}`}>
                  {isDesktopLeft && (
                    <>
                      <div className="flex-1 flex flex-col items-end">
                        <div className="w-full flex items-center justify-end gap-3 mb-1">
                          <h3 className="font-serif text-3xl text-theme-gold">{item.time}</h3>
                          <div className="flex-1 border-b-[1.5px] border-dotted border-white/30 mx-2"></div>
                          <h4 className="font-sans text-base tracking-widest uppercase text-theme-secondary font-bold">{item.title}</h4>
                        </div>
                        <p className="font-sans text-sm text-theme-secondary/70 text-right">{item.description}</p>
                      </div>
                      <div className="itinerary-image relative w-20 h-20 shrink-0">
                        {(item as any).image && <Image src={(item as any).image} alt={item.title} fill className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />}
                      </div>
                    </>
                  )}
                </div>

                {/* Punto central animado */}
                <div className="itinerary-circle absolute left-8 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#A9CCE3] shadow-[0_0_15px_rgba(169,204,227,0.8)] z-20"></div>

                {/* Contenido Derecha (Mobile ALL, Desktop RIGHT) */}
                <div className={`itinerary-content flex w-full md:w-1/2 pl-[4.5rem] md:pl-12 items-center justify-start ${isDesktopLeft ? 'md:opacity-0 md:invisible' : ''}`}>
                  <div className="flex w-full items-center justify-start gap-3 md:gap-6">
                    <div className="itinerary-image relative w-12 h-12 md:w-20 md:h-20 shrink-0">
                      {(item as any).image && <Image src={(item as any).image} alt={item.title} fill className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />}
                    </div>
                    <div className="flex-1 flex flex-col items-start">
                      <div className="w-full flex items-center justify-start gap-2 mb-1">
                        <h4 className="font-sans text-xs md:text-base tracking-widest uppercase text-theme-secondary font-bold whitespace-nowrap">{item.title}</h4>
                        <div className="flex-1 border-b-[1.5px] border-dotted border-white/30 min-w-[10px]"></div>
                        <h3 className="font-serif text-lg md:text-3xl text-theme-gold whitespace-nowrap">{item.time}</h3>
                      </div>
                      <p className="font-sans text-[11px] md:text-sm text-theme-secondary/70 leading-relaxed text-left">{item.description}</p>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
