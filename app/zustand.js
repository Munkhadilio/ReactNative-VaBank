import { create } from 'zustand';
import axios from './axios';

export const useZustand = create((set) => ({
  userState: {},
  isAuth: {},
  localUserState: {},
  addUser: (data) => set((state) => ({ userState: data })),
  getAuth: async () => {
    try {
      const { data } = await axios.get('/auth/me');
      set((state) => ({ isAuth: data }));
    } catch {
      console.error('Error fetching authentication');
    }
  },
  getProfile: async (accessToken) => {
    try {
      const { data } = await axios.get('/user/profile', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      set((state) => ({ localUserState: data }));
    } catch {
      console.error('Error fetching profile');
    }
  },
  getState: () => useZustand.getState(),
}));
