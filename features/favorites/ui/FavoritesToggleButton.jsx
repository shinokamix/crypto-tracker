"use client";

import { useFavorites } from "../model/store";
import { Button } from "@/shared/ui/button";
import { useRef, useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import ActiveIcon from "./parts/ActiveIcon";
import NotActiveIcon from "./parts/NotActiveIcon";

import { useTableStore } from "@/shared/model/useTableStore";

export default function FavoritesToggleButton() {
    const showOnlyFavorites = useFavorites((state) => state.showOnlyFavorites);
    const toggleShowOnlyFavorites = useFavorites(
        (state) => state.toggleShowOnlyFavorites
    );

    const setPageIndex = useTableStore((s) => s.setPageIndex);

    const [mounted, setMounted] = useState(false);

    const buttonRef = useRef(null);

    const lenis = useLenis();

    useEffect(() => {
        lenis?.scrollTo(0, { duration: 1.2 });
    }, [showOnlyFavorites, lenis]);

    useEffect(() => setMounted(true), []);

    const handleToggle = () => {
        toggleShowOnlyFavorites();
        setPageIndex(0);
    };

    if (!mounted) return null;

    return (
        <Button
            type="button"
            size={"content"}
            variant="ghost"
            className={`hover:opacity-50 transition-all duration-300 cursor-pointer`}
            onClick={handleToggle}
            ref={buttonRef}
        >
            {showOnlyFavorites ? <ActiveIcon /> : <NotActiveIcon />}
        </Button>
    );
}
