import React from 'react';
import { usePinchZoom } from '../../hooks/usePinchZoom';
import { Maximize2 } from 'lucide-react';

export function ZoomableImage() {
  const { ref, scale, isPinching } = usePinchZoom();

  return (
    <div className="relative h-40 overflow-hidden rounded-lg">
      <div
        ref={ref}
        className={`
          relative w-full h-full bg-gradient-to-br from-blue-500 to-purple-500
          transition-transform duration-200
          ${isPinching ? 'cursor-zoom-in' : ''}
        `}
        style={{ transform: `scale(${scale})` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Maximize2 className="text-white/90" />
        </div>
      </div>
    </div>
  );
}