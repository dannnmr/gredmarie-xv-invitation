'use client';

import Image from 'next/image';
import { invitationConfig } from '@/config/invitation.config';
import { Sparkle } from '@/components/ui/Sparkle';

export function FooterSection() {
  const quinceañeraName = invitationConfig.client.name;

  return (
    <footer className="relative flex flex-col items-center justify-center w-full py-6 px-4 bg-theme-primary overflow-hidden border-t border-theme-gold/10">
      
      {/* Imagen de Fondo (Textura Azul) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-70 mix-blend-screen">
        <Image
          src="/dresscode/textura_azul.png"
          alt="Textura Azul"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Degradados sutiles para fusionar con la sección anterior */}
      <div className="absolute inset-0 bg-gradient-to-b from-theme-primary/20 to-black pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-[800px] flex flex-col md:flex-row items-center justify-between gap-4 md:gap-10 text-center md:text-left">
        
        {/* Lado izquierdo - Info de la Quinceañera */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <div className="flex items-center gap-2">
            <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase font-bold text-white/80">
              Exclusive Pass
            </span>
            <div className="w-[5px] h-[5px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          </div>

          <span 
            className="font-display text-[4.5rem] md:text-[5.5rem] text-transparent leading-[0.85] z-0 tracking-wider text-center drop-shadow-md my-1"
            style={{ WebkitTextStroke: '1px rgba(220,220,220,0.8)' }} 
          >
            {quinceañeraName}
          </span>

          <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-white/70 mb-1">
            ¡No dejes que te lo cuenten!
          </p>
        </div>

        {/* Lado derecho - Contact Card de Daniela Miranda (Diseñadora) */}
        <a
          href="https://wa.me/59168183484?text=Hola%20Daniela!%20Me%20gustaría%20saber%20más%20sobre%20tus%20diseños%20de%20invitaciones%20digitales."
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-between gap-6 py-3 px-7 bg-white/5 backdrop-blur-xl border border-white/20 rounded-[24px] max-w-[380px] w-full transition-all duration-500 hover:border-white/50 hover:-translate-y-1 hover:bg-white/10 shadow-[0_0_25px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          {/* Pequeños destellos azules en la tarjeta
          <Sparkle className="top-[10%] right-[20%] w-6 opacity-30 group-hover:opacity-60 transition-opacity" delay={0.2} speed={15} />
          <Sparkle className="bottom-[15%] left-[10%] w-4 opacity-20 group-hover:opacity-50 transition-opacity" delay={1.1} speed={20} reverse /> */}

          {/* Detalles del ticket */}
          <div className="flex flex-col text-left min-w-0 ">
            <span className="font-sans text-[0.5rem] font-extrabold text-white/50 uppercase tracking-[0.25em]">
              Digital Invitation Design
            </span>
            <span className="font-sans text-[0.8rem] font-black text-white uppercase mt-1 tracking-[0.02em] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-colors">
              Daniela Miranda
            </span>
            <span className="font-sans text-[0.6rem] font-medium text-white/70 mt-1">
              ¿Quieres una invitación como esta?
            </span>
          </div>

          {/* Botón de Acción */}
          <div className="flex items-center gap-2 shrink-0 px-5 py-2.5 rounded-full text-[0.7rem] font-black font-sans uppercase tracking-wider bg-white/10 border border-white/30 text-white transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white">
            <span>Contacto</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </a>
      </div>
    </footer>
  );
}
