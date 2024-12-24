import React, { useEffect, useRef, useState } from 'react';
import { InteractionCard } from '../InteractionCard';
import { useInView } from '../hooks/useInView';
import { ArrowDown } from 'lucide-react';

export function ScrollInteractions() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const fadeRefs = Array(5).fill(0).map(() => useRef<HTMLDivElement>(null));
  const fadeStates = fadeRefs.map(ref => useInView(ref, { threshold: 0.1 }));

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrolled = containerRef.current.scrollTop;
        const maxScroll = containerRef.current.scrollHeight - containerRef.current.clientHeight;
        setScrollProgress((scrolled / maxScroll) * 100);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <InteractionCard
        title="Scroll Progress"
        description="Visual indicator of scroll position">
        <div 
          ref={containerRef}
          className="h-96 overflow-y-auto relative"
        >
          <div className="sticky top-0 left-0 w-full h-1 bg-gray-200 z-10">
            <div 
              className="h-full bg-blue-500 transition-all duration-150"
              style={{ width: `${scrollProgress}%` }}
            ></div>
          </div>
          <div className="pt-2 space-y-4">
            {Array.from({ length: 15 }).map((_, i) => (
              <p key={i} className="p-4 bg-white rounded shadow">Scroll content {i + 1}</p>
            ))}
          </div>
        </div>
      </InteractionCard>

      <InteractionCard
        title="Fade In on Scroll"
        description="Elements that fade in when scrolled into view">
        <div className="h-96 overflow-y-auto p-4 relative">
          <div className="absolute top-4 right-4 animate-bounce">
            <ArrowDown className="text-gray-400" />
          </div>
          <div className="space-y-8">
            {fadeRefs.map((ref, i) => (
              <React.Fragment key={i}>
                <div className="h-24 bg-gray-50 rounded"></div>
                <div 
                  ref={ref}
                  className={`transform transition-all duration-1000 ${
                    fadeStates[i]
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className={`p-6 rounded-lg shadow-lg ${
                    i % 2 === 0 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  } text-white`}>
                    <h3 className="font-semibold text-lg">Fade In Element {i + 1}</h3>
                    <p className="text-sm mt-2 text-white/90">
                      This element fades and slides up when scrolled into view
                    </p>
                  </div>
                </div>
              </React.Fragment>
            ))}
            <div className="h-24 bg-gray-50 rounded"></div>
          </div>
        </div>
      </InteractionCard>

      <InteractionCard
        title="Parallax Scroll"
        description="Elements moving at different speeds while scrolling">
        <div 
          className="h-96 overflow-y-auto relative"
          onScroll={(e) => {
            const scrolled = e.currentTarget.scrollTop;
            const layers = e.currentTarget.querySelectorAll('.parallax-layer');
            layers.forEach((layer, index) => {
              const speed = 1 - (index * 0.15);
              (layer as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
            });
          }}
        >
          <div className="relative min-h-[800px]">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`parallax-layer absolute inset-x-0 p-4 transition-transform will-change-transform ${
                  ['bg-blue-500/10', 'bg-purple-500/10', 'bg-pink-500/10', 'bg-orange-500/10', 'bg-green-500/10'][i]
                }`}
                style={{ top: `${i * 40}px` }}
              >
                <div className="bg-white/90 p-4 rounded-lg shadow-lg border border-white/20">
                  <h3 className="font-semibold">Parallax Layer {i + 1}</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Moving at {100 - (i * 15)}% speed
                  </p>
                  <div className="mt-3 space-y-2">
                    {Array(3).fill(0).map((_, j) => (
                      <div 
                        key={j} 
                        className="h-2 rounded bg-gradient-to-r from-gray-200 to-gray-100"
                        style={{ width: `${100 - (j * 20)}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </InteractionCard>
    </div>
  );
}