import CoinsTable from "@/widgets/coins-table/ui/CoinsTable";
import { HeaderHome } from "@/widgets/header";
import { ScrollToTopButton } from "@/features/scroll-to-top";

export default function Home() {
    return (
        <main className="bg-background font-sans min-h-screen">
            <HeaderHome />
            <CoinsTable />
            <ScrollToTopButton />
        </main>
    );
}
