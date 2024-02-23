import create from 'zustand';
import { devtools } from 'zustand/middleware';

const useUserStore = create(devtools((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
})));
export default useUserStore;
