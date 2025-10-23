"use client";

import { create } from "zustand";

export const useSearch = create((set) => ({
    query: "",
    setQuery: (q) => set({ query: q }),
}));
