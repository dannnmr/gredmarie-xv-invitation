  'use client';

  import { useRef, useState, useEffect } from 'react';
  import Image from 'next/image';
  import { useGSAP } from '@gsap/react';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
  import { FairyDust } from '@/components/ui/FairyDust';
  import portraitImg from '../../../public/decoration/foto_gredmarie.jpg';

  const EightPointStarSVG = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,0 51.9,45.4 67.7,32.3 54.6,48.1 100,50 54.6,51.9 67.7,67.7 51.9,54.6 50,100 48.1,54.6 32.3,67.7 45.4,51.9 0,50 45.4,48.1 32.3,32.3 48.1,45.4" fill="white" />
    </svg>
  );

  const HollowStarSVG = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="white" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,5 61,35 95,35 68,54 78,85 50,65 22,85 32,54 5,35 39,35" strokeLinejoin="round" />
    </svg>
  );

  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  export function PortraitSection() {
    const containerRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
      // 1. Oscurecimiento dinámico global (se mantiene con scrub para el scroll)
      gsap.to('.scroll-dim', {
        opacity: 0.85,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        }
      });

      // 2. Timeline de entrada coordinada y óptima
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%', // Inicia de forma elegante cuando entra en pantalla
        }
      });

      // A. Aparece el brillo de fondo
      tl.fromTo('.portrait-glow-bg',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
      )
      // B. Aparece la foto principal deslizando hacia arriba
      .fromTo(imageRef.current,
        { opacity: 0, y: 100, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power3.out' },
        '-=1' // Se solapa con el fondo
      )
      // C. Aparece la bola de disco haciendo un pop
      .fromTo('.portrait-disco-ball',
        { opacity: 0, scale: 0.2, rotation: -30 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.5)' },
        '-=1'
      )
      // D. Aparecen las estrellas escalonadas (stagger)
      .fromTo('.animated-star',
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'back.out(2)',
          onComplete: () => {
            // UNA VEZ QUE ENTRAN, inician su animación infinita (mejora rendimiento)
            gsap.to('.animated-star', {
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                toggleActions: 'play pause resume pause',
              },
              opacity: 0.4,
              scale: 1.3,
              duration: 'random(0.8, 1.8)',
              yoyo: true,
              repeat: -1,
              ease: 'power1.inOut',
              stagger: { each: 0.15, from: 'random' }
            });

            gsap.to('.animated-star-float', {
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                toggleActions: 'play pause resume pause',
              },
              y: '-=15',
              x: 'random(-5, 5)',
              rotation: 'random(-15, 15)',
              duration: 'random(2.5, 4)',
              yoyo: true,
              repeat: -1,
              ease: 'sine.inOut',
              stagger: { each: 0.3, from: 'random' }
            });
          }
        },
        '-=0.5'
      );

    }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="py-10 md:py-16 relative w-full flex flex-col items-center justify-center bg-transparent overflow-hidden"
    >
      {/* Capa de oscurecimiento */}
      <div className="scroll-dim absolute inset-0 bg-[#010308] z-[-1] pointer-events-none"></div>

      {/* Fondo de Luces Brillantes (detrás de la foto) */}
      <div className="portrait-glow-bg absolute inset-0 z-0 opacity-80 pointer-events-none">
        <Image
          src="/decoration/luces_brill.png"
          alt="Luces brillantes"
          fill
          sizes="100vw"
          className="object-cover mix-blend-screen"
        />
      </div>

      {/* Polvo de estrellas restaurado */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-100">
        <FairyDust count={120} />
      </div>

      {/* Contenedor Principal de la Foto */}
      <div className="relative z-10 w-full max-w-[280px] md:max-w-[340px] mx-auto mt-8 md:mt-12">
        
        {/* Estrellas decorativas SVG */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Arriba izquierda */}
          <EightPointStarSVG className="animated-star animated-star-float absolute top-[2%] left-[-15%] w-7 h-7 drop-shadow-[0_0_8px_white]" />
          
          {/* Medio y abajo izquierda */}
          <HollowStarSVG className="animated-star animated-star-float absolute bottom-[10%] left-[-10%] w-8 h-8 drop-shadow-[0_0_6px_white]" />
          <EightPointStarSVG className="animated-star animated-star-float absolute bottom-[-5%] left-[15%] w-7 h-7 drop-shadow-[0_0_8px_white]" />

          {/* Arriba derecha */}
          <EightPointStarSVG className="animated-star animated-star-float absolute top-[-5%] right-[10%] w-8 h-8 drop-shadow-[0_0_8px_white]" />
          <HollowStarSVG className="animated-star animated-star-float absolute top-[20%] right-[-15%] w-7 h-7 drop-shadow-[0_0_6px_white]" />

          {/* Medio y abajo derecha */}
          <EightPointStarSVG className="animated-star animated-star-float absolute top-[55%] right-[-20%] w-6 h-6 drop-shadow-[0_0_10px_white]" />
          <EightPointStarSVG className="animated-star animated-star-float absolute bottom-[-15%] right-[-15%] w-7 h-7 drop-shadow-[0_0_10px_white]" />
        </div>

        {/* Marco Arch con Doble Borde plateado luminoso */}
        <div 
          ref={imageRef}
          className="relative w-full aspect-[3/4] rounded-t-full rounded-b-[2rem] border-[1.5px] border-white/80 shadow-[0_0_20px_rgba(255,255,255,0.4)] p-1.5 md:p-2 bg-transparent"
        >
          <div className="relative w-full h-full overflow-hidden rounded-t-full rounded-b-[1.7rem] border-[1px] border-white/50">
            <div className="relative w-full h-full bg-[#010308]">
              <Image
                src={portraitImg}
                placeholder="blur"
                alt="Portrait"
                fill
                className="object-cover transition-transform duration-[10s] hover:scale-110"
                sizes="(max-width: 768px) 280px, 340px"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#010308]/90 via-[#010308]/10 to-transparent pointer-events-none z-10" />
            </div>
          </div>
        </div>

        {/* Bola de disco giratoria en la esquina inferior izquierda */}
        <div className="portrait-disco-ball absolute -bottom-6 -left-10 md:-bottom-12 md:-left-16 z-30 pointer-events-none w-24 md:w-36 drop-shadow-[0_0_20px_rgba(135,206,235,0.4)]">
          <Image 
            src="/hero/bolas_disco_azul.png" 
            alt="Bola de disco azul" 
            width={200} 
            height={200} 
            className="object-contain w-full h-auto animate-[spin_40s_linear_infinite]" 
          />
        </div>
      </div>
    </section>
  );
}
