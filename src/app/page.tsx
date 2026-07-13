'use client';

import { useState } from 'react';
import { useEnvelopeSession } from '@/hooks/useEnvelopeSession';
import { EnvelopeScreen } from '@/components/core/EnvelopeScreen';
import { AudioPlayer } from '@/components/core/AudioPlayer';
import { HeroSection } from '@/components/sections/HeroSection';
import { PortraitSection } from '@/components/sections/PortraitSection';
import { ParentsSection } from '@/components/sections/ParentsSection';
import { SaveTheDateSection } from '@/components/sections/SaveTheDateSection';
import { CountdownSection } from '@/components/sections/CountdownSection';
import { ItinerarySection } from '@/components/sections/ItinerarySection';
import { LocationSection } from '@/components/sections/LocationSection';
import { DressCodeSection } from '@/components/sections/DressCodeSection';
import { GiftRegistrySection } from '@/components/sections/GiftRegistrySection';
import { MusicSection } from '@/components/sections/MusicSection';
import { RSVPSection } from '@/components/sections/RSVPSection';
import { FooterSection } from '@/components/sections/FooterSection';
import { NoiseBackground } from '@/components/ui/NoiseBackground';

export default function Home() {
  const { isOpen, openEnvelope } = useEnvelopeSession();
  const [isRevealed, setIsRevealed] = useState(false);

  // Sincronización para revelado inmediato si la sesión ya estaba iniciada
  if (isOpen && !isRevealed) {
    setIsRevealed(true);
  }

  return (
    <>
      <EnvelopeScreen 
        isOpen={isOpen} 
        onOpen={openEnvelope} 
        onStartOpen={() => setIsRevealed(true)}
      />
      
      {/* Contenido principal oculto (y bloqueado el scroll) hasta abrir el sobre */}
      <main className={`relative w-full min-h-screen ${isOpen ? 'h-auto overflow-visible' : 'h-screen overflow-hidden'}`}>
        {/* Fondo Global */}
        <NoiseBackground />

        <HeroSection isRevealed={isRevealed} />
        <PortraitSection />
        <ParentsSection />
        {/* Cuenta Regresiva */}
        <CountdownSection />
        {/* Recepción */}
        <SaveTheDateSection />


        {/* Itinerario Lineal Animado */}
        <ItinerarySection />
        <LocationSection />
        <DressCodeSection />
        <GiftRegistrySection />
        {/* <MusicSection /> */}
        <RSVPSection />
        <FooterSection />
        
        {isOpen && <AudioPlayer />}
      </main>
    </>
  );
}
