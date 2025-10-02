"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothLayout({ children }) {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const smootherRef = useRef(null);

  useLayoutEffect(() => {
    if (smootherRef.current || !wrapperRef.current || !contentRef.current) return;
    smootherRef.current = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      speed: 1.2,
      smoothTouch: 0.1,
    });
    return () => { smootherRef.current?.kill(); smootherRef.current = null; };
  }, []);

  return (
    <div ref={wrapperRef} id="smooth-wrapper" className="min-h-screen overflow-hidden">
      <div ref={contentRef} id="smooth-content" className="">{children}</div>
    </div>
  );
}
