import { create } from 'zustand';

export const useFeedStore = create((set) => ({
  items: [],
  cursor: null,
  setItems: (items) => set({ items }),
  appendItems: (items) => set((state) => ({ items: [...state.items, ...items] })),
}));
