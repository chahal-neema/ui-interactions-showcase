import React from 'react';
import { InteractionCard } from '../InteractionCard';
import { DraggableCard } from './GestureInteractions/DraggableCard';
import { SwipeableCards } from './GestureInteractions/SwipeableCards';
import { ZoomableImage } from './GestureInteractions/ZoomableImage';
import { RotatableObject } from './GestureInteractions/RotatableObject';
import { ResizableElement } from './GestureInteractions/ResizableElement';
import { DrawingCanvas } from './GestureInteractions/DrawingCanvas';

export function GestureInteractions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <InteractionCard
        title="Drag and Drop"
        description="Draggable element with smooth movement">
        <DraggableCard />
      </InteractionCard>

      <InteractionCard
        title="Swipe Cards"
        description="Swipeable cards with direction detection">
        <SwipeableCards />
      </InteractionCard>

      <InteractionCard
        title="Pinch to Zoom"
        description="Image with pinch/wheel zoom functionality">
        <ZoomableImage />
      </InteractionCard>

      <InteractionCard
        title="Rotate Object"
        description="Rotate an object using gesture controls">
        <RotatableObject />
      </InteractionCard>

      <InteractionCard
        title="Resize Element"
        description="Resize an element by dragging its corners">
        <ResizableElement />
      </InteractionCard>

      <InteractionCard
        title="Drawing Canvas"
        description="Draw on canvas using touch or mouse">
        <DrawingCanvas />
      </InteractionCard>
    </div>
  );
}