"use client";

import PriceTable from "@/components/PriceTable";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

import ReactLenis from "lenis/react"
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  const lenisRef = useRef()
  
  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
  
    gsap.ticker.add(update)
  
    return () => gsap.ticker.remove(update)
  }, [])


  return (
    <main className="bg-background font-sans font-semibold">
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
        <Header />
        <section className="flex flex-col min-h-screen">
          <PriceTable />
        </section>
        <ScrollToTopButton />
        <Footer />
        <ScrollToTopButton />
      </ReactLenis >
    </main>

  );
}
