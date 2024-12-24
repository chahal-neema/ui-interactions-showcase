import React, { useState } from 'react';
import { InteractionCard } from '../InteractionCard';
import { Loader2, ZapOff, Zap } from 'lucide-react';

export function ButtonInteractions() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRippling, setIsRippling] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [shakeCount, setShakeCount] = useState(0);

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleHoldStart = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setHoldProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setHoldProgress(0);
      }
    }, 20);

    const cleanup = () => {
      clearInterval(interval);
      setHoldProgress(0);
      document.removeEventListener('mouseup', cleanup);
      document.removeEventListener('touchend', cleanup);
    };

    document.addEventListener('mouseup', cleanup);
    document.addEventListener('touchend', cleanup);
  };

  const handleShake = () => {
    setShakeCount(count => count + 1);
    setTimeout(() => setShakeCount(count => Math.max(0, count - 1)), 500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <InteractionCard
        title="Hover State"
        description="A visual feedback when the user hovers over an interactive element">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Hover Me
        </button>
      </InteractionCard>

      <InteractionCard
        title="Loading State"
        description="Indicates that an action is in progress">
        <button
          onClick={simulateLoading}
          disabled={isLoading}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50 transition-opacity"
        >
          {isLoading ? (
            <span className="flex items-center">
              <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
              Loading...
            </span>
          ) : (
            'Click to Load'
          )}
        </button>
      </InteractionCard>

      <InteractionCard
        title="Ripple Effect"
        description="Material design-inspired ripple animation on click">
        <button
          onClick={() => {
            setIsRippling(true);
            setTimeout(() => setIsRippling(false), 600);
          }}
          className={`relative px-4 py-2 bg-purple-500 text-white rounded overflow-hidden transition-colors ${
            isRippling ? 'after:content-[""] after:absolute after:bg-white after:opacity-25 after:w-full after:h-full after:top-0 after:left-0 after:animate-ripple' : ''
          }`}
        >
          Click for Ripple
        </button>
      </InteractionCard>

      <InteractionCard
        title="Press and Hold"
        description="Action triggered by holding the button">
        <button
          onMouseDown={handleHoldStart}
          onTouchStart={handleHoldStart}
          className="relative px-4 py-2 bg-indigo-500 text-white rounded overflow-hidden"
        >
          Hold Me
          {holdProgress > 0 && (
            <div 
              className="absolute bottom-0 left-0 h-1 bg-white/50 transition-all duration-75"
              style={{ width: `${holdProgress}%` }}
            />
          )}
        </button>
      </InteractionCard>

      <InteractionCard
        title="Toggle Button"
        description="Button that toggles between two states">
        <button
          onClick={() => setIsToggled(!isToggled)}
          className={`
            px-4 py-2 rounded-full flex items-center gap-2 transition-colors
            ${isToggled ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}
          `}
        >
          {isToggled ? <Zap className="w-4 h-4" /> : <ZapOff className="w-4 h-4" />}
          {isToggled ? 'Active' : 'Inactive'}
        </button>
      </InteractionCard>

      <InteractionCard
        title="Shake Effect"
        description="Button shakes when clicked multiple times">
        <button
          onClick={handleShake}
          className={`
            px-4 py-2 bg-red-500 text-white rounded
            ${shakeCount > 0 ? 'animate-[shake_0.5s_cubic-bezier(.36,.07,.19,.97)_both]' : ''}
          `}
          style={{
            '--shake-intensity': `${Math.min(shakeCount * 2, 10)}deg`
          } as React.CSSProperties}
        >
          Shake Me ({shakeCount})
        </button>
      </InteractionCard>
    </div>
  );
}