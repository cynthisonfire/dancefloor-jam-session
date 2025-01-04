import { create } from 'zustand';

interface Position {
  x: number;
  y: number;
}

interface CharacterStore {
  position: Position;
  mood: string;
  movement: string;
  isAutoDancing: boolean;
  setPosition: (position: Position) => void;
  setMood: (mood: string) => void;
  setMovement: (movement: string) => void;
  setIsAutoDancing: (isAutoDancing: boolean) => void;
}

export const useCharacterStore = create<CharacterStore>((set) => ({
  position: { x: 3, y: 3 },
  mood: '😊',
  movement: 'still',
  isAutoDancing: false,
  setPosition: (position) => set({ position }),
  setMood: (mood) => set({ mood }),
  setMovement: (movement) => set({ movement }),
  setIsAutoDancing: (isAutoDancing) => set({ isAutoDancing }),
}));