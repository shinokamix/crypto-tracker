"use client";

import useTheme from "@/shared/lib/useTheme";
import Image from "next/image";
import { useRef } from "react";
import FavoritesActive from "@/features/favorites/assets/FavoritesActive.svg";
import FavoritesActiveDark from "@/features/favorites/assets/FavoritesActiveDark.svg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function ActiveIcon() {
    const { isDark } = useTheme();

    const icon = isDark ? FavoritesActiveDark : FavoritesActive;

    const imageRef = useRef(null);

    useGSAP(() => {
        gsap.to(imageRef.current, {
            scale: 1.1,
            duration: 0.3,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
        });
    });

    return (
        <Image
            src={icon}
            alt=""
            aria-hidden
            width={32}
            height={32}
            className="w-5 h-5 sm:w-8 sm:h-8 transition-none"
            ref={imageRef}
        />
    );
}
