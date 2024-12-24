import React from 'react';
import { useParallaxEffect } from './useParallaxEffect';

interface ParallaxSectionProps {
  position: 'left' | 'right';
  imageSrc: string;
  imageAlt: string;
  speed: number;
  children: React.ReactNode;
  background?: string;
}

export function ParallaxSection({
  position,
  imageSrc,
  imageAlt,
  speed,
  children,
  background = 'bg-white'
}: ParallaxSectionProps) {
  const containerRef = useParallaxEffect();

  return (
    <section ref={containerRef} className={`relative ${background} py-24`}>
      <div 
        className={`parallax-element absolute ${position}-0 w-1/3 h-64 -mt-32`}
        data-speed={speed}
      >
        <img 
          src={imageSrc}
          alt={imageAlt}
          className={`w-full h-full object-cover ${
            position === 'left' ? 'rounded-r-2xl' : 'rounded-l-2xl'
          } shadow-2xl`}
        />
      </div>
      {children}
    </section>
  );
}