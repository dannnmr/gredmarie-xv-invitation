'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollMovingElementProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Dirección en la que se moverá el elemento */
  direction?: 'left-to-right' | 'right-to-left';
  /** Valor bottom en px o % */
  bottomOffset?: string;
  className?: string;
}

/**
 * Componente reutilizable para mover un elemento horizontalmente a través de la pantalla
 * basado en el progreso del scroll. Ideal para taxis, aviones, nubes, etc.
 */
export function ScrollMovingElement({ 
  src, 
  alt, 
  width, 
  height, 
  direction = 'left-to-right',
  bottomOffset = '20px',
  className = ''
}: ScrollMovingElementProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const isLTR = direction === 'left-to-right';
    
    gsap.fromTo(elementRef.current,
      { x: isLTR ? '-100vw' : '100vw' },
      {
        x: isLTR ? '100vw' : '-100vw',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom', // Inicia cuando la sección entra por debajo
          end: 'bottom top',   // Termina cuando la sección sale por arriba
          scrub: 1.5,          // Suavidad del movimiento atado al scroll
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`absolute w-full h-full pointer-events-none z-10 overflow-hidden ${className}`}>
      <div 
        ref={elementRef}
        className="absolute"
        style={{ 
          bottom: bottomOffset,
          width: `${width}px`,
          height: `${height}px`,
          left: direction === 'left-to-right' ? 0 : 'auto',
          right: direction === 'right-to-left' ? 0 : 'auto',
        }}
      >
        <Image 
          src={src} 
          alt={alt} 
          fill 
          sizes={`(max-width: 768px) ${width}px, ${width}px`}
          className="object-contain" 
        />
      </div>
    </div>
  );
}
