"use client";

import { useMarkets } from "@/entities/coin/model/swr";
import { useEffect, useMemo, useCallback } from "react";
import { useFavorites } from "@/features/favorites/model/store";
import { useTableStore } from "../../../shared/model/useTableStore";
import { useSearch } from "@/features/search/model/store";
import tableColumns from "../model/columns";
import TableView from "./TableView";
import { refreshScroll } from "@/shared/lib/refreshScroll";

import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";

export default function CoinsTable() {
    const { markets = [], error, isLoading } = useMarkets();

    const favoritesId = useFavorites((s) => s.ids);
    const showOnlyFavorites = useFavorites((s) => s.showOnlyFavorites);

    const favoritesSet = useMemo(() => new Set(favoritesId), [favoritesId]);

    const visible = useMemo(
        () =>
            showOnlyFavorites
                ? markets.filter((c) => favoritesSet.has(c.id))
                : markets,
        [showOnlyFavorites, markets, favoritesSet]
    );

    const pageIndex = useTableStore((s) => s.pageIndex);
    const pageSize = useTableStore((s) => s.pageSize);
    const sorting = useTableStore((s) => s.sorting);

    const setPageIndex = useTableStore((s) => s.setPageIndex);
    const setPageSize = useTableStore((s) => s.setPageSize);
    const setSorting = useTableStore((s) => s.setSorting);

    const query = useSearch((s) => s.query);
    const setQuery = useSearch((s) => s.setQuery);

    const columns = useMemo(() => tableColumns, []);

    const handleGlobalFilterChange = useCallback(
        (q) => {
            const next = q ?? "";
            if (next === query) return;
            setQuery(next);
            setPageIndex(0);
        },
        [query, setQuery, setPageIndex]
    );

    const table = useReactTable({
        data: visible,
        columns,
        state: {
            sorting,
            globalFilter: query,
            pagination: { pageIndex, pageSize },
        },
        onSortingChange: setSorting,
        autoResetPageIndex: false,
        onGlobalFilterChange: handleGlobalFilterChange,
        onPaginationChange: (updater) => {
            const next =
                typeof updater === "function"
                    ? updater({ pageIndex, pageSize })
                    : updater;
            if (next.pageIndex !== pageIndex) setPageIndex(next.pageIndex);
            if (next.pageSize !== pageSize) setPageSize(next.pageSize);
        },
        enableSortingRemoval: true,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    useEffect(() => {
        refreshScroll();
    }, [showOnlyFavorites, visible.length, sorting, pageIndex, pageSize]);

    return (
        <TableView
            table={table}
            error={error}
            isLoading={isLoading}
        />
    );
}
