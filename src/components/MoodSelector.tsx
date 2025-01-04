import React from 'react';
import { useCharacterStore } from '../stores/characterStore';

const moods = ['😊', '🎵', '💃', '🕺', '😎', '🌟'];

export const MoodSelector = () => {
  const { setMood, mood } = useCharacterStore();
  
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
      <h3 className="text-white text-sm font-medium mb-2">Select Mood</h3>
      <div className="flex gap-2">
        {moods.map((m) => (
          <button
            key={m}
            onClick={() => setMood(m)}
            className={`text-2xl p-2 rounded-full transition-all ${
              mood === m ? 'bg-white/20 scale-110' : 'hover:bg-white/10'
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
};