import React, { useState } from 'react';
import { Star } from 'lucide-react';

export const RadioPlayer = () => {
  const [rating, setRating] = useState<number>(0);
  
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-xl font-bold">Live Radio</h2>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="focus:outline-none"
            >
              <Star
                className={`w-6 h-6 ${
                  star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <audio
        controls
        className="w-full"
        src="https://ice1.somafm.com/groovesalad-128-mp3"
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};