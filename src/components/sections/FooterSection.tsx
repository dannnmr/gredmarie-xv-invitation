'use client';

import { invitationConfig } from '@/config/invitation.config';

export function FooterSection() {
  const quinceañeraName = invitationConfig.client.name;

  return (
    <footer className="relative flex flex-col items-center justify-center w-full py-16 px-6 bg-theme-primary overflow-hidden border-t border-theme-gold/10">
      
      {/* Degradados sutiles para fusionar con la sección anterior */}
      <div className="absolute inset-0 bg-gradient-to-b from-theme-primary to-black pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-[900px] flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
        
        {/* Lado izquierdo - Info de la Quinceañera */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <div className="flex items-center gap-2">
            <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase font-bold text-theme-gold">
              Exclusive Pass
            </span>
            <div className="w-[5px] h-[5px] rounded-full bg-theme-accent shadow-[0_0_8px_rgba(30,58,138,0.8)]" />
          </div>

          <h2 className="font-display text-6xl md:text-7xl text-theme-secondary font-normal my-2 select-none drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            {quinceañeraName}
          </h2>

          <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-theme-gold/80 mb-1">
            ¡No dejes que te lo cuenten!
          </p>
        </div>

        {/* Lado derecho - Contact Card de Daniela Miranda (Diseñadora) */}
        <a
          href="https://wa.me/59168183484?text=Hola%20Daniela!%20Me%20gustaría%20saber%20más%20sobre%20tus%20diseños%20de%20invitaciones%20digitales."
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-6 py-2 px-7 bg-white/5 backdrop-blur-md border border-white/20 rounded-[20px] max-w-[380px] w-full transition-all duration-300 hover:border-white/50 hover:-translate-y-1 hover:bg-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
        >
          {/* Detalles del ticket */}
          <div className="flex flex-col text-left min-w-0">
            <span className="font-sans text-[0.5rem] font-extrabold text-white/60 uppercase tracking-[0.2em]">
              Digital Invitation Design
            </span>
            <span className="font-sans text-base font-black text-white uppercase mt-1 tracking-[0.02em]">
              Daniela Miranda
            </span>
            <span className="font-sans text-[0.7rem] font-medium text-white/80 mt-1">
              ¿Quieres una invitación como esta?
            </span>
          </div>

          {/* Botón de Acción */}
          <div className="flex items-center gap-1.5 shrink-0 px-5 py-2.5 rounded-full text-[0.75rem] font-bold font-sans bg-theme-gold text-theme-primary transition-all duration-300 group-hover:bg-white">
            <span>Escribir</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </a>
      </div>
    </footer>
  );
}
