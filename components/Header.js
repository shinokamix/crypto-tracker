import FavoritesToggle from "./FavoritesToggle"
import ThemeToggle from "./ThemeToggle"

export default function Header() {
    return (
        <div className="flex p-5">
            <div className="ml-auto">
                <FavoritesToggle />
                <ThemeToggle />
            </div>
        </div>
    )
}