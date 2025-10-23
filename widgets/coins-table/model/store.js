"use client";
import { create } from "zustand";
import {
    persist,
    subscribeWithSelector,
    createJSONStorage,
} from "zustand/middleware";

const DEFAULTS = {
    pageIndex: 0,
    pageSize: 50,
    sorting: [],
};

export const useTableStore = create()(
    persist(
        subscribeWithSelector((set) => ({
            ...DEFAULTS,

            setPageIndex: (updater) =>
                set((s) => ({
                    pageIndex:
                        typeof updater === "function"
                            ? updater(s.pageIndex)
                            : updater,
                })),

            setSorting: (updater) =>
                set((s) => ({
                    sorting:
                        typeof updater === "function"
                            ? updater(s.sorting)
                            : updater,
                })),
        })),
        {
            name: "TableStore",
            storage:
                typeof window !== "undefined"
                    ? createJSONStorage(() => localStorage)
                    : undefined,
            partialize: (s) => ({
                pageIndex: s.pageIndex,
                pageSize: s.pageSize,
                sorting: s.sorting,
            }),
        }
    )
);
