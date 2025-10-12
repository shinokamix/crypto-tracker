import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


export const useTableStore = create(
    persist(
        (set) => ({
            pageIndex: 0,
            pageSize: 25,
            sorting: [], // [{id, desc}]
            globalFilter: "",
            setPageIndex: (updater) =>
                set((s) => ({ pageIndex: typeof updater === "function" ? updater(s.pageIndex) : updater })),
            setPageSize: (size) => set(() => ({ pageSize: size, pageIndex: 0 })),
            setSorting: (updater) =>
                set((s) => ({ sorting: typeof updater === "function" ? updater(s.sorting) : updater })),
            setGlobalFilter: (v) => set(() => ({ globalFilter: v, pageIndex: 0 })),
            reset: () => set(() => ({ pageIndex: 0, pageSize: 25, sorting: [], globalFilter: "" })),
        }),
        {
            name: "TableStore",
            storage: createJSONStorage(() => localStorage),
        }
    )
);