import ScrambleText from "@/shared/ui/ScrambleText";

export default function CoinName({ coinData, className }) {
    const name = coinData.name ?? "";
    const symbol = coinData.symbol ?? "";

    const text = name.lenght >= 20 ? symbol : name;

    return (
        <ScrambleText
            text={text}
            className={className}
        />
    );
}
