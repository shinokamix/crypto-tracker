import { ThemeToggle } from "@/features/theme";
import { ReturnButton } from "@/features/return";

export default function HeaderCoin() {
    return (
        <header
            role="banner"
            className="flex justify-between p-5"
        >
            <ReturnButton />
            <ThemeToggle />
        </header>
    );
}
