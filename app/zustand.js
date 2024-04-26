import { create } from 'zustand';

export const useZustand = create((set) => ({
  userState: {},
  addUser: (data) => set((state) => ({ userState: data })),
}));
