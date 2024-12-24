import { useRef, useEffect, useState } from 'react';

interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
}: UseSwipeOptions) {
  const ref = useRef<HTMLDivElement>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [offset, setOffset] = useState(0);
  const startX = useRef<number | null>(null);
  const isMouseDown = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Touch Events
    const onTouchStart = (e: TouchEvent) => {
      startX.current = e.touches[0].clientX;
      setSwipeDirection(null);
      setOffset(0);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (startX.current === null) return;
      const currentX = e.touches[0].clientX;
      const diff = currentX - startX.current;
      setOffset(diff);
      
      if (Math.abs(diff) > threshold) {
        setSwipeDirection(diff < 0 ? 'left' : 'right');
      }
    };

    const onTouchEnd = () => {
      handleSwipeEnd();
    };

    // Mouse Events
    const onMouseDown = (e: MouseEvent) => {
      startX.current = e.clientX;
      isMouseDown.current = true;
      setSwipeDirection(null);
      setOffset(0);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isMouseDown.current || startX.current === null) return;
      const currentX = e.clientX;
      const diff = currentX - startX.current;
      setOffset(diff);
      
      if (Math.abs(diff) > threshold) {
        setSwipeDirection(diff < 0 ? 'left' : 'right');
      }
    };

    const onMouseUp = () => {
      if (isMouseDown.current) {
        handleSwipeEnd();
      }
    };

    const handleSwipeEnd = () => {
      if (swipeDirection === 'left' && onSwipeLeft) {
        onSwipeLeft();
      } else if (swipeDirection === 'right' && onSwipeRight) {
        onSwipeRight();
      }
      startX.current = null;
      isMouseDown.current = false;
      setOffset(0);
      setSwipeDirection(null);
    };

    // Add event listeners
    element.addEventListener('touchstart', onTouchStart);
    element.addEventListener('touchmove', onTouchMove);
    element.addEventListener('touchend', onTouchEnd);
    element.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchend', onTouchEnd);
      element.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onSwipeLeft, onSwipeRight, swipeDirection, threshold]);

  return { ref, swipeDirection, offset };
}