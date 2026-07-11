import { useState } from 'react';

export function useEnvelopeSession() {
  const [isOpen, setIsOpen] = useState(false);

  const openEnvelope = () => {
    setIsOpen(true);
  };

  return { isOpen, openEnvelope };
}
