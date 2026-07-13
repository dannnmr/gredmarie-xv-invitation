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
      className="py-4 px-4 relative w-full bg-transparent overflow-hidden flex flex-col items-center"
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

      <div className="relative z-10 text-center mb-12 flex items-start justify-center w-full">
        {/* Encabezado Outline (Estilo Evento) */}
        <span 
          className="font-display text-[4rem] md:text-[6rem] text-transparent leading-[0.85] z-0 tracking-wider text-center drop-shadow-md"
          style={{ WebkitTextStroke: '0.5px rgba(220,220,220,0.9)' }} 
        >
          Itinerario
        </span>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-2 md:px-6">
        {/* Resplandor central detrás de la línea */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[50vw] max-w-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] -translate-x-1/2 pointer-events-none z-0"></div>
        
        {/* Línea central guía */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 z-0"></div>
        {/* Línea animada (progreso) */}
        <div ref={lineRef} className="absolute left-1/2 top-0 w-[2px] bg-theme-gold -translate-x-1/2 shadow-[0_0_8px_#C0C0C0]"></div>

        <div className="flex flex-col gap-4 md:gap-8">
          {itinerary.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            const Icon = (IconMap as any)[item.icon || 'sparkles'] || Sparkles;

            return (
              <div key={idx} className="itinerary-block relative flex w-full items-center justify-between">
                
                {/* Contenido Izquierda */}
                <div className={`w-1/2 pr-8 md:pr-16 ${isLeft ? 'text-right' : 'opacity-0 invisible'}`}>
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
                <div className={`w-1/2 pl-8 md:pl-16 ${!isLeft ? 'text-left' : 'opacity-0 invisible'}`}>
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
