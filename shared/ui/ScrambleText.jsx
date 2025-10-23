"use client";

import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

export default function ScrambleText({
    text,
    className = "",
    align = "left",
    delay = 0.1,
}) {
    const wrapRef = useRef(null);
    const textRef = useRef(null);

    useGSAP(
        () => {
            const el = textRef.current;
            const wrap = wrapRef.current;

            document?.fonts?.ready?.then(() => ScrollTrigger.refresh());

            gsap.to(el, {
                duration: 1.6,
                ease: "power2.out",
                scrambleText: {
                    text,
                    chars: "XOX0",
                    revealDelay: 0.2,
                    speed: 0.55,
                },
            });

            const play = () =>
                gsap.to(el, {
                    duration: 3,
                    overwrite: true,
                    ease: "power2.out",
                    scrambleText: {
                        text,
                        chars: "XOX0",
                        revealDelay: delay,
                        speed: 1,
                    },
                });

            ScrollTrigger.create({
                trigger: wrap,
                start: "top 25%",
                end: "bottom 40%",
                onEnter: play,
                onEnterBack: play,
                invalidateOnRefresh: true,
                fastScrollEnd: false,
                //markers: true,
            });
        },
        { scope: wrapRef, dependencies: [text, delay] }
    );

    const textAlign =
        align === "right"
            ? "text-right"
            : align === "center"
            ? "text-center"
            : "text-left";

    return (
        <div
            ref={wrapRef}
            className={`flex w-full xl:text-9xl lg:text-7xl md:text-6xl sm:text-5xl text-2xl ${className}`}
        >
            <div className="relative inline-block w-full">
                <p
                    className="invisible font-mono whitespace-normal w-full"
                    aria-hidden="true"
                >
                    A
                </p>

                <p
                    ref={textRef}
                    className={`absolute inset-0 font-mono whitespace-pre font-semibold ${textAlign}`}
                />
            </div>
        </div>
    );
}
