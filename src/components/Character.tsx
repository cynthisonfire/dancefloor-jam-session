import React from 'react';
import { useCharacterStore } from '../stores/characterStore';

const Character = () => {
  const { position, mood, movement, isAutoDancing } = useCharacterStore();
  
  const getAnimationClass = () => {
    if (isAutoDancing) return 'animate-dance-bounce';
    switch (movement) {
      case 'skip':
        return 'animate-dance-bounce';
      case 'run':
        return 'animate-dance-spin';
      default:
        return '';
    }
  };

  return (
    <div
      className={`absolute transition-all duration-300 ${getAnimationClass()}`}
      style={{
        top: `${(position.y * 12.5)}%`,
        left: `${(position.x * 12.5)}%`,
        width: '12.5%',
        height: '12.5%',
      }}
    >
      <div className="relative">
        <div className="w-8 h-8 bg-white rounded-full"></div>
        <div className={`absolute -top-6 left-1/2 -translate-x-1/2 animate-mood-float`}>
          {mood}
        </div>
      </div>
    </div>
  );
};

export default Character;