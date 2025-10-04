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
            className='relative h-[800px]'
            style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
        >
            <div className='relative h-[calc(100vh+800px)] -top-[100vh]'>
                <div className='h-[800px] sticky top-[calc(100vh-800px)] bg-[var(--tableColor)]'>
                    <Content />
                </div>
            </div>
        </div>
  )
}


function Content() {
    return (
        <div className="flex flex-col h-full">
            <section className="my-30 flex flex-col font-mono text-9xl">
                <ScrumbleText text={"CRYPTO IS FUTURE"} delay={1}/>
                <ScrumbleText text={"FUTURE IS CRYPTO"} align="right" delay={1}/>
            </section>

            <section className="flex">

                <section className="ml-30 text-2xl">
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

                <section className="flex flex-col ml-[calc(100vw-50%)] mt-25 text-2xl">
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
                <div className="flex justify-between items-center py-5 px-30">
                    <p className="text-2xl">2025© shinokami</p>
                    <div className="text-xs ">
                        <p>Support:</p>
                        <p>5nyQouEiH4Lj5pijzuPpegv3E1o9SjzV4MqpUt6C42mk</p>
                        <p>0xf2bFa253e0cC97c726007694087c68fF3EA0C83B</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
