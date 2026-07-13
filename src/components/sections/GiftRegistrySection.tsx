'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { invitationConfig } from '@/config/invitation.config';
import { FairyDust } from '@/components/ui/FairyDust';
import { Download } from 'lucide-react';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export function GiftRegistrySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const { giftRegistry, assets } = invitationConfig;
  const qrUrl = (assets.info as any)?.qr || giftRegistry.qrImage;

  useGSAP(() => {
    gsap.fromTo('.gift-title', 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 80%' } }
    );
    gsap.fromTo(cardRef.current, 
      { opacity: 0, scale: 0.9, rotationY: -15 }, 
      { opacity: 1, scale: 1, rotationY: 0, duration: 1.5, delay: 0.3, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 80%' } }
    );
  }, { scope: containerRef });

  const handleFlip = () => {
    if (gsap.isTweening(cardRef.current) || gsap.isTweening(flapRef.current)) return;
    
    const tl = gsap.timeline();
    
    if (!isFlipped) {
      setIsFlipped(true);
      // Abrir flap, luego girar tarjeta
      tl.to(flapRef.current, { rotateX: 180, duration: 0.6, ease: 'power2.inOut', transformOrigin: 'top center' })
        .to(cardRef.current, { rotateY: 180, duration: 0.8, ease: 'power3.inOut' }, '+=0.1');
    } else {
      setIsFlipped(false);
      // Girar tarjeta de vuelta, luego cerrar flap
      tl.to(cardRef.current, { rotateY: 0, duration: 0.8, ease: 'power3.inOut' })
        .to(flapRef.current, { rotateX: 0, duration: 0.6, ease: 'power2.inOut', transformOrigin: 'top center' }, '-=0.2');
    }
  };

  return (
    <>
    <section 
      ref={containerRef}
      className="relative w-full py-20 px-6 flex flex-col items-center justify-center bg-transparent overflow-hidden"
    >
      <FairyDust count={20} />
      
      {/* Flor blanca gigante abajo a la izquierda */}
      <div className="absolute bottom-[-10%] left-[-15%] md:left-[-5%] opacity-20 w-80 md:w-[450px] pointer-events-none z-0 mix-blend-screen">
        <Image src="/decoration/flor_blanca.png" alt="Flor Decorativa" width={500} height={500} className="object-contain grayscale w-full h-auto" />
      </div>
      <div className="absolute top-[-5%] right-[-15%] md:right-[-5%] opacity-20 w-80 md:w-[450px] pointer-events-none z-0 mix-blend-screen">
        <Image src="/decoration/flor_blanca.png" alt="Flor Decorativa" width={500} height={500} className="object-contain grayscale w-full h-auto -scale-x-100" />
      </div>

      <div className="text-center mb-10 gift-title">
        <h2 className="font-serif italic text-[2.5rem] md:text-[3.5rem] text-theme-gold mb-2 leading-none">Un detalle</h2>
        <span 
          className="font-display text-[4rem] md:text-[6.5rem] text-transparent tracking-wider leading-none block mt-[-0.5rem]" 
          style={{ WebkitTextStroke: '1px rgba(220,220,220,0.9)' }}
        >
          Especial
        </span>
      </div>

      <p className="font-sans text-white/70 text-sm md:text-base text-center max-w-md mb-12 gift-title tracking-wide leading-relaxed">
        {giftRegistry.message}
      </p>

      {/* Contenedor Interactivo */}
      <div 
        className="relative w-full max-w-[340px] aspect-[4/3] cursor-pointer group mt-4 perspective-[1500px]"
        onClick={handleFlip}
      >
        {!isFlipped && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-theme-gold/70 text-[10px] tracking-widest uppercase font-sans animate-pulse whitespace-nowrap">
            Toca el sobre para abrir
          </div>
        )}

        {/* Tarjeta Principal (con will-change para rendimiento) */}
        <div ref={cardRef} className="w-full h-full relative will-change-transform" style={{ transformStyle: 'preserve-3d' }}>
          
          {/* CARA FRONTAL: Sobre */}
          <div className="absolute inset-0 w-full h-full bg-[#161b22] border border-theme-gold/30 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex justify-center overflow-visible backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
            
            {/* Contenedor Flap que rota (Solapa + Sello) */}
            <div 
              ref={flapRef}
              className="absolute top-0 w-full h-[65%] z-30 will-change-transform" 
              style={{ transformOrigin: 'top center' }}
            >
              {/* Dibujo de la solapa triangular (Clipped) */}
              <div 
                className="absolute inset-0 bg-[#1a2028] border-b border-theme-gold/40 shadow-md"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
              ></div>

              {/* Decoración del Sello Frontal montado en la punta de la solapa */}
              <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-theme-gold flex items-center justify-center text-theme-primary border border-white/20 shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                  <span className="font-serif italic text-2xl font-bold">G</span>
                </div>
              </div>
            </div>
            
            {/* Texto de Para Ti, desaparece al girar */}
            <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-300 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
              <span className="font-sans text-theme-gold/80 text-[10px] tracking-[0.4em] uppercase">Para Ti</span>
            </div>
          </div>

          {/* CARA TRASERA: El Código QR enmarcado */}
          <div className="absolute inset-0 w-full h-full bg-[#0d1117] border border-theme-gold/20 rounded-lg flex flex-col items-center justify-center p-6 backface-hidden shadow-xl" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            
            <div className="relative p-3 w-40 h-40 group/qr">
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-[1.5px] border-l-[1.5px] border-theme-gold transition-all duration-300 group-hover/qr:-top-2 group-hover/qr:-left-2"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-[1.5px] border-r-[1.5px] border-theme-gold transition-all duration-300 group-hover/qr:-top-2 group-hover/qr:-right-2"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-[1.5px] border-l-[1.5px] border-theme-gold transition-all duration-300 group-hover/qr:-bottom-2 group-hover/qr:-left-2"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-[1.5px] border-r-[1.5px] border-theme-gold transition-all duration-300 group-hover/qr:-bottom-2 group-hover/qr:-right-2"></div>
              
              {/* QR Code interactivo (Abre modal al hacer clic) */}
              <div 
                className="relative w-full h-full bg-white p-2 rounded-sm flex items-center justify-center cursor-zoom-in group/inner transition-transform hover:scale-105"
                onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }}
              >
                <Image src={qrUrl} alt="Código QR" fill sizes="(max-width: 768px) 150px, 200px" className="object-contain p-2" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/inner:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <span className="text-white font-sans text-[8px] uppercase tracking-widest bg-black/60 px-2 py-1 rounded">Ver Mejor</span>
                </div>
              </div>
            </div>

            <a 
              href={qrUrl} 
              download="qr_regalo.jpeg" 
              onClick={(e) => e.stopPropagation()}
              className="mt-8 flex items-center gap-2 px-6 py-2 bg-transparent border border-theme-gold text-theme-gold hover:bg-theme-gold hover:text-black transition-colors rounded-full font-sans text-[9px] uppercase tracking-[0.2em]"
            >
              <Download size={12} /> Descargar QR
            </a>
          </div>

        </div>
      </div>

    </section>

      {/* Modal del QR (Fuera de la perspectiva 3D para evitar z-index issues) */}
      {isExpanded && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm transition-opacity">
          <button 
            onClick={() => setIsExpanded(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-4"
          >
            <span className="text-2xl">✕</span>
          </button>
          
          <div className="relative z-50 w-full max-w-sm aspect-square bg-white p-6 rounded-3xl shadow-2xl flex flex-col justify-center items-center pointer-events-auto">
            <div className="relative w-full h-full flex-1 pointer-events-none">
              <Image 
                src={qrUrl} 
                alt="Código QR Expandido" 
                fill 
                sizes="(max-width: 768px) 90vw, 400px"
                className="object-contain rounded-xl"
              />
            </div>
            <a
              href={qrUrl}
              download="qr_regalo.jpeg"
              className="mt-6 py-4 px-6 bg-[#161b22] text-theme-gold flex items-center justify-center gap-2 rounded-xl font-sans text-xs tracking-widest uppercase font-bold hover:bg-black transition-colors w-full border border-theme-gold/30 cursor-pointer"
            >
              <Download className="w-4 h-4 pointer-events-none" />
              Descargar Imagen
            </a>
          </div>
        </div>
      )}
    </>
  );
}
