"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }) {
    const lenisRef = useRef();

    useEffect(() => {
        function update(time) {
            lenisRef.current?.lenis?.raf(time * 1000);
            ScrollTrigger.update();
        }

        gsap.ticker.add(update);

        return () => gsap.ticker.remove(update);
    }, []);

    return (
        <ReactLenis
            root
            options={{ autoRaf: false }}
            ref={lenisRef}
        >
            {children}
        </ReactLenis>
    );
}
