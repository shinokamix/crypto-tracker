'use client'
import { use } from "react";
import useSWR from "swr";
import fetcher from "@/app/misc/fetcher";

import CoinChart from "@/components/CoinChart";

export default function CoinPage({params}) {
    const coin = use(params);
    const { data: coinData, error: coinError, isLoading: coinLoading } = useSWR(
    `/api/coins/${coin.id}`,
    fetcher
    );

    const { data: marketData, error: marketError, isLoading: marketLoading } = useSWR(
    `/api/coins/${coin.id}/market_chart`,
    fetcher
    );

    if (coinLoading || marketLoading) return <p>Загрузка...</p>;
    if (coinError || marketError) return <p>Ошибка загрузки</p>;

    const series = marketData.prices.map(([timestamp, price]) => ({
        value: price,
        time: Math.floor(timestamp / 1000)
    }))

    console.log(coin)
    return (
        <div className="">
            <h1 className="m-3">
                {`Hello it's ${coinData.name}`}
            </h1>
            <div className="flex">
                <p className="m-3">
                    {coinData.description.en}
                </p>
                <CoinChart data={series}/>
            </div>
        </div>
    )
}