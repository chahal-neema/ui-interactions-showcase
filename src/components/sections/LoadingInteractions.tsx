import React, { useState } from 'react';
import { InteractionCard } from '../InteractionCard';
import { Loader } from '../ui/Loader';
import { SkeletonCard } from '../ui/SkeletonCard';
import { ProgressBar } from '../ui/ProgressBar';
import { LoadingDots } from '../ui/LoadingDots';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export function LoadingInteractions() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 5;
      });
    }, 200);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <InteractionCard
        title="Skeleton Loading"
        description="Placeholder content that mimics the page's layout">
        <div className="space-y-4">
          <button
            onClick={simulateLoading}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Load Content
          </button>
          {isLoading ? <SkeletonCard /> : (
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold">Content Title</h3>
              <p className="mt-2 text-gray-600">This is the actual content that loads.</p>
            </div>
          )}
        </div>
      </InteractionCard>

      <InteractionCard
        title="Shimmer Effect"
        description="Animated loading state with a shine effect">
        <div className="space-y-4">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </InteractionCard>

      <InteractionCard
        title="Progress Spinner"
        description="Circular loading indicator with custom animation">
        <div className="flex justify-center">
          <Loader className="w-12 h-12 text-blue-500" />
        </div>
      </InteractionCard>

      <InteractionCard
        title="Progress Bar"
        description="Linear progress indicator with percentage">
        <div className="space-y-4">
          <button
            onClick={simulateProgress}
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            disabled={progress > 0 && progress < 100}
          >
            Start Progress
          </button>
          <ProgressBar progress={progress} />
        </div>
      </InteractionCard>

      <InteractionCard
        title="Loading Dots"
        description="Animated dots with cascading effect">
        <div className="flex justify-center">
          <LoadingDots />
        </div>
      </InteractionCard>

      <InteractionCard
        title="Circular Progress"
        description="Circular progress indicator with percentage">
        <div className="flex justify-center">
          <LoadingSpinner progress={75} />
        </div>
      </InteractionCard>
    </div>
  );
}