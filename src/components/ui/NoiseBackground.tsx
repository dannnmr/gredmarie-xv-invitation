import Image from 'next/image';

export function NoiseBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] bg-[#010308]">
      
      {/* Efecto mega sutil de azul desde arriba */}
      <div 
        className="absolute inset-0 opacity-[0.12]"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(30, 60, 140, 0.4) 0%, transparent 70%)'
        }}
      ></div>

      {/* Ruido granulado SVG (Noise) muy sutil */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>

    </div>
  );
}
