import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useThemeStore = create(
  devtools(
    persist(
      (set) => ({
        theme: null,
        setTheme: (theme) => set({ theme })
      }),
      {
        name: 'userStore', // Nombre para identificar el middleware de persistencia
        getStorage: () => localStorage, // Puedes cambiar a localStorage si prefieres persistencia persistente
      }
    )
  )
);

export default useThemeStore;
