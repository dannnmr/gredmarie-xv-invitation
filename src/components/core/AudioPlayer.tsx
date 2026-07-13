'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { invitationConfig } from '@/config/invitation.config';

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const wasPlaying = useRef(false);

  // 1. Sincronizar estado de React con el estado real del elemento de audio DOM
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  // 2. Intentar autoplay inicial
  useEffect(() => {
    if (audioRef.current && !hasInteracted) {
      audioRef.current.play().then(() => {
        setHasInteracted(true);
      }).catch((e) => {
        console.log("Autoplay prevented by browser:", e);
      });
    }
  }, [hasInteracted]);

  // 3. Manejar cuando el usuario sale del navegador o apaga la pantalla
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;
      
      if (document.hidden) {
        // Guardamos si estaba sonando justo antes de salir
        wasPlaying.current = !audioRef.current.paused;
        audioRef.current.pause();
      } else {
        // Si regresamos y la música estaba sonando antes, la reanudamos
        if (wasPlaying.current) {
          audioRef.current.play().catch(e => console.log("Resume play prevented", e));
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    // Para asegurar compatibilidad en móviles cuando se minimiza Safari/Chrome
    window.addEventListener("pagehide", handleVisibilityChange);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handleVisibilityChange);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (audioRef.current.paused) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
    setHasInteracted(true);
  };

  if (!invitationConfig.music.ambientTrack) return null;

  return (
    <>
      <audio 
        ref={audioRef} 
        src={invitationConfig.music.ambientTrack} 
        loop 
        preload="auto"
      />
      <button 
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-[#bde0fe]/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(189,224,254,0.5)] border border-white/50 text-slate-800 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Toggle music"
      >
        {isPlaying ? <Volume2 size={28} /> : <VolumeX size={28} />}
      </button>
    </>
  );
}
