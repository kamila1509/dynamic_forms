import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: 'userStore', // Nombre para identificar el middleware de persistencia
        getStorage: () => localStorage, // Puedes cambiar a localStorage si prefieres persistencia persistente
      }
    )
  )
);

export default useUserStore;
