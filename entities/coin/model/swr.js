"use client";

import useSWR from "swr";
import fetcher from "@/shared/lib/fetcher";
import fromCoin from "./mappers/fromCoin";
import fromMarkets from "./mappers/fromMarkets";
import fromChart from "./mappers/fromChart";

const config = {
    dedupeInterval: 10_000,
    focusThrottleInterval: 5_000,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    keepPreviousData: true,
};

export function useCoin(id) {
    const { data, error, isLoading } = useSWR(
        id ? `/api/coin/${id}` : null,
        fetcher,
        config
    );

    const coinData = data ? fromCoin(data) : undefined;

    return { coinData, error, isLoading };
}

export function useMarkets() {
    const { data, error, isLoading, isValidating } = useSWR(
        "/api/markets",
        fetcher,
        config
    );

    const markets = (data ?? []).map(fromMarkets);

    return { markets, error, isLoading, isValidating };
}

export function useCoinChart(id) {
    const { data, error, isLoading } = useSWR(
        id ? `/api/coin/${id}/market_chart` : null,
        fetcher,
        config
    );

    const chartData = data ? fromChart(data) : undefined;

    return { chartData, error, isLoading };
}
