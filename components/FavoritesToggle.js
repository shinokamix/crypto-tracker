"use client";
import { useUI } from "@/app/state/ui";
import Image from "next/image";

import FavoritesNotActive from "../public/FavoritesNotActive.svg"
import FavoritesNotActiveDark from "../public/FavoritesNotActiveDark.svg"
import FavoritesActive from "../public/FavoritesActive.svg"
import FavoritesActiveDark from "../public/FavoritesActiveDark.svg"

function Active() {
  return (
    <>
      <Image src={FavoritesActive} alt="" height={32} width={32} className="block dark:hidden"/>
      <Image src={FavoritesActiveDark} alt="" height={32} width={32} className="hidden dark:block"/>
    </>
  )
}

function NotActive() {
  return (
    <>
      <Image src={FavoritesNotActive} alt="" height={32} width={32} className="block dark:hidden"/>
      <Image src={FavoritesNotActiveDark} alt="" height={32} width={32} className="hidden dark:block"/>
    </>
  )
}

export default function FavoritesToggle() {
  const onlyFav = useUI(s => s.onlyFav);
  const toggleOnlyFav = useUI(s => s.toggleOnlyFav);

  return (
    <button
    onClick={toggleOnlyFav}
    className="m-3 hover: cursor-pointer"
    >
      {onlyFav ? <Active /> : <NotActive />}
    </button>
);
}
