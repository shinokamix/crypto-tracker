import {
    CoinImageCell,
    CoinNameCell,
    CoinChangeCell,
    CoinPriceCell,
    CoinChangeHeader,
    CoinPriceHeader,
    CoinNameHeader,
} from "@/entities/coin";

import FavoriteButton from "@/features/favorites/ui/FavoritesButton";

const tableColumns = [
    {
        id: "Image",
        header: "",
        cell: ({ row }) => <CoinImageCell row={row} />,
        enableSorting: false,
        meta: {
            group: "left",
        },
    },

    {
        id: "NameWithSymbol",
        accessorFn: (row) => `${row.name} ${row.symbol}`,
        header: ({ column }) => <CoinNameHeader column={column} />,
        cell: ({ row }) => <CoinNameCell row={row} />,
        enableSorting: true,
        enableSortingRemoval: true,
        meta: {
            group: "left",
        },
    },

    {
        accessorKey: "price",
        header: ({ column }) => <CoinPriceHeader column={column} />,
        cell: ({ getValue }) => <CoinPriceCell getValue={getValue} />,
        enableSorting: true,
        meta: {
            group: "right",
        },
    },

    {
        accessorKey: "change24h",
        header: ({ column }) => <CoinChangeHeader column={column} />,
        cell: ({ getValue }) => <CoinChangeCell getValue={getValue} />,
        enableSorting: true,
        meta: {
            group: "right",
        },
    },

    {
        id: "favorite",
        header: "", // можно иконку
        cell: ({ row }) => (
            <div className="flex justify-center ">
                <FavoriteButton id={row.original.id} />
            </div>
        ),
        enableSorting: false,
        enableColumnFilter: false,
        meta: {
            group: "right",
        },
    },
];

export default tableColumns;
