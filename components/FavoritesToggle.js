"use client";
import { useUI } from "@/app/state/ui";

export default function FavoritesToggle() {
  const onlyFav = useUI(s => s.onlyFav);
  const toggleOnlyFav = useUI(s => s.toggleOnlyFav);

  return (
    <button
    onClick={toggleOnlyFav}
    className={`px-3 py-1 rounded border ${
        onlyFav
        ? "bg-white dark:bg-gray-900"
        : "bg-white dark:bg-gray-900"
    }`}
    >
    {onlyFav ? "Показать все" : "Избранное"}
    </button>
);
}
