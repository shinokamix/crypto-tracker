export default function CoinDescription({ coinData, className }) {
    return (
        <div className={className}>
            <p>{coinData.description}</p>
        </div>
    );
}
