export default function CoinPageSceleton() {
    return (
        <div>
            <div className="flex flex-col xl:mx-80 lg:mx-20 mx-10">
                <div className="h-32 bg-[var(--tableColor)]">
                </div>
                <div className="mt-10 animate-pulse h-[362px] bg-[var(--tableColor)]">
                    
                </div>
            </div>
            <div className="mt-20 xl:mx-80 lg:mx-20 mx-10 animate-pulse h-60 bg-[var(--tableColor)]">
            </div>
        </div>
    )
}