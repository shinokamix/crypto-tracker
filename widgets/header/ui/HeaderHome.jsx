import { FavoritesToggleButton } from "@/features/favorites";
import { ThemeToggle } from "@/features/theme";

export default function Header() {
    return (
        <header
            role="banner"
            className="flex justify-end p-5 gap-3"
        >
            <FavoritesToggleButton />
            <ThemeToggle />
        </header>
    );
}
