import Arrow from "@/shared/ui/Arrow";

export default function SortIcon({ dir }) {
    if (dir === "asc") return <Arrow rotate />;
    if (dir === "desc") return <Arrow />;
    return null;
}
