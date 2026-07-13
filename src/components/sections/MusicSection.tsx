'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Send, CheckCircle2, RotateCw } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function MusicSection() {
  const containerRef = useRef<HTMLElement>(null);
  const vinylRef = useRef<HTMLDivElement>(null);

  const [song, setSong] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useGSAP(() => {
    // Animación de aparición de la sección
    gsap.from('.music-element', {
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

    // Animación del disco de vinilo rotando con el scroll (scrub)
    gsap.to(vinylRef.current, {
      rotate: 720,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });

  }, { scope: containerRef });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!song.trim()) {
      setError('Por favor, escribe una canción.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Simulando el envío al Webhook de Google Sheets
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setSong('');
      setTimeout(() => setIsSuccess(false), 4000);
    }, 1500);
  };

  return (
    <section 
      ref={containerRef}
      className="py-24 px-6 relative w-full flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-theme-primary to-transparent z-0"></div>

      {/* Imagen Decorativa de Fondo */}
      <div className="absolute top-[10%] left-[-40%] md:right-[5%] opacity-20 w-100 md:w-150 pointer-events-none z-0">
        <Image 
          src="/decoration/bola disco.png" 
          alt="Bola de disco" 
          width={350} 
          height={350} 
          className="object-contain grayscale mix-blend-screen w-full h-auto" 
        />
      </div>

      <div className="relative z-10 w-full max-w-[600px] flex flex-col items-center text-center">
        
        {/* Disco de Vinilo Animado */}
        <div className="music-element relative w-[100px] h-[100px] mb-8">
          <div 
            ref={vinylRef}
            className="w-full h-full rounded-full relative overflow-hidden flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.8),_0_0_20px_rgba(192,192,192,0.15)] border border-theme-gold/30"
            style={{ background: 'repeating-radial-gradient(circle, #050505 0, #111 2px, #0a0a0a 3px, #1a1a1a 4px)' }}
          >
            {/* Detalles del vinilo */}
            <div className="absolute top-3 left-5 w-2 h-2 rounded-full bg-white/10" />
            <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full border border-white/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent w-1/2" />
            
            {/* Etiqueta Central */}
            <div className="relative z-10 w-[38px] h-[38px] rounded-full flex items-center justify-center border border-white/20" style={{ background: 'linear-gradient(90deg, var(--color-theme-gold) 50%, #222 50%)' }}>
              <div className="w-[10px] h-[10px] rounded-full bg-theme-primary border border-white/40" />
            </div>
          </div>
        </div>

        <span className="music-element font-sans text-[0.65rem] tracking-[0.3em] uppercase font-bold text-theme-primary bg-theme-gold px-4 py-1.5 rounded-full mb-4">
          Playlist
        </span>
        
        <h2 className="music-element font-display text-5xl md:text-6xl text-theme-secondary mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          Música
        </h2>
        
        <p className="music-element font-sans text-sm md:text-base leading-relaxed text-theme-secondary/70 max-w-sm mx-auto mb-10">
          ¿Qué canción no puede faltar en la fiesta? ¡Ayúdame a armar el mejor playlist!
        </p>

        {/* Input Formulario Redondeado */}
        <form onSubmit={handleSubmit} className="music-element w-full max-w-[400px] flex flex-col gap-3">
          <div className="flex items-center bg-white/5 border border-theme-gold/40 rounded-[50px] p-1.5 pl-6 shadow-[0_8px_25px_rgba(0,0,0,0.5),_inset_0_0_15px_rgba(192,192,192,0.05)] backdrop-blur-md">
            <input 
              type="text" 
              value={song}
              onChange={(e) => setSong(e.target.value)}
              placeholder="Ej. Tití Me Preguntó..."
              disabled={isSubmitting || isSuccess}
              className="flex-1 bg-transparent border-none outline-none text-theme-secondary font-sans text-sm placeholder:text-theme-secondary/30"
            />
            
            <button 
              type="submit" 
              disabled={isSubmitting || isSuccess}
              className={`w-[45px] h-[45px] rounded-full flex items-center justify-center transition-all duration-300 ${
                (isSubmitting || isSuccess) 
                  ? 'bg-theme-secondary/20 text-theme-secondary/50 cursor-not-allowed shadow-none' 
                  : 'bg-theme-gold text-theme-primary hover:bg-white shadow-[0_0_15px_rgba(192,192,192,0.3)] hover:scale-105'
              }`}
            >
              {isSubmitting ? (
                <RotateCw className="w-5 h-5 animate-spin" />
              ) : isSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-theme-primary" />
              ) : (
                <Send className="w-4 h-4 -ml-0.5" />
              )}
            </button>
          </div>

          {/* Mensajes */}
          <div className="h-6 mt-1 flex justify-center items-start overflow-hidden">
            {error && (
              <p className="text-red-400 text-xs font-sans font-bold">{error}</p>
            )}
            {isSuccess && (
              <p className="text-theme-gold text-[0.7rem] font-sans uppercase tracking-[0.1em] font-bold">
                ¡Sugerencia enviada!
              </p>
            )}
          </div>
        </form>

      </div>
    </section>
  );
}
