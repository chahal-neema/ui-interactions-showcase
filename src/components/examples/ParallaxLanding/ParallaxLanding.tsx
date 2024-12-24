import React from 'react';
import { ParallaxSection } from './ParallaxSection';
import { ParallaxHero } from './ParallaxHero';
import { ContentSection } from './ContentSection';

export function ParallaxLanding() {
  return (
    <div className="relative">
      <ParallaxHero />
      
      <ParallaxSection
        position="right"
        imageSrc="https://images.unsplash.com/photo-1454496522488-7a8e488e8606"
        imageAlt="Mountain peaks"
        speed={0.2}
      >
        <ContentSection
          title="Begin Your Journey"
          content="Experience the thrill of climbing through majestic peaks and serene valleys. Our guided tours take you through some of the most breathtaking landscapes."
          align="left"
        />
      </ParallaxSection>

      <ParallaxSection
        position="left"
        imageSrc="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
        imageAlt="Valley view"
        speed={0.15}
        background="bg-gray-50"
      >
        <ContentSection
          title="Unforgettable Views"
          content="Each trail offers unique perspectives and challenges, creating memories that will last a lifetime. Our experienced guides ensure your safety while sharing their knowledge of local flora and fauna."
          align="right"
        />
      </ParallaxSection>
    </div>
  );
}