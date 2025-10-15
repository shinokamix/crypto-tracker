"use client";

import { useFavorites } from "@/app/state/favorites";
import Image from "next/image";

import favoritesAdded from "../public/favoritesAdded.svg"
import favoritesAdd from "../public/favoritesAdd.svg"
import favoritesAddedDark from "../public/favoritesAddedDark.svg"
import favoritesAddDark from "../public/favoritesAddDark.svg"

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP)
import { useRef } from "react";

function Added() {
  return (
    <>
      <Image src={favoritesAdded} alt="Added" width={18} height={18} className="block dark:hidden hover:scale-110 transition-all duration-300 sm:h-4 sm:w-4 w-3 h-3"/>
      <Image src={favoritesAddedDark} alt="Added" width={18} height={18} className="hidden dark:block hover:scale-110 transition-all duration-300 sm:h-4 sm:w-4 w-3 h-3"/>
    </>
  )
}

function Add() {
  return (
    <>
      <Image src={favoritesAdd} alt="Added" width={18} height={18} className="block dark:hidden hover:scale-110 transition-all duration-300 sm:h-4 sm:w-4 w-3 h-2"/>
      <Image src={favoritesAddDark} alt="Added" width={18} height={18} className="hidden dark:block hover:scale-110 transition-all duration-300 sm:h-4 sm:w-4 w-3 h-3"/>
    </>
  )
}

export default function FavoriteButton({ id }) {
  const active = useFavorites(s => s.ids.includes(id));
  const toggle = useFavorites(s => s.toggle);

  const buttonRef = useRef(null);

  const handleClick = () => {

    gsap.fromTo(
      buttonRef.current,
      { rotation: 0 }, { 
        rotation: 360, 
        duration: 0.3,  
    /*  onComplete: () => toggle(id) */}
    );

    toggle(id)
  };

  return (
    <button
      onClick={handleClick}
      aria-pressed={active}
      title={active ? "В избранном" : "Добавить в избранное"}
      className={`cursor-pointer`}
      ref={buttonRef}
    >
      {active ? <Added /> : <Add />}
    </button>
  );
}