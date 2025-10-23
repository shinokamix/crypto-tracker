import Link from "next/link";

export default function CoinNameCell({ row }) {
    const coin = row.original;
    const id = coin.id;
    const name = coin.name;
    const symbol = coin.symbol;

    const symbol_upper = symbol?.toUpperCase();

    const full = `${name} (${symbol_upper})`;

    return (
        <Link
            href={`/coin/${id}`}
            className={
                "w-full h-full flex items-center font-sans sm:text-[1rem] text-[0.7rem]"
            }
        >
            {full.length > 15 ? symbol_upper : full}
        </Link>
    );
}
