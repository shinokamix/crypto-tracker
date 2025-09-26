import FavoritesToggle from "./FavoritesToggle"
import ThemeToggle from "./ThemeToggle"

export default function Header() {
    return (
        <div className="flex p-5 fixed top-0 right-0">
            <div className="ml-auto">
                <FavoritesToggle />
                <ThemeToggle />
            </div>
        </div>
    )
}