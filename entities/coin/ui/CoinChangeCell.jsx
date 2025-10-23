import { formatChange } from "../model/format";

export default function CoinChangeCell({ getValue }) {
    const raw = getValue();
    const num = Number(raw) || 0;
    const formatted = formatChange(num);

    const color =
        num > 0 ? "text-green-600" : num < 0 ? "text-red-600" : "text-gray-500";

    return (
        <p
            className={`text-right tabular-nums font-sans sm:text-[1rem] text-[0.7rem] ${color}`}
        >
            {formatted ?? "0.0"}%
        </p>
    );
}
