'use client'

import CoinPage from "@/components/CoinPage"
import CoinPageHeader from "@/components/CoinPageHeader"
import Footer from "@/components/Footer"

import ReactLenis from 'lenis/react';

export default function Page({params}) {
    return (
        <main className="min-h-screen">
            <ReactLenis root/>
            <div className="flex flex-col font-sans font-semibold min-h-screen mb-30">
                <CoinPageHeader />
                <CoinPage params={params}/>
            </div>
            <Footer />
        </main>
    )
}