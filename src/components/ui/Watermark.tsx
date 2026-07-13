import React from 'react';

interface WatermarkProps {
  text: string | number;
  className?: string; // Para posicionamiento absoluto, tamaño, etc.
  strokeColor?: string;
  strokeWidth?: string;
  fontFamily?: string;
}

export function Watermark({
  text,
  className = '',
  strokeColor = 'rgba(212,175,55,0.6)',
  strokeWidth = '2px',
  fontFamily = 'font-display'
}: WatermarkProps) {
  return (
    <div 
      className={`text-transparent pointer-events-none select-none mix-blend-screen ${fontFamily} ${className}`}
      style={{ WebkitTextStroke: `${strokeWidth} ${strokeColor}` }}
    >
      {text}
    </div>
  );
}
