import React, { useState } from 'react';
import { InteractionCard } from '../InteractionCard';
import { ChevronRight } from 'lucide-react';

export function NavigationInteractions() {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <InteractionCard
        title="Sliding Tab Indicator"
        description="Tab with animated sliding indicator">
        <div className="relative flex border rounded-lg overflow-hidden">
          {['Tab 1', 'Tab 2', 'Tab 3'].map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(index)}
              className={`flex-1 px-4 py-2 relative z-10 ${activeTab === index ? 'text-white' : 'text-gray-600'}`}
            >
              {tab}
            </button>
          ))}
          <div 
            className="absolute h-full w-1/3 bg-blue-500 transition-transform duration-300 ease-in-out rounded-lg"
            style={{ transform: `translateX(${activeTab * 100}%)` }}
          ></div>
        </div>
      </InteractionCard>

      <InteractionCard
        title="Accordion Menu"
        description="Expandable menu with smooth height animation">
        <div className="space-y-2">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedItem(expandedItem === item ? null : item)}
                className="w-full px-4 py-2 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
              >
                <span>Item {item}</span>
                <ChevronRight 
                  className={`w-4 h-4 transition-transform ${expandedItem === item ? 'rotate-90' : ''}`}
                />
              </button>
              <div 
                className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                  expandedItem === item ? 'max-h-24' : 'max-h-0'
                }`}
              >
                <div className="p-4 bg-white">
                  Content for item {item}
                </div>
              </div>
            </div>
          ))}
        </div>
      </InteractionCard>

      <InteractionCard
        title="Breadcrumb Trail"
        description="Interactive breadcrumb navigation with hover effects">
        <nav className="flex space-x-2 text-sm">
          {['Home', 'Products', 'Categories'].map((item, index, arr) => (
            <React.Fragment key={item}>
              <a 
                href="#"
                className="text-blue-500 hover:text-blue-700 hover:underline"
                onClick={(e) => e.preventDefault()}
              >
                {item}
              </a>
              {index < arr.length - 1 && (
                <span className="text-gray-400">/</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </InteractionCard>
    </div>
  );
}