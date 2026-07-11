'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { invitationConfig } from '@/config/invitation.config';

export function RSVPSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const buttonShimmerRef = useRef<HTMLDivElement>(null);

  const [guestName, setGuestName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useGSAP(() => {
    // Animación de entrada de la tarjeta
    gsap.from(formCardRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Animación de shimmer (brillo) en el botón si no se está enviando
    if (buttonShimmerRef.current) {
      gsap.to(buttonShimmerRef.current, {
        x: '200%',
        duration: 3,
        repeat: -1,
        ease: 'linear'
      });
    }
  }, { scope: containerRef });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setError('Por favor, ingresa tu nombre.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Simulación de Webhook
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <section 
      ref={containerRef}
      className="py-16 px-6 relative w-full flex items-center justify-center bg-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse,_rgba(30,58,138,0.15)_0%,_transparent_70%)] blur-[50px] z-0 pointer-events-none" />

      <div 
        ref={formCardRef}
        className="relative z-10 w-full max-w-[420px] bg-white/[0.015] border border-white/20 rounded-[30px] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8),_0_0_40px_rgba(192,192,192,0.15),_inset_0_0_30px_rgba(192,192,192,0.05)] backdrop-blur-md"
      >
        {/* Destello de cristal superior */}
        <div className="absolute top-0 left-[20%] right-[20%] h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            
            {/* Header del Formulario */}
            <div className="text-center">
              <span className="font-sans text-[0.65rem] text-theme-gold tracking-[0.3em] uppercase font-semibold block mb-4">
                Lista de Invitados
              </span>
              <h2 className="font-display text-6xl md:text-7xl text-theme-secondary font-normal leading-none mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                RSVP
              </h2>
              <p className="font-sans text-[0.7rem] text-white/70 tracking-[1px] uppercase leading-relaxed max-w-[380px] mx-auto">
                Por favor, confírmanos tu presencia.
              </p>
            </div>
            
            {/* Input Lineal Minimalista */}
            <div className="flex flex-col gap-2 relative">
              <label className="font-sans text-[0.65rem] text-theme-gold uppercase tracking-[0.15em] font-semibold">
                Nombre Completo
              </label>
              <div className="relative group">
                <input 
                  type="text" 
                  value={guestName} 
                  onChange={(e) => setGuestName(e.target.value)} 
                  placeholder="Ej. Familia Pérez" 
                  disabled={isSubmitting}
                  className="w-full bg-transparent border-none border-b-2 border-white/20 pb-2 text-theme-secondary font-sans text-base outline-none transition-all duration-300 focus:border-theme-gold focus:shadow-[0_10px_15px_-10px_rgba(192,192,192,0.4)] placeholder:text-white/20"
                />
              </div>
            </div>
            
            {/* Error */}
            <div className="h-4 flex items-center justify-center -mt-6">
              {error && <p className="text-red-400 text-xs font-sans font-bold m-0">{error}</p>}
            </div>
            
            {/* Botón Editorial de Alto Contraste */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="relative overflow-hidden bg-theme-gold border-none rounded-[50px] text-theme-primary cursor-pointer font-sans text-[0.85rem] tracking-[0.2em] font-extrabold uppercase py-4 w-full shadow-[0_10px_20px_rgba(192,192,192,0.15)] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {/* Shimmer Animado */}
              <div 
                ref={buttonShimmerRef}
                className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-[20deg] z-[1]"
              />
              <span className="relative z-[2]">
                {isSubmitting ? 'Enviando...' : 'Confirmar Asistencia'}
              </span>
            </button>
          </form>
        ) : (
          /* Mensaje de Éxito Consolidado */
          <div className="text-center flex flex-col gap-4 items-center py-4">
            <div className="w-[70px] h-[70px] rounded-full border-2 border-white/80 flex items-center justify-center text-theme-gold text-4xl mb-2 shadow-[0_0_30px_rgba(192,192,192,0.4)] bg-white/10">
              ✓
            </div>
            <span className="font-sans text-[0.7rem] text-theme-gold tracking-[0.3em] uppercase font-bold">
              ¡Te esperamos!
            </span>
            <h2 className="font-display text-5xl md:text-6xl text-theme-secondary font-light leading-none">
              Confirmado
            </h2>
            <div className="w-[40px] h-[1.5px] bg-theme-gold my-2" />
            <p className="font-sans text-[0.85rem] text-white/70 leading-relaxed max-w-[360px]">
              Gracias {guestName}, tu respuesta ha sido guardada. Nos hace muy felices saber que nos acompañarás.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
