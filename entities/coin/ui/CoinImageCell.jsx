import Link from "next/link";
import Image from "next/image";

export default function CoinImageCell({ row }) {
    const coin = row.original;
    const id = coin.id;
    const image = coin.image;

    return (
        <Link
            href={`/coin/${id}`}
            className={"w-full h-full flex items-center"}
        >
            <Image
                src={image ? image : "/"}
                alt="coin image"
                width={32}
                height={32}
                className="sm:w-8 sm:h-8 w-5 h-5 mr-2"
            />
        </Link>
    );
}
