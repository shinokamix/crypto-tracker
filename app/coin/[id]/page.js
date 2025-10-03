import CoinPage from "@/components/CoinPage"
import CoinPageHeader from "@/components/CoinPageHeader"

export default function Page({params}) {
    return (
        <div className="flex flex-col font-sans font-semibold">
            <CoinPageHeader />
            <CoinPage params={params}/>
        </div>
    )
}