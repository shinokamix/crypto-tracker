"use client";

import { useFavorites } from "../model/store";
import { Button } from "@/shared/ui/button";
import { useRef, useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import ActiveIcon from "./parts/ActiveIcon";
import NotActiveIcon from "./parts/NotActiveIcon";

export default function FavoritesToggleButton() {
    const showOnlyFavorites = useFavorites((state) => state.showOnlyFavorites);
    const toggleShowOnlyFavorites = useFavorites(
        (state) => state.toggleShowOnlyFavorites
    );

    const [mounted, setMounted] = useState(false);

    const buttonRef = useRef(null);

    const lenis = useLenis();

    useEffect(() => {
        lenis?.scrollTo(0, { duration: 1.2 });
    }, [showOnlyFavorites, lenis]);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <Button
            type="button"
            size={"content"}
            variant="ghost"
            className={`hover:opacity-50 transition-all duration-300 cursor-pointer`}
            onClick={toggleShowOnlyFavorites}
            ref={buttonRef}
        >
            {showOnlyFavorites ? <ActiveIcon /> : <NotActiveIcon />}
        </Button>
    );
}
