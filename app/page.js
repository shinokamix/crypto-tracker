"use client";

import PriceTable from "@/components/PriceTable";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Lenis from 'lenis';
import { useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  useEffect(() => {
    const lenis = new Lenis();

    // Сообщаем ScrollTrigger про каждый скролл Lenis
    lenis.on("scroll", () => ScrollTrigger.update());

    // Синхронизируем Lenis с таймингом GSAP
    const gsapTicker = (t) => {
      // GSAP отдаёт секунды, Lenis ждёт миллисекунды
      lenis.raf(t * 1000);
    };
    gsap.ticker.add(gsapTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(gsapTicker);
      lenis.destroy();
    };
  }, []);


  return (
    <main className="bg-background font-sans font-semibold">
      <Header />
      <section className="flex flex-col min-h-screen">
        <PriceTable />
      </section>
      <Footer />
    </main>

  );
}
