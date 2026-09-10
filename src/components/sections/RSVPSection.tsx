'use client';
import { useState, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { FairyDust } from '@/components/ui/FairyDust';
import { invitationConfig } from '@/config/invitation.config';

// ============================================================================
// VERSIÓN ANTERIOR — Formulario RSVP con envío a Supabase + Google Sheets.
// Comentada a pedido del cliente. Reemplazada por confirmación vía WhatsApp.
// Para restaurarla: descomentar este bloque, borrar el componente activo de
// abajo y volver a importar `useRSVPForm`.
// ----------------------------------------------------------------------------
// import { useRSVPForm } from '@/hooks/useRSVPForm';
//
// export function RSVPSection() {
//   const [isRevealed, setIsRevealed] = useState(false);
//
//   const containerRef = useRef<HTMLDivElement>(null);
//   const leftDoorRef = useRef<HTMLDivElement>(null);
//   const rightDoorRef = useRef<HTMLDivElement>(null);
//   const formRef = useRef<HTMLDivElement>(null);
//
//   const {
//     guestName,
//     formState,
//     errorMessage,
//     submitBtnRef,
//     handleChange,
//     handleSubmit
//   } = useRSVPForm({
//     onSuccess: () => {
//       setIsRevealed(true);
//       const tl = gsap.timeline();
//
//       // Ocultar formulario primero suavemente
//       tl.to(formRef.current, { opacity: 0, duration: 0.3 })
//         // Split (Abrir cortinas)
//         .to(leftDoorRef.current, { x: '-100%', duration: 1.2, ease: 'power4.inOut' }, 'split')
//         .to(rightDoorRef.current, { x: '100%', duration: 1.2, ease: 'power4.inOut' }, 'split');
//     }
//   });
//
//   const isSubmitting = formState === 'submitting';
//
//   return (
//     <section ref={containerRef} className="w-full flex flex-col items-center py-24 px-4 overflow-hidden bg-transparent z-40 relative">
//
//       {/* Título de la Sección */}
//       <div className="text-center mb-10 z-10">
//         <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.6em] text-theme-gold block drop-shadow-md">Lista de Invitados</span>
//       </div>
//
//       <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center border border-theme-gold/20 bg-black overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
//
//         {/* === FONDO: REVELACIÓN DE ÉXITO === */}
//         <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-0">
//           <span className="font-sans text-[10px] text-theme-gold tracking-[0.4em] uppercase mb-4">Confirmado</span>
//           <h2 className="font-serif italic text-5xl md:text-7xl text-white mb-6">Gracias</h2>
//           <span className="font-display text-4xl text-theme-gold/50">{guestName}</span>
//         </div>
//
//         {/* === CORTINA IZQUIERDA === */}
//         <div ref={leftDoorRef} className="absolute inset-y-0 left-0 w-1/2 bg-[#0a0d14] border-r border-theme-gold/30 z-10 overflow-hidden flex flex-col p-6 md:p-12">
//           {/* Imagen de luces */}
//           <div className="absolute top-[10%] left-[-40%] md:right-[5%] opacity-20 w-100 md:w-150 pointer-events-none z-0">
//             <FairyDust count={20} />
//           </div>
//           <div className="absolute inset-0 z-0 opacity-50 mix-blend-screen pointer-events-none">
//             <Image src="/decoration/luces_colg.png" alt="Luces" fill className="object-cover object-top" sizes="(max-width: 768px) 50vw, 33vw" />
//           </div>
//
//           {/* Elementos asimétricos estilo Vogue */}
//           <div className="mb-4 relative z-10">
//             <span className="font-sans text-[8px] md:text-[10px] uppercase tracking-[0.5em] text-theme-gold block mb-2">Issue No. 15</span>
//             <span className="font-serif italic text-white/50 text-xs md:text-sm">Gredmarie's Celebration</span>
//           </div>
//
//           <div className="flex flex-col items-start w-[200vw] md:w-full mt-2 relative z-10">
//             <h2 className="font-display text-[3rem] md:text-[6rem] leading-[0.8] text-white tracking-wider">
//               RSVP
//             </h2>
//           </div>
//         </div>
//
//         {/* === CORTINA DERECHA === */}
//         <div ref={rightDoorRef} className="absolute inset-y-0 right-0 w-1/2 bg-[#0a0d14] z-10 overflow-hidden flex flex-col justify-end p-6 md:p-12">
//           {/* Imagen de luces (Espejo) */}
//           <div className="absolute inset-0 z-0 opacity-50 mix-blend-screen pointer-events-none -scale-x-100">
//             <Image src="/decoration/luces_colg.png" alt="Luces" fill className="object-cover object-top" sizes="(max-width: 768px) 50vw, 33vw" />
//           </div>
//
//           <div className="flex flex-col items-end w-[200vw] md:w-full text-right absolute bottom-6 md:bottom-12 right-6 md:right-12 z-10">
//             <div className="w-24 h-[1px] bg-theme-gold mt-6" />
//           </div>
//         </div>
//
//         {/* === FORMULARIO CENTRAL === */}
//         {!isRevealed && (
//           <div ref={formRef} className="absolute z-20 flex flex-col items-center justify-center w-full max-w-[500px] mt-[15vh]">
//
//             <div className="w-[320px] bg-white/5 backdrop-blur-2xl border border-white/10 flex flex-col items-center justify-center p-10 relative">
//
//               <div className="text-center mb-10">
//                 <span className="font-sans text-[10px] text-white/50 tracking-[0.4em] uppercase">Confirmación</span>
//               </div>
//
//               <form onSubmit={handleSubmit} className="flex flex-col items-center w-full relative z-10">
//                 <input
//                   type="text"
//                   value={guestName}
//                   onChange={e => handleChange(e.target.value)}
//                   placeholder="Tu Nombre Completo"
//                   className="w-full bg-transparent border-b border-white/20 pb-3 text-center text-white font-serif italic text-2xl outline-none focus:border-white placeholder:text-white/20 transition-colors"
//                   disabled={isSubmitting || formState === 'success'}
//                   required
//                 />
//
//                 {errorMessage && (
//                   <p className="text-red-400 text-xs mt-4 text-center">{errorMessage}</p>
//                 )}
//
//                 <button
//                   ref={submitBtnRef}
//                   type="submit"
//                   disabled={isSubmitting || !guestName.trim() || formState === 'success'}
//                   className="mt-10 w-full py-4 bg-white text-black font-sans font-bold text-[10px] tracking-[0.3em] uppercase hover:bg-theme-gold transition-colors disabled:opacity-30"
//                 >
//                   {isSubmitting ? 'Registrando...' : 'Confirmar Asistencia'}
//                 </button>
//               </form>
//             </div>
//
//           </div>
//         )}
//
//       </div>
//     </section>
//   );
// }
// ============================================================================

// Número de WhatsApp que recibe las confirmaciones (formato internacional, sin +).
const WHATSAPP_NUMBER = '59168183484';

function buildWhatsAppUrl(guestName: string) {
  const cliente = invitationConfig.client.name;
  const evento = invitationConfig.client.eventType;
  const message =
    `Hola! Me gustaría confirmar mi asistencia a los ${evento} de ${cliente}.` +
    (guestName ? ` Mi nombre es ${guestName}.` : '');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function RSVPSection() {
  const [guestName, setGuestName] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = guestName.trim();
    if (!name) return;

    // Abrir WhatsApp con el mensaje predeterminado.
    window.open(buildWhatsAppUrl(name), '_blank', 'noopener,noreferrer');

    // Revelar la escena de agradecimiento (misma animación de cortinas).
    setIsRevealed(true);
    const tl = gsap.timeline();
    tl.to(formRef.current, { opacity: 0, duration: 0.3 })
      .to(leftDoorRef.current, { x: '-100%', duration: 1.2, ease: 'power4.inOut' }, 'split')
      .to(rightDoorRef.current, { x: '100%', duration: 1.2, ease: 'power4.inOut' }, 'split');
  };

  return (
    <section ref={containerRef} className="w-full flex flex-col items-center py-24 px-4 overflow-hidden bg-transparent z-40 relative">

      {/* Título de la Sección */}
      <div className="text-center mb-10 z-10">
        <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.6em] text-theme-gold block drop-shadow-md">Lista de Invitados</span>
      </div>

      <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center border border-theme-gold/20 bg-black overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)]">

        {/* === FONDO: REVELACIÓN DE ÉXITO === */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-0">
          <span className="font-sans text-[10px] text-theme-gold tracking-[0.4em] uppercase mb-4">Confirmado</span>
          <h2 className="font-serif italic text-5xl md:text-7xl text-white mb-6">Gracias</h2>
          <span className="font-display text-4xl text-theme-gold/50">{guestName}</span>
          <span className="font-sans text-[9px] text-white/40 tracking-[0.35em] uppercase mt-8">Se abrió WhatsApp para enviar tu confirmación</span>
        </div>

        {/* === CORTINA IZQUIERDA === */}
        <div ref={leftDoorRef} className="absolute inset-y-0 left-0 w-1/2 bg-[#0a0d14] border-r border-theme-gold/30 z-10 overflow-hidden flex flex-col p-6 md:p-12">
          {/* Imagen de luces */}
          <div className="absolute top-[10%] left-[-40%] md:right-[5%] opacity-20 w-100 md:w-150 pointer-events-none z-0">
            <FairyDust count={20} />
          </div>
          <div className="absolute inset-0 z-0 opacity-50 mix-blend-screen pointer-events-none">
            <Image src="/decoration/luces_colg.png" alt="Luces" fill className="object-cover object-top" sizes="(max-width: 768px) 50vw, 33vw" />
          </div>

          {/* Elementos asimétricos estilo Vogue */}
          <div className="mb-4 relative z-10">
            <span className="font-sans text-[8px] md:text-[10px] uppercase tracking-[0.5em] text-theme-gold block mb-2">Issue No. 15</span>
            <span className="font-serif italic text-white/50 text-xs md:text-sm">Gredmarie&apos;s Celebration</span>
          </div>

          <div className="flex flex-col items-start w-[200vw] md:w-full mt-2 relative z-10">
            <h2 className="font-display text-[3rem] md:text-[6rem] leading-[0.8] text-white tracking-wider">
              RSVP
            </h2>
          </div>
        </div>

        {/* === CORTINA DERECHA === */}
        <div ref={rightDoorRef} className="absolute inset-y-0 right-0 w-1/2 bg-[#0a0d14] z-10 overflow-hidden flex flex-col justify-end p-6 md:p-12">
          {/* Imagen de luces (Espejo) */}
          <div className="absolute inset-0 z-0 opacity-50 mix-blend-screen pointer-events-none -scale-x-100">
            <Image src="/decoration/luces_colg.png" alt="Luces" fill className="object-cover object-top" sizes="(max-width: 768px) 50vw, 33vw" />
          </div>

          <div className="flex flex-col items-end w-[200vw] md:w-full text-right absolute bottom-6 md:bottom-12 right-6 md:right-12 z-10">
            <div className="w-24 h-[1px] bg-theme-gold mt-6" />
          </div>
        </div>

        {/* === TARJETA CENTRAL: CONFIRMACIÓN POR WHATSAPP === */}
        {!isRevealed && (
          <div ref={formRef} className="absolute z-20 flex flex-col items-center justify-center w-full max-w-[500px] mt-[15vh]">

            <div className="w-[320px] bg-white/5 backdrop-blur-2xl border border-white/10 flex flex-col items-center justify-center p-10 relative">

              <div className="text-center mb-10">
                <span className="font-sans text-[10px] text-white/50 tracking-[0.4em] uppercase">Confirmación</span>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col items-center w-full relative z-10">
                <input
                  type="text"
                  value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                  placeholder="Tu Nombre Completo"
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-center text-white font-serif italic text-2xl outline-none focus:border-white placeholder:text-white/20 transition-colors"
                  required
                />

                <p className="text-white/40 text-[9px] tracking-[0.25em] uppercase mt-6 text-center leading-relaxed">
                  Te llevaremos a WhatsApp con tu<br />mensaje listo para enviar
                </p>

                <button
                  type="submit"
                  disabled={!guestName.trim()}
                  className="mt-8 w-full py-4 flex items-center justify-center gap-2 bg-white text-black font-sans font-bold text-[10px] tracking-[0.3em] uppercase hover:bg-theme-gold transition-colors disabled:opacity-30"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.05 1.6 5.78L2 22l4.44-1.68a9.86 9.86 0 0 0 5.6 1.7h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.19c-.24.68-1.4 1.3-1.93 1.34-.5.05-.94.24-3.17-.66-2.68-1.06-4.38-3.8-4.51-3.98-.13-.18-1.09-1.45-1.09-2.77 0-1.32.69-1.97.94-2.24.24-.27.53-.34.71-.34.18 0 .35 0 .5.01.16.01.38-.06.59.45.24.58.82 2 .89 2.15.07.14.12.31.02.5-.09.18-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.12.59-.07.16-.18.68-.79.86-1.06.18-.27.36-.23.61-.14.24.09 1.55.73 1.82.87.27.14.45.2.51.31.07.11.07.64-.17 1.32Z" />
                  </svg>
                  Confirmar por WhatsApp
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
