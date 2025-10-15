import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


export const useTableStore = create(
    persist(
        (set) => ({
            pageIndex: 0,
            pageSize: 50,
            sorting: [], // [{id, desc}]
            globalFilter: "",
            setPageIndex: (updater) =>
                set((s) => ({ pageIndex: typeof updater === "function" ? updater(s.pageIndex) : updater })),
            setSorting: (updater) =>
                set((s) => ({ sorting: typeof updater === "function" ? updater(s.sorting) : updater })),
            setGlobalFilter: (v) => set(() => ({ globalFilter: v, pageIndex: 0 })),
        }),
        {
            name: "TableStore",
            storage: createJSONStorage(() => localStorage),
        }
    )
);