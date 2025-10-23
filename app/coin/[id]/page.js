import { HeaderCoin } from "@/widgets/header";
import { CoinOverview } from "@/processes/coin-overview";

export default async function Page({ params }) {
    const { id } = await params;

    return (
        <main className="min-h-screen xl:text-[1rem] text-[0.75rem]">
            <HeaderCoin />
            <CoinOverview
                id={id}
                className={""}
            />
        </main>
    );
}
