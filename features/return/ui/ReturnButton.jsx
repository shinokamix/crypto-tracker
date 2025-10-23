import { Button } from "@/shared/ui/button";
import Link from "next/link";
import ReturnIcon from "./parts/ReturnIcon";

export default function ReturnButton() {
    return (
        <Button
            asChild
            size={"content"}
            variant="ghost"
            aria-label="Go home"
        >
            <Link href="/">
                <ReturnIcon />
            </Link>
        </Button>
    );
}
