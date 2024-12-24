import React from 'react';

interface ContentSectionProps {
  title: string;
  content: string;
  align: 'left' | 'right';
}

export function ContentSection({ title, content, align }: ContentSectionProps) {
  return (
    <div className={`max-w-4xl mx-auto px-6 text-${align}`}>
      <h2 className="text-4xl font-bold mb-8">{title}</h2>
      <p className="text-lg text-gray-600 mb-6">{content}</p>
    </div>
  );
}