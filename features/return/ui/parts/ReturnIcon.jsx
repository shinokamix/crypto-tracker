"use client";

import light from "@/features/return/assets/returnLight.svg";
import dark from "@/features/return/assets/returnDark.svg";
import Image from "next/image";
import useTheme from "@/shared/lib/useTheme";
import { useEffect, useState } from "react";

export default function ReturnIcon() {
    const { isDark } = useTheme();

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <Image
            src={isDark ? dark : light}
            alt=""
            aria-hidden
            width={32}
            height={32}
            className="w-5 h-5 sm:w-8 sm:h-8 hover:opacity-50 transition-all duration-300"
        />
    );
}
