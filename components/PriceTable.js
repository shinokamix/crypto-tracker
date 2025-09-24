"use client";

import useSWR from "swr";

import FavoriteButton from "./FavoriteButton";
import { useUI } from "@/app/state/ui";
import { useFavorites } from "@/app/state/favorites";
import Link from "next/link";
import fetcher from "@/app/misc/fetcher";

export default function PriceTable() {
  const { data, error, isLoading } = useSWR("/api/markets", fetcher);

  const favoritesId = useFavorites(s => s.ids);
  const favoritesSet = new Set(favoritesId);
  const onlyFav = useUI(s => s.onlyFav);

  if (isLoading) return <p>Загрузка</p>
  if (error) {
    console.log(error)
    return <p>ошибка</p>
  }

  const visible = onlyFav ? data.filter(c => favoritesSet.has(c.id)) : data;


  return (
    <div className="my-5 overflow-x-auto flex justify-center align-middle">
      <table className="w-5xl table-auto border-collapse text-left">

        <colgroup>
          <col className="w-[50%]" />
          <col className="w-[20%]" />
          <col className="w-[15%]" />
          <col className="w-[15%]" />
        </colgroup>

        <thead className="">
          <tr>
            <th scope="col" className="px-4 py-2">Name</th>
            <th scope="col" className="px-4 py-2 text-right">Price</th>
            <th scope="col" className="px-4 py-2 text-right">24H%</th>
            <th scope="col" className="px-4 py-2 text-right"></th>
          </tr>
        </thead>

        <tbody>
          {visible.map((coin) => {
            const change = coin.price_change_percentage_24h;
            const changeClass =
              typeof change === "number"
                ? change >= 0
                  ? "text-green-600"
                  : "text-red-600"
                : "text-muted-foreground";

            return (
              <tr key={coin.id} className="border-t hover:bg-amber-400">
                <td className="px-4 py-2">
                  <Link
                    href={`/coin/${coin.id}`}
                    className="inline-flex items-center gap-2 hover:underline"
                  >
                    <span>{coin.name}</span>
                    <span className="uppercase">
                      ({coin.symbol?.toUpperCase()})
                    </span>
                  </Link>
                </td>

                <td className="px-4 py-2 text-right tabular-nums">
                  {coin.current_price}
                </td>

                <td className={`px-4 py-2 text-right tabular-nums ${changeClass}`}>
                  {change}%
                </td>

                <td className="px-4 py-2 text-right">
                  <FavoriteButton id={coin.id} />
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
  );
}