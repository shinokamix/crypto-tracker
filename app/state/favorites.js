"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useFavorites = create(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => {
        const { ids } = get();
        set({ ids: ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id] });
      },
      clear: () => set({ ids: [] }),    
    }),
    {
      name: "fav-coins",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
