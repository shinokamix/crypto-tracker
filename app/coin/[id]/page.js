'use client'

import CoinPage from "@/components/CoinPage"
import CoinPageHeader from "@/components/CoinPageHeader"
import Footer from "@/components/Footer"

import Lenis from 'lenis';
import { useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Page({params}) {

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
        <main className="min-h-screen">
            <div className="flex flex-col font-sans font-semibold min-h-screen mb-30">
                <CoinPageHeader />
                <CoinPage params={params}/>
            </div>
            <Footer />
        </main>
    )
}