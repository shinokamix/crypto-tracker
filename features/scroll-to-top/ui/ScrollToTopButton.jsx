"use client";

import { useState, useCallback, useEffect } from "react";
import { useLenis } from "lenis/react";
import Image from "next/image";

import arrowWhite from "../assets/arrowWhite.svg";
import arrowBlack from "../assets/arrowBlack.svg";
import { Button } from "@/shared/ui/button";
import useTheme from "@/shared/lib/useTheme";

function ArrowWhite() {
    return (
        <Image
            src={arrowWhite}
            alt="Arrow icon for light theme"
            fill
        />
    );
}

function ArrowBlack() {
    return (
        <Image
            src={arrowBlack}
            alt="Arrow icon for dark theme"
            fill
        />
    );
}

export function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { isDark } = useTheme();

    const lenis = useLenis(({ animatedScroll, limit }) => {
        setVisible(animatedScroll > 500 && limit - animatedScroll > 700);
    });

    const handleClick = useCallback(() => {
        lenis?.scrollTo(0, { duration: 1.2 });
    }, [lenis]);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="flex">
            <Button
                type="button"
                variant={"ghost"}
                size={"content"}
                onClick={handleClick}
                aria-label="Прокрутить наверх"
                className={`fixed bottom-6 right-10 z-50 rounded-full p-2.5
                ${visible ? "opacity-30" : "opacity-0 pointer-events-none"}
                bg-[var(--foreground)] cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-100
                `}
            >
                <div className="relative sm:h-5 h-3 sm:w-5 w-3">
                    {isDark ? <ArrowBlack /> : <ArrowWhite />}
                </div>
            </Button>
        </div>
    );
}
