import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';

export function ResizableElement() {
  const [size, setSize] = useState({ width: 100, height: 100 });
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(50, startWidth + e.clientX - startX);
      const newHeight = Math.max(50, startHeight + e.clientY - startY);
      setSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="flex items-center justify-center h-32">
      <div
        style={{
          width: size.width,
          height: size.height,
          maxWidth: '200px',
          maxHeight: '200px'
        }}
        className={`
          relative bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg shadow-lg
          ${isResizing ? 'cursor-nwse-resize' : ''}
        `}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Maximize2 className="text-white/90" />
        </div>
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
}