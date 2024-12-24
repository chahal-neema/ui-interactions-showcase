import React from 'react';
import { ButtonInteractions } from './components/sections/ButtonInteractions';
import { FormInteractions } from './components/sections/FormInteractions';
import { TooltipInteractions } from './components/sections/TooltipInteractions';
import { NavigationInteractions } from './components/sections/NavigationInteractions';
import { LoadingInteractions } from './components/sections/LoadingInteractions';
import { ScrollInteractions } from './components/sections/ScrollInteractions';
import { AnimationInteractions } from './components/sections/AnimationInteractions';
import { GestureInteractions } from './components/sections/GestureInteractions';
import { Library } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <Library className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">UI Interaction Patterns</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Gesture Interactions</h2>
            <GestureInteractions />
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Animation Interactions</h2>
            <AnimationInteractions />
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Button Interactions</h2>
            <ButtonInteractions />
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Form Interactions</h2>
            <FormInteractions />
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Tooltip Interactions</h2>
            <TooltipInteractions />
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Navigation Interactions</h2>
            <NavigationInteractions />
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Loading Interactions</h2>
            <LoadingInteractions />
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Scroll Interactions</h2>
            <ScrollInteractions />
          </section>
        </div>
      </main>
    </div>
  );
}