import Link from "next/link";
import { socialLinks } from "../lib/socialLinks";
import ScrambleText from "@/shared/ui/ScrambleText";

export default function FooterContent({ year }) {
    return (
        <div className="flex flex-col h-full">
            <section className="lg:my-25 my-10 flex flex-col font-mono">
                <ScrambleText
                    text={"CRYPTO IS FUTURE"}
                    delay={1}
                />
                <ScrambleText
                    text={"FUTURE IS CRYPTO"}
                    align="right"
                    delay={1}
                />
            </section>

            <section className="flex justify-between xl:mx-30 mx-5 mt-5">
                <section className="lg:text-xl text-[0.5rem]">
                    <ul>
                        {socialLinks.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="uppercase hover:underline"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="flex flex-col lg:text-xl text-[0.5rem]">
                    <p>Data: CoinGecko (may be updated with delay)</p>

                    <p>Not financial advice. Do your own research.</p>
                </section>
            </section>

            <section className="mt-auto">
                <div className="bg-[var(--foreground)] h-[1px]" />
                <div className="flex justify-between items-center py-5 xl:px-30 px-5">
                    <p className="lg:text-xl text-[0.5rem]">
                        {`${year}© shinokami`}
                    </p>
                    <div className="xl:text-xs text-[0.25rem]">
                        <p>Support:</p>
                        <p>5nyQouEiH4Lj5pijzuPpegv3E1o9SjzV4MqpUt6C42mk</p>
                        <p>0xf2bFa253e0cC97c726007694087c68fF3EA0C83B</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
