import React from 'react';
import { Info } from 'lucide-react';

interface InteractionCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function InteractionCard({ title, description, children }: InteractionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="group relative">
          <Info className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-help" />
          <div className="invisible group-hover:visible absolute right-0 w-64 p-2 mt-2 text-sm text-gray-600 bg-white border rounded-md shadow-lg">
            {description}
          </div>
        </div>
      </div>
      <div className="border-t pt-4">
        {children}
      </div>
    </div>
  );
}