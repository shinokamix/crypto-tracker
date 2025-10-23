"use client";

import useTheme from "../lib/useTheme";
import ArrowWhite from "../assets/arrowWhite.svg";
import ArrowBlack from "../assets/arrowBlack.svg";
import Image from "next/image";

export default function Arrow({ rotate, className }) {
    const { isDark } = useTheme();

    const icon = isDark ? ArrowWhite : ArrowBlack;

    return (
        <Image
            src={icon}
            alt="arrow"
            width={32}
            height={32}
            className={`w-5 h-5 sm:w-8 sm:h-8 ${
                rotate ? "rotate-180" : ""
            } ${className}`}
        />
    );
}
