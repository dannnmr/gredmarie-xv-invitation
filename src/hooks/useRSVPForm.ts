'use client';

import { useCallback, useRef, useState } from 'react';
import gsap from 'gsap';
import { submitRSVP } from '@/lib/rsvp';
import { submitToGoogleSheets } from '@/lib/googleSheets';

interface UseRSVPFormOptions {
  onSuccess?: (guestName: string) => void;
}

export type RSVPFormState = 'idle' | 'submitting' | 'success' | 'error';

interface UseRSVPFormReturn {
  guestName: string;
  formState: RSVPFormState;
  errorMessage: string;
  submitBtnRef: React.RefObject<HTMLButtonElement | null>;
  handleChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

/**
 * Lógica completa del formulario RSVP.
 * Maneja estado, validación, envío a Supabase, y Google Sheets.
 */
export function useRSVPForm({
  onSuccess,
}: UseRSVPFormOptions = {}): UseRSVPFormReturn {
  const [guestName, setGuestName] = useState('');
  const [formState, setFormState] = useState<RSVPFormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const handleChange = useCallback((value: string) => {
    setGuestName(value);
    if (errorMessage) setErrorMessage('');
  }, [errorMessage]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación
    if (!guestName.trim()) {
      setErrorMessage('Por favor ingresa tu nombre.');
      return;
    }

    setFormState('submitting');
    setErrorMessage('');

    try {
      await submitRSVP({
        guestName: guestName.trim(),
      });

      // Sincronizar con Google Sheets en segundo plano
      submitToGoogleSheets({ nombre: guestName.trim() })
        .catch(err => console.error('[Google Sheets Sync] Error:', err));

      setFormState('success');
      onSuccess?.(guestName.trim());

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido.';
      setErrorMessage(message);
      setFormState('error');

      // Shake del botón en error
      if (submitBtnRef.current) {
        gsap.fromTo(
          submitBtnRef.current,
          { x: -6 },
          { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' }
        );
      }
    }
  }, [guestName, onSuccess]);

  return {
    guestName,
    formState,
    errorMessage,
    submitBtnRef,
    handleChange,
    handleSubmit,
  };
}
