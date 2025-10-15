"use client";
import { useUI } from "@/app/state/ui";
import Image from "next/image";

import FavoritesNotActive from "../public/FavoritesNotActive.svg"
import FavoritesNotActiveDark from "../public/FavoritesNotActiveDark.svg"
import FavoritesActive from "../public/FavoritesActive.svg"
import FavoritesActiveDark from "../public/FavoritesActiveDark.svg"
import { useEffect, useRef } from "react";

import { useLenis } from 'lenis/react'


import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

function Active() {
  return (
    <>
      <Image src={FavoritesActive} alt="" height={32} width={32} className="active block dark:hidden sm:h-8 sm:w-8 w-5 h-5"/>
      <Image src={FavoritesActiveDark} alt="" height={32} width={32} className="active hidden dark:block sm:h-8 sm:w-8 w-5 h-5"/>
    </>
  )
}

function NotActive() {
  return (
    <>
      <Image src={FavoritesNotActive} alt="" height={32} width={32} className="block dark:hidden sm:h-8 sm:w-8 w-5 h-5"/>
      <Image src={FavoritesNotActiveDark} alt="" height={32} width={32} className="hidden dark:block sm:h-8 sm:w-8 w-5 h-5"/>
    </>
  )
}

export default function FavoritesToggle() {
  const onlyFav = useUI(s => s.onlyFav);
  const toggleOnlyFav = useUI(s => s.toggleOnlyFav);

  const buttonRef = useRef(null);

  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { duration: 1.2 })
  }, [onlyFav, lenis])


  useGSAP(
    () => {
      if (onlyFav) {
            // анимируем ТОЛЬКО активную иконку внутри кнопки
        const t = gsap.to(".active", {
          scale: 1.1,
          duration: 0.3,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
        });

      return () => t.kill();
      }
    }, {scope: buttonRef, dependencies: [onlyFav]}
  );

  return (
    <button
    onClick={toggleOnlyFav}
    className="m-3 cursor-pointer transform-all duration-300 hover:scale-110"
    ref={buttonRef}
    >
      {onlyFav ? <Active /> : <NotActive />}
    </button>
);
}
