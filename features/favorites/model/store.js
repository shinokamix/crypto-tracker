"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavorites = create(
    persist(
        (set, get) => ({
            ids: [],
            showOnlyFavorites: false,

            toggleFavorite: (id) =>
                set((state) => {
                    const has = state.ids.includes(id);
                    return {
                        ids: has
                            ? state.ids.filter((x) => x !== id)
                            : [...state.ids, id],
                    };
                }),

            isFavorite: (id) => get().ids.includes(id),

            clearFavorites: () => set({ ids: [] }),

            toggleShowOnlyFavorites: () =>
                set((state) => ({
                    showOnlyFavorites: !state.showOnlyFavorites,
                })),

            setShowOnlyFavorites: (val) => set({ showOnlyFavorites: !!val }),
        }),
        {
            name: "favorites",
            partialize: (state) => ({
                ids: state.ids,
                showOnlyFavorites: state.showOnlyFavorites,
            }),
        }
    )
);
