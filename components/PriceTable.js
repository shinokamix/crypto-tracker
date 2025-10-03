"use client";

import useSWR from "swr";

import FavoriteButton from "./FavoriteButton";
import { useUI } from "@/app/state/ui";
import { useFavorites } from "@/app/state/favorites";
import ScrumbleText from "./ScrumleText";
import PriceTableSceleton from "./PriceTableSceleton";
import PriceTableErrorBox from "./PriceTableErrorBox";

import Link from "next/link";
import Image from "next/image";

import fetcher from "@/app/misc/fetcher";
import format from "@/app/misc/format";


export default function PriceTable() {
  const { data, error, isLoading } = useSWR("/api/markets", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });
  

  const favoritesId = useFavorites(s => s.ids);
  const favoritesSet = new Set(favoritesId);
  const onlyFav = useUI(s => s.onlyFav);

  if (isLoading) return <PriceTableSceleton />
  if (error) {
    console.log(error)
    return <PriceTableErrorBox error={error}/>
  }

  const visible = onlyFav ? data.filter(c => favoritesSet.has(c.id)) : data;

  return (
    <div>
      <div className="text-center my-30 h-32">
        <ScrumbleText text={"Crypto Prices"} className={"justify-center"}/>
      </div>
      <div className="overflow-x-auto flex justify-center align-middle">
        <table className="bg-[var(--tableColor)] w-5xl table-auto border-separate text-left border-spacing-y-3">

          <colgroup>
            <col className="w-[70%]" />
            <col className="w-[10%]" />
            <col className="w-[10%]" />
            <col className="w-[10%]" />
          </colgroup>

          <thead className="h-16">
            <tr className="h-9">
              <th scope="col" className="">
                <div className="flex ml-18">
                  <p>Name</p>
                </div>
              </th>
              <th scope="col" className="px-4 py-2 text-right">Price</th>
              <th scope="col" className="px-4 py-2 text-right">24H%</th>
              <th scope="col" className="px-4 py-2 text-right"></th>
            </tr>
            <tr className="bg-[var(--background)] h-3">
              <td className=""></td>
              <td className=""></td>
              <td className=""></td>
              <td className=""></td>
            </tr>
          </thead>

          <tbody className="">
            {visible.map((coin) => {

              return (
                <tr key={coin.id} className="h-12 bg-[var(--background)] hover:bg-[var(--accentColor)] transform-all duration-300 hover:scale-101 transform-gpu">
                  <td className="px-4">
                    <Link
                      href={`/coin/${coin.id}`}
                      className=""
                    >
                      <div className="flex items-center py-2">
                        <Image src={coin.image}  width={32} height={32} alt="coin image" className="mx-3 w-auto h-auto"/>
                        <span className="mr-1">{coin.name}</span>
                        <span className="uppercase">
                          ({coin.symbol?.toUpperCase()})
                        </span>
                      </div>
                    </Link>
                  </td>

                  <td className="px-4 py-2 text-right tabular-nums">
                    {format(coin.current_price)}
                  </td>

                  <td className={`px-4 py-2 text-right tabular-nums ${coin.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>

                  <td className="px-4 py-2">
                    <div className="flex justify-center">
                      <FavoriteButton id={coin.id} />
                    </div>
                  </td>
                </tr>
              );
            })}

            {onlyFav && visible.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center">
                  В избранном пусто.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}