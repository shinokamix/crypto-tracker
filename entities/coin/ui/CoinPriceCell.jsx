import { formatPrice } from "../model/format";

export default function CoinPriceCell({ getValue }) {
    const value = getValue();
    const display = value != null ? formatPrice(value) : "–";

    return (
        <p className="text-right tabular-nums font-sans sm:text-[1rem] text-[0.7rem]">
            {display}
        </p>
    );
}
