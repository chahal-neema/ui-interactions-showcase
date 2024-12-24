import React, { useState, useRef } from 'react';
import { RotateCw } from 'lucide-react';

export function RotatableObject() {
  const [rotation, setRotation] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const startAngle = useRef(0);
  const currentAngle = useRef(0);

  const getAngle = (element: HTMLElement, event: MouseEvent | Touch) => {
    const rect = element.getBoundingClientRect();
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    return Math.atan2(event.clientY - center.y, event.clientX - center.x) * 180 / Math.PI;
  };

  const handleRotateStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!elementRef.current) return;
    const event = 'touches' in e ? e.touches[0] : e;
    startAngle.current = getAngle(elementRef.current, event) - currentAngle.current;
    
    const handleRotate = (e: MouseEvent | TouchEvent) => {
      if (!elementRef.current) return;
      const event = 'touches' in e ? e.touches[0] : e;
      currentAngle.current = getAngle(elementRef.current, event) - startAngle.current;
      setRotation(currentAngle.current);
    };
    
    const handleRotateEnd = () => {
      document.removeEventListener('mousemove', handleRotate);
      document.removeEventListener('mouseup', handleRotateEnd);
      document.removeEventListener('touchmove', handleRotate);
      document.removeEventListener('touchend', handleRotateEnd);
    };
    
    document.addEventListener('mousemove', handleRotate);
    document.addEventListener('mouseup', handleRotateEnd);
    document.addEventListener('touchmove', handleRotate);
    document.addEventListener('touchend', handleRotateEnd);
  };

  return (
    <div className="flex items-center justify-center h-32">
      <div
        ref={elementRef}
        className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg cursor-move flex items-center justify-center"
        style={{ transform: `rotate(${rotation}deg)` }}
        onMouseDown={handleRotateStart}
        onTouchStart={handleRotateStart}
      >
        <RotateCw className="text-white/90" />
      </div>
    </div>
  );
}