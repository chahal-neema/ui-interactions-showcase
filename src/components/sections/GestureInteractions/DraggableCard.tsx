import React from 'react';
import { useDrag } from '../../hooks/useDrag';
import { Move } from 'lucide-react';

export function DraggableCard() {
  const { ref, isDragging, style } = useDrag();

  return (
    <div 
      ref={ref}
      style={style}
      className={`
        w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 
        rounded-lg shadow-lg cursor-grab flex items-center justify-center
        ${isDragging ? 'cursor-grabbing shadow-xl scale-105' : ''}
        transition-shadow duration-200
      `}
    >
      <Move className="text-white/90" />
      <span className="sr-only">Draggable element</span>
    </div>
  );
}