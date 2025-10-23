"use client";

import { useSearch } from "../model/store";
import { useLenis } from "lenis/react";
import { useState, useEffect, useRef } from "react";

const VISIBILITY_THRESHOLD = 700;

export function SearchInput() {
    const query = useSearch((s) => s.query);
    const setQuery = useSearch((s) => s.setQuery);
    const [local, setLocal] = useState(query);

    const [visible, setVisible] = useState(false);
    const prevVisibleRef = useRef(false);

    const lenis = useLenis();

    useLenis(({ animatedScroll, limit }) => {
        const nextVisible = limit - animatedScroll > VISIBILITY_THRESHOLD;
        if (prevVisibleRef.current !== nextVisible) {
            prevVisibleRef.current = nextVisible;
            setVisible(nextVisible);
        }
    });

    useEffect(() => {
        const t = setTimeout(() => {
            if (local !== query) {
                setQuery(local);
                lenis?.scrollTo?.(0, { duration: 1.2 });
            }
        }, 300);

        return () => clearTimeout(t);
    }, [local, query, setQuery, lenis]);

    useEffect(() => {
        setLocal(query);
    }, [query]);

    return (
        <div
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 
            ${visible ? "opacity-70" : "opacity-0 pointer-events-none"} 
            transition-all duration-300
      `}
        >
            <div className="bg-[var(--tableColor)]  px-3 py-2 flex items-center sm:w-[250px] w-[150px]">
                <input
                    name="search"
                    type="text"
                    aria-label="Search in table"
                    value={local}
                    onChange={(e) => setLocal(e.target.value)}
                    placeholder="Search..."
                    className="w-full bg-transparent outline-none text-center"
                />
            </div>
        </div>
    );
}
