"use client";

import { useFavorites } from "@/app/state/favorites";
import Image from "next/image";
import { useTheme } from "next-themes";

import favoritesAdded from "../public/favoritesAdded.svg"
import favoritesAdd from "../public/favoritesAdd.svg"
import favoritesAddedDark from "../public/favoritesAddedDark.svg"
import favoritesAddDark from "../public/favoritesAddDark.svg"



function Added() {
  return (
    <>
      <Image src={favoritesAdded} alt="Added" width={16} height={16} className="block dark:hidden hover: scale-110"/>
      <Image src={favoritesAddedDark} alt="Added" width={16} height={16} className="hidden dark:block hover: scale-110"/>
    </>
  )
}

function Add() {
  return (
    <>
      <Image src={favoritesAdd} alt="Added" width={16} height={16} className="block dark:hidden hover: scale-110"/>
      <Image src={favoritesAddDark} alt="Added" width={16} height={16} className="hidden dark:block hover: scale-110"/>
    </>
  )
}

export default function FavoriteButton({ id }) {
  const active = useFavorites(s => s.ids.includes(id));
  const toggle = useFavorites(s => s.toggle);

  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "Dark";

  return (
    <button
      onClick={() => toggle(id)}
      aria-pressed={active}
      title={active ? "В избранном" : "Добавить в избранное"}
      className={`px-2 text-xl ml-auto hover: cursor-pointer`}
    >
      {active ? <Added /> : <Add />}
    </button>
  );
}