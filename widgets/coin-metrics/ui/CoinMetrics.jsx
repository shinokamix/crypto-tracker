import Link from "next/link";
import { formatChange, formatPrice } from "@/entities/coin";

export default function CoinMetrics({ coinData, className }) {
    const price = formatPrice(coinData.price) ?? 0;
    const change24h = formatChange(coinData.change24h) ?? 0;
    const marketCap = formatPrice(coinData.marketCap) ?? 0;
    const athChange = formatChange(coinData.athChange) ?? 0;
    const whitepaper = coinData.whitepaper ?? null;
    const homepage = coinData.homepage ?? "#";

    return (
        <div className={className}>
            <p> {"{"} </p>

            <div className="ml-5">
                <p>{`"market_data": {`}</p>
                <div className="ml-5 tabular-nums">
                    <p> {`"current_price": ${price}`} </p>
                    <span className="flex gap-1">
                        <p>{`"change24h":`}</p>
                        <p
                            className={`${
                                change24h >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                        >
                            {change24h ? `${change24h}%` : "0.00%"}
                        </p>
                    </span>
                    <p> {`"marketCap": ${marketCap}`} </p>
                    <span className="flex gap-1">
                        <p>{`"athChange":`}</p>
                        <p
                            className={`${
                                athChange >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                        >
                            {`${athChange}%`}
                        </p>
                    </span>
                </div>
                <p>{"},"}</p>

                <p>{`"links": {`}</p>
                <div className="ml-5">
                    <span className="flex gap-1">
                        <p>{`"homepage:"`}</p>
                        <Link
                            href={homepage}
                            alt="whitepaper link"
                            className="hover:underline"
                        >
                            {homepage}
                        </Link>
                    </span>

                    {whitepaper ? (
                        <span className="flex gap-1">
                            <p>{`"whitepaper:"`}</p>
                            <Link
                                href={whitepaper}
                                alt="whitepaper link"
                                className="hover:underline"
                            >
                                {whitepaper}
                            </Link>
                        </span>
                    ) : (
                        <></>
                    )}
                </div>
                <p>{"}"}</p>
            </div>

            <p> {"}"} </p>
        </div>
    );
}
