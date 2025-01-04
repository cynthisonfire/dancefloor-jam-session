import React, { useEffect, useState } from 'react';
import Character from './Character';
import { useCharacterStore } from '../stores/characterStore';
import { RadioPlayer } from './RadioPlayer';
import { MoodSelector } from './MoodSelector';
import { MovementControls } from './MovementControls';

const DanceFloor = () => {
  const { position, setPosition, isAutoDancing } = useCharacterStore();
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isAutoDancing) return;
      
      const newPosition = { ...position };
      switch (e.key) {
        case 'ArrowUp':
          newPosition.y = Math.max(0, position.y - 1);
          break;
        case 'ArrowDown':
          newPosition.y = Math.min(7, position.y + 1);
          break;
        case 'ArrowLeft':
          newPosition.x = Math.max(0, position.x - 1);
          break;
        case 'ArrowRight':
          newPosition.x = Math.min(7, position.x + 1);
          break;
      }
      setPosition(newPosition);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [position, setPosition, isAutoDancing]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-purple-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <RadioPlayer />
        <div className="flex gap-4 mb-8">
          <MoodSelector />
          <MovementControls />
        </div>
        <div className="bg-dancefloor p-4 rounded-xl grid grid-cols-8 grid-rows-8 gap-1 aspect-square relative">
          {Array.from({ length: 64 }).map((_, index) => (
            <div
              key={index}
              className="border border-purple-700/20 rounded"
            />
          ))}
          <Character />
        </div>
      </div>
    </div>
  );
};

export default DanceFloor;