import React, { useState } from 'react';
import { useSwipe } from '../../hooks/useSwipe';
import { MoveHorizontal } from 'lucide-react';

const CARDS = [
  { id: 1, color: 'from-blue-500 to-purple-500' },
  { id: 2, color: 'from-purple-500 to-pink-500' },
  { id: 3, color: 'from-pink-500 to-red-500' },
];

export function SwipeableCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, swipeDirection, offset } = useSwipe({
    onSwipeLeft: () => setCurrentIndex((i) => Math.min(i + 1, CARDS.length - 1)),
    onSwipeRight: () => setCurrentIndex((i) => Math.max(i - 1, 0)),
    threshold: 50,
  });

  return (
    <div className="relative h-40 flex items-center justify-center">
      <div 
        ref={ref} 
        className="relative w-32 h-32 touch-none cursor-grab active:cursor-grabbing"
      >
        {CARDS.map((card, index) => (
          <div
            key={card.id}
            className={`
              absolute inset-0 bg-gradient-to-br ${card.color} 
              rounded-lg shadow-lg flex items-center justify-center
              transition-all duration-300
              ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
            `}
            style={{
              transform: index === currentIndex ? `translateX(${offset}px)` : undefined,
            }}
          >
            <MoveHorizontal className="text-white/90" />
            <div className="absolute inset-x-0 bottom-2 text-center text-white/90 text-sm">
              Swipe me
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 flex gap-1">
        {CARDS.map((_, index) => (
          <div
            key={index}
            className={`
              w-2 h-2 rounded-full transition-colors duration-300
              ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}
            `}
          />
        ))}
      </div>
    </div>
  );
}