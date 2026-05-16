import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Profile, Language } from '@/types';

interface AppState {
  profile: Profile | null;
  language: Language;
  darkMode: boolean;
  setProfile: (profile: Profile | null) => void;
  setLanguage: (lang: Language) => void;
  toggleDarkMode: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      profile: null,
      language: 'en',
      darkMode: false,
      setProfile: (profile) => set({ profile }),
      setLanguage: (language) => set({ language }),
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
    }),
    { name: 'examalert-store', partialize: (s) => ({ language: s.language, darkMode: s.darkMode }) }
  )
);
