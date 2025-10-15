'use client'

import { useEffect, useState } from "react"
import ScrumbleText from "./ScrumleText";
import Link from "next/link";

export default function Footer() {

    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return null;
    }

    return (
        <div 
            className='relative lg:h-[800px] h-[400px] bg-[var(--tableColor)]'
            style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
        >
            <div className='relative lg:h-[calc(100dvh+800px)] h-[calc(100dvh+400px)] -top-[100dvh]'>
                <div className='lg:h-[800px] h-[400px] sticky lg:top-[calc(100dvh-800px)] top-[calc(100dvh-400px)]'>
                <Content />
                </div>
            </div>
        </div>
    )
}


function Content() {
    return (
        <div className="flex flex-col h-full">
            <section className="lg:my-25 my-10 flex flex-col font-mono">
                <ScrumbleText text={"CRYPTO IS FUTURE"} delay={1}/>
                <ScrumbleText text={"FUTURE IS CRYPTO"} align="right" delay={1}/>
            </section>

            <section className="flex justify-between xl:mx-30 mx-5 mt-5">

                <section className="xl:text-2xl lg:text-xl">
                    <Link href={'https://github.com/shinokamix/crypto-tracker'} className="hover:underline  ">
                        <p>GITHUB</p>
                    </Link>

                    <Link href={'https://x.com/shinokamixx'} className="hover:underline">
                        <p>TWITTER</p>
                    </Link>

                    <Link href={'https://t.me/shinokamix'} className="hover:underline">
                        <p>TELEGRAM</p>
                    </Link>
                </section>

                <section className="flex flex-col lg:text-xl text-[0.5rem]">
                    <p>
                        Data: CoinGecko (may be updated with delay)
                    </p>

                    <p>
                        Not financial advice. Do your own research.
                    </p>
                </section>

            </section>

            <section className="mt-auto">
                <div className="bg-[var(--foreground)] h-[1px]"/>
                <div className="flex justify-between items-center py-5 xl:px-30 px-5">
                    <p className="xl:text-2xl md:text-xl text-sm">2025© shinokami</p>
                    <div className="xl:text-xs text-[0.25rem]">
                        <p>Support:</p>
                        <p>5nyQouEiH4Lj5pijzuPpegv3E1o9SjzV4MqpUt6C42mk</p>
                        <p>0xf2bFa253e0cC97c726007694087c68fF3EA0C83B</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
