import { Button } from "@/shared/ui/button";
import Arrow from "@/shared/ui/Arrow";

export default function CoinNameHeader({ column }) {
    const sortingState = column.getIsSorted();

    const getArrow = () => {
        if (sortingState === "asc") return <Arrow rotate={true} />;
        if (sortingState === "desc") return <Arrow />;

        return (
            <Arrow className="opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
        );
    };

    return (
        <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting()}
            className="group flex items-center cursor-pointer gap-0 p-0 font-sans sm:text-[1rem] text-[0.7rem]"
        >
            Name
            {getArrow()}
        </Button>
    );
}
