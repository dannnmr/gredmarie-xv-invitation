'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Gift, Download, Maximize2, X } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';
import Image from 'next/image';

export function GiftRegistrySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.gift-element', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  const [isExpanded, setIsExpanded] = useState(false);
  const { giftRegistry, assets } = invitationConfig;
  const qrUrl = (assets.info as any)?.qr || giftRegistry.qrImage;

  return (
    <section 
      ref={containerRef}
      className="py-24 px-6 relative w-full flex flex-col items-center text-center bg-theme-primary overflow-hidden"
    >
      <div className="absolute inset-0 bg-theme-accent/5 z-0"></div>

      {/* Decoración de flores blancas de fondo */}
      <div className="absolute bottom-[-5%] left-[-5%] opacity-20 w-32 md:w-48 pointer-events-none z-0 rotate-12">
        <Image src="/decoration/flor_blanca.png" alt="Flor Blanca" width={200} height={200} className="object-contain" />
      </div>
      <div className="absolute top-[10%] right-[-5%] opacity-20 w-24 md:w-32 pointer-events-none z-0 -rotate-12">
        <Image src="/decoration/flor_blanca.png" alt="Flor Blanca" width={150} height={150} className="object-contain" />
      </div>

      <div className="gift-element relative z-10 w-16 h-16 rounded-full bg-theme-gold/10 flex items-center justify-center mb-8 border border-theme-gold/30">
        <Gift className="w-8 h-8 text-theme-gold" />
      </div>

      <h2 className="gift-element font-display text-4xl md:text-5xl text-theme-secondary mb-6 drop-shadow-[0_0_10px_rgba(192,192,192,0.2)]">
        Mesa de Regalos
      </h2>
      
      <p className="gift-element font-sans text-sm md:text-base leading-relaxed text-theme-secondary/80 max-w-md mb-10">
        {giftRegistry.message}
      </p>

      {qrUrl && (
        <div className="relative z-50 pointer-events-auto">
          <div className="gift-element flex flex-col items-center group">
            <button 
              onClick={() => setIsExpanded(true)}
              className="relative w-48 h-48 md:w-56 md:h-56 p-2 bg-white rounded-2xl shadow-[0_0_30px_rgba(30,58,138,0.3)] cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-105 border-4 border-theme-gold/20 block"
            >
              <Image 
                src={qrUrl} 
                alt="Código QR para regalo" 
                fill 
                sizes="(max-width: 768px) 192px, 224px"
                className="object-cover rounded-xl pointer-events-none"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-2xl pointer-events-none">
                <Maximize2 className="text-white w-8 h-8" />
              </div>
            </button>
            
            <a
              href={qrUrl}
              download="qr_regalo.jpeg"
              className="mt-6 relative z-50 flex items-center justify-center gap-2 text-theme-gold hover:text-white transition-colors duration-300 font-sans text-xs tracking-widest uppercase cursor-pointer"
            >
              <Download className="w-4 h-4 pointer-events-none" />
              Descargar QR
            </a>
          </div>

          {/* Modal del QR */}
          {isExpanded && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm transition-opacity">
              <button 
                onClick={() => setIsExpanded(false)}
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-4"
              >
                <X className="w-8 h-8 pointer-events-none" />
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
                  className="mt-6 py-4 px-6 bg-theme-primary text-theme-gold flex items-center justify-center gap-2 rounded-xl font-sans text-xs tracking-widest uppercase font-bold hover:bg-black transition-colors w-full border border-theme-gold/30 cursor-pointer"
                >
                  <Download className="w-4 h-4 pointer-events-none" />
                  Descargar Imagen
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
