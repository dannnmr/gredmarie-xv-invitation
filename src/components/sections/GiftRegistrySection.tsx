'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Gift } from 'lucide-react';
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

  const { giftRegistry } = invitationConfig;

  return (
    <section 
      ref={containerRef}
      className="py-24 px-6 relative w-full flex flex-col items-center text-center bg-theme-primary"
    >
      <div className="gift-element w-16 h-16 rounded-full bg-theme-gold/10 flex items-center justify-center mb-8 border border-theme-gold/30">
        <Gift className="w-8 h-8 text-theme-gold" />
      </div>

      <h2 className="gift-element font-display text-4xl md:text-5xl text-theme-secondary mb-6 drop-shadow-[0_0_10px_rgba(192,192,192,0.2)]">
        Mesa de Regalos
      </h2>
      
      <p className="gift-element font-sans text-sm md:text-base leading-relaxed text-theme-secondary/80 max-w-md mb-10">
        {giftRegistry.message}
      </p>

      {giftRegistry.qrImage && (
        <div className="gift-element relative w-48 h-48 md:w-56 md:h-56 p-4 bg-white rounded-2xl shadow-[0_0_30px_rgba(30,58,138,0.3)]">
          {/* El div blanco hace de fondo para el QR */}
          <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 font-sans text-xs text-center px-4">
            [ Imagen del Código QR ]<br/>Reemplazar en /public/images
          </div>
          {/* Cuando tengas la imagen real, descomenta esto:
          <Image 
            src={giftRegistry.qrImage} 
            alt="Código QR para regalo" 
            fill 
            className="object-contain p-4"
          /> 
          */}
        </div>
      )}
    </section>
  );
}
