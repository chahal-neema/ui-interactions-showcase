import { useEffect, useRef } from 'react';

export function useParallaxEffect() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrolled = window.scrollY;
      
      const elements = containerRef.current.querySelectorAll('.parallax-element');
      elements.forEach((element) => {
        const speed = Number(element.getAttribute('data-speed')) || 0;
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return containerRef;
}