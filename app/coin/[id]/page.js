'use client'

import CoinPage from "@/components/CoinPage"
import CoinPageHeader from "@/components/CoinPageHeader"
import Footer from "@/components/Footer"

import ReactLenis from 'lenis/react';

export default function Page({params}) {
    return (
        <main className="min-h-screen xl:text-[1rem] text-[0.75rem]">
            <ReactLenis root/>
            <div className="flex flex-col font-sans min-h-screen">
                <CoinPageHeader />
                <CoinPage params={params}/>
            </div>
            <Footer />
        </main>
    )
}