"use client";

import { CoinName } from "@/widgets/coin-name";
import { CoinChart } from "@/widgets/coin-chart";
import { CoinMetrics } from "@/widgets/coin-metrics";
import { CoinDescription } from "@/widgets/coin-description";
import CoinOverviewSceleton from "./CoinOverviewSceleton";

import { useCoin, useCoinChart } from "@/entities/coin";
import { useEffect, useState } from "react";

export default function CoinOverview({ id, className }) {
    const {
        coinData = [],
        error: coinError,
        isLoading: coinIsLoading,
    } = useCoin(id);

    const {
        chartData = [],
        error: chartError,
        isLoading: chartIsLoading,
    } = useCoinChart(id);

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true));

    if (!mounted) return null;

    if (coinIsLoading || chartIsLoading) return <CoinOverviewSceleton />;

    if (coinError || chartError) {
        return null;
    }

    return (
        <div
            className={`flex flex-col font-sans xl:mx-50 lg:mx-20 sm:mx-10 mx-5 ${className}`}
        >
            <section>
                <CoinName
                    coinData={coinData}
                    className={"xl:text-9xl sm:text-8xl text-5xl"}
                />
            </section>

            <section className="flex sm:mt-20 mt-10 justify-between xl:h-80 h-60">
                <CoinMetrics
                    coinData={coinData}
                    className={""}
                />
                <CoinChart
                    chartData={chartData}
                    className={"h-full  lg:w-auto md:w-80 w-60 sm:block hidden"}
                />
            </section>

            <section className="sm:my-20 my-10">
                <CoinDescription coinData={coinData} />
            </section>
        </div>
    );
}
