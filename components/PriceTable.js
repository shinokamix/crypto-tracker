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
  <div className="flex justify-center align-middle my-5">
    <ul className="border-2 w-2xl">
      {visible.map((coin) => (
        <li key={coin.id } >
          <Link href={`/coin/${coin.id}`} className="p-1.5 flex justify-between">
            <p> {coin.name} ({coin.symbol.toUpperCase()})</p>
            <div className="flex">
              <p> {coin.current_price} </p>
              <FavoriteButton id={coin.id} />
            </div>
          </Link>
        </li>
      ))}
      {onlyFav && visible.length === 0 && (
        <p className="text-xl">В избранном пусто. Нажми ★ у нужных монет.</p>
      )}
    </ul>
    
  </div>
  )
}