import { useRef, useState, useEffect } from 'react';

interface UsePinchZoomOptions {
  minScale?: number;
  maxScale?: number;
}

export function usePinchZoom({
  minScale = 1,
  maxScale = 3,
}: UsePinchZoomOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isPinching, setIsPinching] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * -0.01;
      setScale(s => Math.min(Math.max(s + delta, minScale), maxScale));
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        setIsPinching(true);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(
          touch1.clientX - touch2.clientX,
          touch1.clientY - touch2.clientY
        );
        
        setScale(s => Math.min(Math.max(distance / 100, minScale), maxScale));
      }
    };

    const onTouchEnd = () => {
      setIsPinching(false);
    };

    element.addEventListener('wheel', onWheel);
    element.addEventListener('touchstart', onTouchStart);
    element.addEventListener('touchmove', onTouchMove);
    element.addEventListener('touchend', onTouchEnd);

    return () => {
      element.removeEventListener('wheel', onWheel);
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchend', onTouchEnd);
    };
  }, [minScale, maxScale]);

  return { ref, scale, isPinching };
}