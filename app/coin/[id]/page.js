'use client'
import { use } from "react";
import useSWR from "swr";
import fetcher from "@/app/misc/fetcher";
import format from "@/app/misc/format";

import CoinChart from "@/components/CoinChart";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";

import return_dark from "@/public/return.svg"
import return_light from "@/public/return_light.svg"


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

    const {resolvedTheme} = useTheme();


    if (coinLoading || marketLoading) return <p>Загрузка...</p>;
    if (coinError || marketError) return <p>Ошибка загрузки</p>;

    const series = marketData.prices.map(([timestamp, price]) => ({
        value: price,
        time: Math.floor(timestamp / 1000)
    }))


    const price = format(coinData.market_data.current_price.usd);
    const market_cap = format(coinData.market_data.market_cap.usd);
    const price_change_percentage_24h = coinData.market_data.price_change_percentage_24h.toFixed(2);
    const ath_change_percentage = coinData.market_data.ath_change_percentage.usd.toFixed(2);

    const homepage = coinData.links.homepage;
    const whitepaper = coinData.links.whitepaper;


    console.log(coin)
    return (
        <div className="flex flex-col font-sans font-semibold">
            <div className="flex justify-between p-5">
                <Link href={"/"} className="m-3 cursor-pointer transition-all duration-300 hover:scale-110">
                    <Image src={resolvedTheme === "dark" ? return_light : return_dark} alt="return" height={32} width={32}/>
                </Link>
                <ThemeToggle />
            </div>
            <div className="flex mx-80 justify-between">
                <div>
                    <h1 className="font-mono text-9xl">
                        {`${coinData.name}`}
                    </h1>
                    <div className="mt-10">
                        <p> {"{"} </p>

                        <div className="ml-5">
                            <p>{`"market_data": {`}</p>
                            <div className="ml-5 tabular-nums">
                                <p> {`"current_price": ${price}`} </p>
                                <span className="flex gap-1">
                                    <p>
                                        {`"price_change_percentage_24h":`}
                                    </p>
                                    <p className={`${price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600"}`}> 
                                        {`${price_change_percentage_24h}%`} 
                                    </p>
                                </span>
                                <p> {`"market_cap": ${market_cap}`} </p>
                                <span className="flex gap-1">
                                    <p>
                                        {`"ath_change_percentage":`}
                                    </p>
                                    <p className={`${ath_change_percentage >= 0 ? "text-green-600" : "text-red-600"}`}>
                                        {`${ath_change_percentage}%`} 
                                    </p>
                                </span>
                            </div>
                            <p>{"},"}</p>
                            

                            
                            <p>{`"links": {`}</p>
                                <div className="ml-5">
                                    <span className="flex gap-1">
                                        <p>{`"homepage:"`}</p>
                                        <Link href={homepage} alt="whitepaper link" className="hover:underline">{homepage}</Link>
                                    </span>

                                    {whitepaper ? 
                                        <span className="flex gap-1">
                                            <p>{`"whitepaper:"`}</p>
                                            <Link href={whitepaper} alt="whitepaper link" className="hover:underline">{whitepaper}</Link>
                                        </span>
                                        :
                                        <></>
                                    }
                                    {/* <span className="flex gap-1">
                                        <p>{`"whitepaper:"`}</p>
                                        <Link href={whitepaper} alt="whitepaper link" className="hover:underline">{whitepaper}</Link>
                                    </span> */}
                                </div>
                            <p>{"}"}</p>
                        </div>

                        <p> {"}"} </p>
                    </div>
                </div>
                <div className="flex mt-30 border-1">
                    <CoinChart data={series}/>
                </div>
            </div>
            <div>
                <p className="mt-20 mx-80">
                    {coinData.description.en}
                </p>
            </div>
        </div>
    )
}