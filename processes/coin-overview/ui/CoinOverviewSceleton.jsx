export default function CoinOverviewSceleton() {
    return (
        <div className="flex flex-col xl:mx-50 lg:mx-20 sm:mx-10 mx-5">
            <div className="bg-[var(--tableColor)] h-32 w-full animate-pulse" />
            <div className="bg-[var(--tableColor)] xl:h-80 h-60 w-full animate-pulse sm:my-20 my-10" />
            <div className="bg-[var(--tableColor)] h-100 w-full animate-pulse" />
        </div>
    );
}
