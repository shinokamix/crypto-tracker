'use client'
import { use } from "react";
import useSWR from "swr";
import fetcher from "@/app/misc/fetcher";
import format from "@/app/misc/format";

import CoinChart from "@/components/CoinChart";
import ThemeToggle from "@/components/ThemeToggle";



export default function CoinPage({params}) {
    const coin = use(params);
    const { data: coinData, error: coinError, isLoading: coinLoading } = useSWR(
    `/api/coins/${coin.id}`,
    fetcher,
    { 
        focusThrottleInterval: 5000,
        dedupeInterval: 10_000,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false,
    }
    );

    const { data: marketData, error: marketError, isLoading: marketLoading } = useSWR(
    `/api/coins/${coin.id}/market_chart`,
    fetcher,
    { 
        focusThrottleInterval: 5000,
        dedupeInterval: 10_000,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false,
    }
    );

    if (coinLoading || marketLoading) return <p>Загрузка...</p>;
    if (coinError || marketError) return <p>Ошибка загрузки</p>;

    const series = marketData.prices.map(([timestamp, price]) => ({
        value: price,
        time: Math.floor(timestamp / 1000)
    }))


    const price = format(coinData.market_data.current_price.usd);
    const market_cap = format(coinData.market_data.market_cap.usd);



    console.log(coin)
    return (
        <div className="flex flex-col font-sans font-semibold">
            <div className="ml-auto">
                <ThemeToggle />
            </div>
            <div className="flex m-5">
                <div>
                    <h1 className="font-mono text-9xl">
                        {`${coinData.name}`}
                    </h1>
                    <div>
                        <p> {"{"} </p>
                        <div className="ml-3">
                            <p> {`"current_price": ${price}`} </p>
                            <p> {`"market_cap": ${market_cap}`} </p>
                            <p> {`"market_cap":: ${coinData.market_cap}`} </p>
                            <p> {`"market_cap":: ${coinData.market_cap}`} </p>
                            <p> {`"market_cap":: ${coinData.market_cap}`} </p>
                            <p> {`"market_cap":: ${coinData.market_cap}`} </p>
                            <p> {`"market_cap":: ${coinData.market_cap}`} </p>
                        </div>
                        <p> {"}"} </p>
                    </div>
                </div>
                <div className="flex">
                    <CoinChart data={series}/>
                </div>
            </div>
            <div>
                <p className="m-3">
                    {coinData.description.en}
                </p>
            </div>
        </div>
    )
}