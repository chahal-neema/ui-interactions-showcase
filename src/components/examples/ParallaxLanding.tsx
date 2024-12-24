import React, { useEffect, useRef } from 'react';

export function ParallaxLanding() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrolled = window.scrollY;
      
      // Update parallax elements
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

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen overflow-hidden">
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

      {/* Content Sections with Parallax Elements */}
      <section className="relative bg-white py-24">
        <div 
          className="parallax-element absolute right-0 w-1/3 h-64 -mt-32"
          data-speed="0.2"
        >
          <img 
            src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606"
            alt="Mountain peaks"
            className="w-full h-full object-cover rounded-l-2xl shadow-2xl"
          />
        </div>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8">Begin Your Journey</h2>
          <p className="text-lg text-gray-600 mb-6">
            Experience the thrill of climbing through majestic peaks and serene valleys.
            Our guided tours take you through some of the most breathtaking landscapes.
          </p>
        </div>
      </section>

      <section className="relative bg-gray-50 py-24">
        <div 
          className="parallax-element absolute left-0 w-1/3 h-64 -mt-32"
          data-speed="0.15"
        >
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
            alt="Valley view"
            className="w-full h-full object-cover rounded-r-2xl shadow-2xl"
          />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-right">
          <h2 className="text-4xl font-bold mb-8">Unforgettable Views</h2>
          <p className="text-lg text-gray-600 mb-6">
            Each trail offers unique perspectives and challenges, creating memories
            that will last a lifetime. Our experienced guides ensure your safety
            while sharing their knowledge of local flora and fauna.
          </p>
        </div>
      </section>
    </div>
  );
}