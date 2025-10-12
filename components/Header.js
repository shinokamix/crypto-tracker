import FavoritesToggle from "./FavoritesToggle"
import ThemeToggle from "./ThemeToggle"

export default function Header() {
    return (
        <header className="flex relative">
            <div className="ml-auto xl:fixed absolute p-5 top-0 right-0 z-50">
                <FavoritesToggle />
                <ThemeToggle />
            </div>
        </header>
    )
}