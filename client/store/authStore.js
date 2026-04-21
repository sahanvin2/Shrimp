import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  setSession: (session) => set(session),
  clearSession: () => set({ user: null, accessToken: null }),
}));
