"use client";

import useTheme from "@/shared/lib/useTheme";
import { Button } from "@/shared/ui/button";
import { useRef, useState, useEffect } from "react";
import ThemeToggleIcon from "./parts/ThemeToggleIcon.jsx";

import gsap from "gsap";

export default function ThemeToggle() {
    const { toggleTheme } = useTheme();
    const buttonRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    const handleClick = () => {
        gsap.to(buttonRef.current, {
            rotation: "+=360",
            duration: 0.3,
            ease: "power1.inOut",
        });

        toggleTheme();
    };

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <Button
            type="button"
            variant={"ghost"}
            size={"content"}
            aria-label="Toggle theme"
            onClick={handleClick}
            className={"cursor-pointer transition-none"}
            ref={buttonRef}
        >
            <ThemeToggleIcon />
        </Button>
    );
}
