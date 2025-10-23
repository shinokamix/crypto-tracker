"use client";

import { useTheme as useNextTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function useTheme() {
    const { theme, resolvedTheme, systemTheme, setTheme } = useNextTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const isDark = useMemo(
        () => (resolvedTheme === "dark" ? true : false),
        [resolvedTheme]
    );

    const toggleTheme = useCallback(
        () => setTheme(isDark ? "light" : "dark"),
        [isDark, setTheme]
    );

    return {
        mounted,
        theme,
        resolvedTheme,
        systemTheme,
        isDark,
        setTheme,
        toggleTheme,
    };
}
