'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { invitationConfig } from '@/config/invitation.config';

import baseImg from '../../../public/invitation/sobre_completo_gredmarie.png';
import leftFlapImg from '../../../public/invitation/sobre_lado_izquierdo_gredmarie.webp';
import rightFlapImg from '../../../public/invitation/sobre_lado_derecho_gredmarie.webp';
import sealImg from '../../../public/invitation/broche_gredmarie.png';

interface EnvelopeProps {
  isOpen: boolean;
  onOpen: () => void;
  onStartOpen: () => void;
}

export function EnvelopeScreen({ isOpen, onOpen, onStartOpen }: EnvelopeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const baseEnvelopeRef = useRef<HTMLDivElement>(null);
  const leftFlapRef = useRef<HTMLDivElement>(null);
  const rightFlapRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLButtonElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useGSAP(() => {
    // Animación continua del sello (pulse y rotación suave)
    if (!isAnimating && sealRef.current) {
      gsap.to(sealRef.current, {
        scale: 1.03,
        rotation: 1,
        duration: 2.2,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
      });
      gsap.to(sealRef.current, {
        rotation: -1,
        duration: 4.5,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
        delay: 1,
      });
    }

    // Animación continua del texto "Toca para abrir"
    if (!isAnimating && hintRef.current) {
      gsap.fromTo(hintRef.current, 
        { opacity: 0.3 },
        { opacity: 0.7, duration: 1.4, yoyo: true, repeat: -1, ease: 'power1.inOut' }
      );
    }
  }, { scope: containerRef, dependencies: [isAnimating] });

  // REGLA DE REACT: Los retornos anticipados (early returns) SIEMPRE van DESPUÉS de los hooks.
  // Si ya está abierto globalmente desde el inicio, no renderizamos el sobre.
  if (isOpen && !isAnimating) return null;

  const handleOpen = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    onStartOpen();

    const tl = gsap.timeline({
      onComplete: () => {
        onOpen(); // Desmonta el sobre globalmente
        setIsAnimating(false);
      }
    });

    // Detener animaciones continuas (yoyo) para evitar que reactiven la opacidad/escala
    if (hintRef.current) gsap.killTweensOf(hintRef.current);
    if (sealRef.current) gsap.killTweensOf(sealRef.current);

    // Desaparece el texto
    if (hintRef.current) {
      tl.to(hintRef.current, { opacity: 0, duration: 0.3 }, 0);
    }

    // Sello se agranda y desaparece
    if (sealRef.current) {
      tl.to(sealRef.current, {
        scale: 1.8,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in'
      }, 0);
    }

    // El fondo del sobre se desvanece rápido
    if (baseEnvelopeRef.current) {
      tl.to(baseEnvelopeRef.current, {
        opacity: 0,
        duration: 0.1,
      }, 0.2);
    }

    // Las solapas se deslizan hacia los lados (como puertas correderas)
    // Se usa 120vw en lugar de 100% para compensar el scale-[1.15] de la imagen interna
    if (leftFlapRef.current) {
      tl.to(leftFlapRef.current, {
        x: '-120vw',
        duration: 1.5,
        ease: 'power3.inOut'
      }, 0.1);
    }

    if (rightFlapRef.current) {
      tl.to(rightFlapRef.current, {
        x: '120vw',
        duration: 1.5,
        ease: 'power3.inOut'
      }, 0.1);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] w-[100vw] h-[100vh] min-h-[100vh] flex items-center justify-center overflow-hidden pointer-events-auto bg-transparent"
    >
      {/* Background Sobre Completo */}
      <div 
        ref={baseEnvelopeRef}
        className="absolute inset-0 w-full h-full min-h-[100vh] z-20 pointer-events-none"
      >
        <Image 
          src={baseImg} 
          placeholder="blur"
          alt="Sobre" 
          fill 
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.15]"
        />
      </div>

      {/* Left Envelope */}
      <div 
        ref={leftFlapRef}
        className="absolute inset-0 w-full h-full min-h-[100vh] z-10 pointer-events-none"
      >
        <Image 
          src={leftFlapImg} 
          placeholder="blur"
          alt="Solapa Izquierda" 
          fill 
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.15]"
        />
      </div>

      {/* Right Envelope */}
      <div 
        ref={rightFlapRef}
        className="absolute inset-0 w-full h-full min-h-[100vh] z-10 pointer-events-none"
      >
        <Image 
          src={rightFlapImg} 
          placeholder="blur"
          alt="Solapa Derecha" 
          fill 
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.15]"
        />
      </div>

      {/* Seal / Clasp */}
      <button 
        ref={sealRef}
        onClick={handleOpen}
        className="absolute z-30 w-[300px] h-[300px] flex items-center justify-center cursor-pointer border-none bg-transparent drop-shadow-[0_10px_15px_rgba(0,0,0,0.2)]"
      >
        <Image 
          src={sealImg} 
          placeholder="blur"
          alt="Abrir Invitación" 
          fill 
          priority
          quality={100}
          sizes="(max-width: 768px) 300px, 300px"
          className="object-contain"
        />
      </button>

      {/* Hint de interacción */}
      <p
        ref={hintRef}
        className="absolute bottom-[10%] left-0 w-full text-center z-30 font-sans text-[0.7rem] text-theme-gold tracking-[0.2em] uppercase pointer-events-none"
      >
        Toca para abrir
      </p>
    </div>
  );
}
