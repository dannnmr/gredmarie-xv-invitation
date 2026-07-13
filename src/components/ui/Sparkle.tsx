import Image from 'next/image';

interface SparkleProps {
  className?: string; // Position, size, opacity
  delay?: number; // Delay in seconds for pulse
  speed?: number; // Duration of one full spin in seconds
  reverse?: boolean; // True to spin counter-clockwise
}

export function Sparkle({ className = '', delay = 0, speed = 20, reverse = false }: SparkleProps) {
  return (
    <div 
      className={`absolute pointer-events-none z-0 animate-pulse ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <Image 
        src="/decoration/estrellas_blanco.png" 
        alt="Destello" 
        width={100} 
        height={100} 
        className="object-contain w-full h-auto"
        style={{ animation: `spin ${speed}s linear infinite ${reverse ? 'reverse' : 'normal'}` }}
      />
    </div>
  );
}
