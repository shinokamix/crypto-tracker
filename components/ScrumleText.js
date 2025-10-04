"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

export default function ScrumbleText({ text, className = "", align = "left", delay = 0.1}) {
  const wrapRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const el = textRef.current;
      const wrap = wrapRef.current;

      document?.fonts?.ready?.then(() => ScrollTrigger.refresh());

      // стартовая анимация
      gsap.to(el, {
        duration: 1.6,
        ease: "power2.out",
        scrambleText: { text, chars: "XOX0", revealDelay: 0.2, speed: 0.55 },
      });

      const play = () =>
        gsap.to(el, {
          duration: 3,
          overwrite: true,
          ease: "power2.out",
          scrambleText: { text, chars: "XOX0", revealDelay: delay, speed: 1 },
        });

      ScrollTrigger.create({
        trigger: wrap,
        start: "top 30%",
        end: "bottom 20%",
        onEnter: play,
        onEnterBack: play,
        invalidateOnRefresh: true,
        fastScrollEnd: false,
        //markers: true,
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [text]);

  const textAlign =
    align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left";

  return (
    <div ref={wrapRef} className={`flex w-full ${className}`}>
      <div className="relative inline-block w-full">
        <p className="invisible text-9xl font-mono whitespace-pre w-full" aria-hidden="true">
          A
        </p>

        <p
          ref={textRef}
          className={`absolute inset-0 text-9xl font-mono whitespace-pre ${textAlign}`}
        />
      </div>
    </div>
  );
}
