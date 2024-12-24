import React from 'react';
import { InteractionCard } from '../InteractionCard';

export function TooltipInteractions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <InteractionCard
        title="Hover Tooltip"
        description="Simple tooltip that appears on hover">
        <div className="flex justify-center">
          <div className="relative group">
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              Hover me
            </button>
            <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap">
              Hello, I'm a tooltip!
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
      </InteractionCard>

      <InteractionCard
        title="Follow Cursor Tooltip"
        description="Tooltip that follows the cursor movement">
        <div 
          className="relative h-32 bg-gray-100 rounded flex items-center justify-center cursor-default"
          onMouseMove={(e) => {
            const tooltip = e.currentTarget.querySelector('.follow-tooltip');
            if (tooltip) {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              tooltip.setAttribute('style', `left: ${x + 10}px; top: ${y + 10}px`);
            }
          }}
        >
          <span className="text-gray-500">Move cursor here</span>
          <div className="follow-tooltip absolute px-3 py-1 bg-gray-900 text-white text-sm rounded pointer-events-none whitespace-nowrap">
            Following you!
          </div>
        </div>
      </InteractionCard>

      <InteractionCard
        title="Click Tooltip"
        description="Tooltip that toggles on click instead of hover">
        <div className="flex justify-center">
          <div className="relative">
            <button 
              className="px-4 py-2 bg-purple-500 text-white rounded"
              onClick={(e) => {
                const tooltip = e.currentTarget.nextElementSibling;
                tooltip?.classList.toggle('hidden');
              }}
            >
              Click me
            </button>
            <div className="hidden absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap">
              Click again to hide me!
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
      </InteractionCard>
    </div>
  );
}