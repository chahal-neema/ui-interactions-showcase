import React from 'react';
import { useParallaxEffect } from './useParallaxEffect';

export function ParallaxHero() {
  const containerRef = useParallaxEffect();

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      <div 
        className="parallax-element absolute inset-0 z-0"
        data-speed="0.5"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div 
        className="parallax-element absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-10"
        data-speed="0.3"
      />
      <div className="relative z-20 h-full flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">Mountain Adventures</h1>
          <p className="text-xl">Discover the beauty of nature</p>
        </div>
      </div>
    </section>
  );
}