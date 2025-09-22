"use client";

import { create } from "zustand";
import { persist, createJSONStorage} from "zustand/middleware";

export const useUI = create(
  persist(
    (set) => ({
      onlyFav: false,
      toggleOnlyFav: () => set((s) => ({ onlyFav: !s.onlyFav })),
      setOnlyFav: (v) => set({ onlyFav: !!v }),
    }),
    {
        name: "fav-toggle",
        storage: createJSONStorage(() => localStorage),
    }
  )
);