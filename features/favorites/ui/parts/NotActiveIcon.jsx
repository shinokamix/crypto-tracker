"use client";
import useTheme from "@/shared/lib/useTheme";
import Image from "next/image";
import FavoritesNotActive from "@/features/favorites/assets/FavoritesNotActive.svg";
import FavoritesNotActiveDark from "@/features/favorites/assets/FavoritesNotActiveDark.svg";

export default function NotActiveIcon() {
    const { isDark } = useTheme();

    const icon = isDark ? FavoritesNotActiveDark : FavoritesNotActive;

    return (
        <Image
            src={icon}
            alt=""
            aria-hidden
            width={32}
            height={32}
            className="w-5 h-5 sm:w-8 sm:h-8"
        />
    );
}
