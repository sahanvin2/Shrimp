import { create } from 'zustand';

export const usePlayerStore = create((set) => ({
  currentVideoId: null,
  isMuted: true,
  setCurrentVideoId: (currentVideoId) => set({ currentVideoId }),
  setMuted: (isMuted) => set({ isMuted }),
}));
