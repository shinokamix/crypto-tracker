"use client";

import { useFavorites } from "../model/store";
import useTheme from "@/shared/lib/useTheme";
import Image from "next/image";
import { Button } from "@/shared/ui/button";
import { useRef } from "react";
import gsap from "gsap";

import FavoritesAdd from "../assets/FavoritesAdd.svg";
import FavoritesAddDark from "../assets/FavoritesAddDark.svg";
import FavoritesAdded from "../assets/FavoritesAdded.svg";
import FavoritesAddedDark from "../assets/FavoritesAddedDark.svg";

function Add() {
    const { isDark } = useTheme();
    const icon = isDark ? FavoritesAddDark : FavoritesAdd;

    return (
        <Image
            src={icon}
            alt=""
            fill
            className="hover:scale-110 transition-all duration-300"
        />
    );
}

function Added() {
    const { isDark } = useTheme();
    const icon = isDark ? FavoritesAddedDark : FavoritesAdded;

    return (
        <Image
            src={icon}
            alt=""
            fill
            className="hover:scale-110 transition-all duration-300"
        />
    );
}

export default function FavoritesButton({ id }) {
    const isFavorite = useFavorites((state) => state.isFavorite(id));
    const toggleFavorite = useFavorites((state) => state.toggleFavorite);

    const buttonRef = useRef(null);

    const handleClick = () => {
        gsap.fromTo(
            buttonRef.current,
            { rotation: 0 },
            {
                rotation: "360",
                duration: 0.3,
                ease: "power1.inOut",
            }
        );

        toggleFavorite(id);
    };

    return (
        <Button
            type="button"
            variant="ghost"
            size={"content"}
            className={
                "relative sm:w-4 sm:h-4 h-3 w-3 transition-none cursor-pointer"
            }
            onClick={handleClick}
            ref={buttonRef}
        >
            {isFavorite ? <Added /> : <Add />}
        </Button>
    );
}
