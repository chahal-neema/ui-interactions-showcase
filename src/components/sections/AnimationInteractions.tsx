import React, { useState } from 'react';
import { InteractionCard } from '../InteractionCard';
import { Zap, RotateCw, Waves } from 'lucide-react';

export function AnimationInteractions() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isWaving, setIsWaving] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <InteractionCard
        title="Sequence Animation"
        description="Elements animating in sequence">
        <div className="flex flex-col items-center">
          <button
            onClick={() => setIsPlaying(true)}
            onAnimationEnd={() => setIsPlaying(false)}
            className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
          >
            Play Sequence
          </button>
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full bg-purple-500 ${
                  isPlaying ? 'animate-[bounce_1s_ease-in-out_infinite]' : ''
                }`}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </InteractionCard>

      <InteractionCard
        title="Morphing Animation"
        description="Smooth shape morphing transitions">
        <div className="flex justify-center">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`relative w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 
              ${isRotating ? 'rounded-full' : 'rounded-lg'} 
              transition-all duration-500 ease-in-out transform hover:scale-110`}
          >
            <RotateCw 
              className={`absolute inset-0 m-auto text-white transition-transform duration-500
                ${isRotating ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
        </div>
      </InteractionCard>

      <InteractionCard
        title="Wave Effect"
        description="Animated wave pattern effect">
        <div 
          className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg overflow-hidden"
          onMouseEnter={() => setIsWaving(true)}
          onMouseLeave={() => setIsWaving(false)}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Waves className="text-white/90 w-8 h-8" />
          </div>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`absolute inset-x-0 h-16 bg-white/10 
                ${isWaving ? 'animate-[wave_2s_ease-in-out_infinite]' : ''}`}
              style={{
                bottom: `-${i * 4}px`,
                animationDelay: `${i * 0.5}s`,
                transform: 'translateY(100%)',
                opacity: 0.7 - i * 0.2
              }}
            />
          ))}
        </div>
      </InteractionCard>
    </div>
  );
}