'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { MapPin } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';
import flowersBgImg from '../../../public/decoration/flores_azules_fondo.png';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const MixedTypoAuto = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, wIdx) => {
        let targetIdx = word.length > 3 ? 2 : 1;
        if (word.length <= 1) targetIdx = -1;
        return (
          <span key={wIdx} className="inline-block">
            {word.split('').map((char, cIdx) => {
              const isLetter = /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(char);
              if (cIdx === targetIdx && isLetter) {
                return (
                  <span key={cIdx} className="font-serif italic lowercase text-[1.2em] mx-[0.05em] opacity-90 inline-block transform -rotate-2">
                    {char}
                  </span>
                );
              }
              return <span key={cIdx}>{char}</span>;
            })}
            {wIdx < words.length - 1 ? '\u00A0' : ''}
          </span>
        );
      })}
    </span>
  );
};

export function LocationSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    gsap.fromTo('.loc1-anim', 
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 80%' } }
    );
    gsap.fromTo('.loc1-anim-right', 
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 80%' } }
    );
    // Rotación infinita optimizada
    gsap.to('.rotating-text-1', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        toggleActions: 'play pause resume pause',
      },
      rotation: 360,
      duration: 25,
      repeat: -1,
      ease: 'none'
    });

    // Parallax on the flower to make it feel more dynamic
    gsap.to('.flower-parallax', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      y: -50,
      ease: 'none'
    });

  }, { scope: containerRef });

  const { locationName, locationAddress, locationUrl } = invitationConfig.event as any;
  const venueTitle = locationName.split('(')[0].trim();
  const venueSubtitle = locationName.includes('(') ? locationName.split('(')[1].replace(')', '').trim() : 'Recepción del Evento';

  return (
    <section ref={containerRef} className="py-24 px-6 relative w-full flex flex-col items-center bg-transparent overflow-hidden">
      
      {/* Imagen completa en el fondo, cubriendo todo */}
      <div className="absolute inset-0 opacity-20 w-full h-full pointer-events-none z-0 flower-parallax">
        <Image 
          src={flowersBgImg} 
          placeholder="blur"
          alt="Decoración Ubicación" 
          fill
          sizes="100vw"
          className="object-cover object-center" 
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Massive Text */}
        <div className="md:col-span-8 flex flex-col items-start text-left relative loc1-anim">
          <h3 className="font-serif italic text-[3rem] md:text-[5rem] text-white leading-none z-10 drop-shadow-md">
            Recepción &
          </h3>
          <div className="relative flex items-start mt-[-1rem] md:mt-[-2rem]">
            <span 
              className="font-display text-[6.5rem] md:text-[13rem] text-transparent leading-none z-0 tracking-wider" 
              style={{ WebkitTextStroke: '0.5px rgba(220,220,220,0.9)' }}
            >
              Evento
            </span>
          </div>
          <h2 className="font-sans text-[1.5rem] md:text-[2.5rem] tracking-[0.3em] md:tracking-[0.5em] text-white uppercase mt-[-1rem] md:mt-[-2rem] z-10 font-light drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] pl-2">
            <MixedTypoAuto text={venueTitle} />
          </h2>
        </div>

        {/* Right Side: Narrow Details */}
        <div className="md:col-span-4 flex justify-start md:justify-end loc1-anim-right w-full">
          <div className="flex border-l border-theme-gold/40 pl-6 flex-col max-w-[280px] md:max-w-xs items-start">
            <h3 className="font-sans text-theme-secondary text-[1rem] md:text-[1.1rem] font-light tracking-[0.1em] uppercase mb-2">
              {venueSubtitle}
            </h3>
            <p className="font-sans text-white/60 text-[0.85rem] md:text-[0.9rem] leading-[1.6] tracking-[0.05em] mb-8">
              {locationAddress}
            </p>
            
            {/* Botón perfectamente alineado a la izquierda del contenedor de texto */}
            <a 
              href={locationUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative block outline-none cursor-pointer mt-4"
            >
              <div className="relative w-[115px] h-[115px] flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                
                {/* SVG de Texto Rotativo (Cerca del borde) */}
                <svg viewBox="0 0 100 100" className="rotating-text-1 absolute inset-0 w-full h-full pointer-events-none">
                  <path id="circlePath1" d="M 50, 50 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" fill="transparent" />
                  <text className="text-[7.6px] fill-theme-gold font-sans tracking-[0.35em] uppercase font-bold">
                    <textPath href="#circlePath1" startOffset="0%">
                      VER EN GOOGLE MAPS • RUTA AL EVENTO • 
                    </textPath>
                  </text>
                </svg>

                {/* Círculo interno con borde y fondo */}
                <div className="relative w-[82px] h-[82px] rounded-full border border-white/30 flex items-center justify-center text-theme-gold bg-black/40 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3)] group-hover:bg-white/10 group-hover:border-theme-gold/60 transition-colors">
                  <MapPin size={28} strokeWidth={1.5} className="text-white group-hover:text-theme-gold transition-colors" />
                </div>
                
              </div>
            </a>
            
          </div>
        </div>

      </div>
      
      {/* Degradado inferior para transicionar al Dress Code */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80%] md:w-[60%] h-[300px] bg-[radial-gradient(ellipse,_rgba(30,58,138,0.2)_0%,_transparent_70%)] blur-[40px] z-0 pointer-events-none" />

    </section>
  );
}
