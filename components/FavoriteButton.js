"use client";

import { useFavorites } from "@/app/state/favorites";

export default function FavoriteButton({ id }) {
  const active = useFavorites(s => s.ids.includes(id));
  const toggle = useFavorites(s => s.toggle);

  return (
    <button
      onClick={() => toggle(id)}
      aria-pressed={active}
      title={active ? "В избранном" : "Добавить в избранное"}
      className={`px-2 text-xl ${active ? "text-yellow-500" : "text-gray-400"}`}
    >
      ★
    </button>
  );
}