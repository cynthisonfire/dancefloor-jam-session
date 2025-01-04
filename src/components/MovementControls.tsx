import React from 'react';
import { useCharacterStore } from '../stores/characterStore';

const movements = [
  { id: 'dance', label: 'Dance' },
  { id: 'skip', label: 'Skip' },
  { id: 'run', label: 'Run' },
  { id: 'still', label: 'Stand Still' },
];

export const MovementControls = () => {
  const { setMovement, setIsAutoDancing, movement, isAutoDancing } = useCharacterStore();
  
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
      <h3 className="text-white text-sm font-medium mb-2">Movement Style</h3>
      <div className="flex gap-2">
        {movements.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => {
              setMovement(id);
              setIsAutoDancing(id === 'dance');
            }}
            className={`px-3 py-1 rounded-full text-sm transition-all ${
              movement === id
                ? 'bg-white text-purple-900'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};