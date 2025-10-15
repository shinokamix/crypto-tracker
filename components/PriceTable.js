"use client";

import { useState, useEffect, useMemo } from "react";
import useSWR from "swr";
import { useUI } from "@/app/state/ui";
import { useFavorites } from "@/app/state/favorites";
import { useTableStore } from "@/app/state/useTableStore";

import FavoriteButton from "./FavoriteButton";
import ScrumbleText from "./ScrumleText";
import PriceTableSceleton from "./PriceTableSceleton";
import ErrorBox from "./ErrorBox";
import GlobalSearch from "./GlobalSearch";
import Pagination from "./Pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import Link from "next/link";
import Image from "next/image";

import fetcher from "@/app/misc/fetcher";
import format from "@/app/misc/format";
import { refreshScroll } from "@/app/misc/refreshScroll";

import DownBlack from '@/public/DownBlack.svg';
import DownWhite from '@/public/DownWhite.svg';



import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

function useData() {
  const { data, error, isLoading } = useSWR("/api/markets", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });
  return {data: data || [], error, isLoading};
}

function Arrow({rotate}) {
  return (
    <>
      <Image src={DownBlack} alt="arrow" width={32} height={32} className={`block dark:hidden ${rotate ? "rotate-180" : ""}`}/>
      <Image src={DownWhite} alt="arrow" width={32} height={32} className={`hidden dark:block ${rotate ? "rotate-180" : ""}`}/>
    </>

  )
}

export default function PriceTable() {
  const { data, error, isLoading } = useData();

  const [mounted, setMounted] = useState(false);  


  const favoritesId = useFavorites(s => s.ids);
  const favoritesSet = new Set(favoritesId);
  const onlyFav = useUI(s => s.onlyFav);

  const visible = onlyFav ? data?.filter(c => favoritesSet.has(c.id)) : data;

  const pageIndex = useTableStore((s) => s.pageIndex);
  const pageSize = useTableStore((s) => s.pageSize);
  const sorting = useTableStore((s) => s.sorting);
  const globalFilter = useTableStore((s) => s.globalFilter);


  const setPageIndex = useTableStore((s) => s.setPageIndex);
  const setPageSize = useTableStore((s) => s.setPageSize);
  const setSorting = useTableStore((s) => s.setSorting);
  const setGlobalFilter = useTableStore((s) => s.setGlobalFilter);
  const reset = useTableStore((s) => s.reset);

  const columns = useMemo(
    () => [
      {
        id: "Image",
        header: "",
        accessorFn: (row) => `${row.id} ${row.image}`,
        cell: (info) => {
          const {id, image} = info.row.original;
          return (
            <Link href={`/coin/${id}`} className={'w-full h-full flex items-center'}>
              <Image src={image} alt="coin image" width={32} height={32} className="w-auto h-auto mr-2"/>
            </Link>
          )
        },
        enableSorting: false,
        meta: {
          group: "left"
        }
      },

      { 
        id: "NameWithSymbol",
        accessorFn: (row) => row.name,
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting()}
            className="flex items-center cursor-pointer"
          >
            Name
            {{
              asc: <Arrow rotate={true}/>,
              desc: <Arrow />,
            }[column.getIsSorted()] ?? ""}
          </button>
        ),
        cell: (info) => {
          const {id, name, symbol} = info.row.original;
          const symbol_upper = symbol.toUpperCase()

          const full = `${name} (${symbol_upper})`

          return (
            <Link href={`/coin/${id}`} className={'w-full h-full flex items-center'}>
              {full.length > 15 ? symbol_upper : full}
            </Link>
          )
        },
        enableSorting: true,
        enableSortingRemoval: true,
        meta: {
          group: "left"
        }
      },

      { 
        accessorKey: "current_price", 
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting()}
            className="flex items-center cursor-pointer ml-auto"
          >
            {{
              asc: <Arrow rotate={true}/>,
              desc: <Arrow />,
            }[column.getIsSorted()] ?? ""}
            Price
          </button>
        ),
        cell: (info) => (
          <div className="text-right">
            {format(info.getValue())}
          </div>
        ),
        enableSorting: true,
        meta: {
          group: "right"
        } 
      },

      { 
        accessorKey: "price_change_percentage_24h", 
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting()}
            className="flex items-center cursor-pointer ml-auto"
          >
            {{
              asc: <Arrow rotate={true}/>,
              desc: <Arrow />,
            }[column.getIsSorted()] ?? ""}
            24%
          </button>
        ), 
        cell: (info) => {
          const change = info.getValue()?.toFixed(2);
          return (
            <button 
              className={`text-right ${change >= 0 ? 'text-green-600' : 'text-red-600 '}`}>
              {change ? `${change}%` : `0.0%`}
            </button>
          )
        },
        enableSorting: true,
        meta: {
          group: "right"
        }
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
          group: "right"
        },
      },
    ],
    []
  )

  const table = useReactTable({
    data: visible,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination: { pageIndex, pageSize },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: (updater) => {
      const next = typeof updater === "function" ? updater({ pageIndex, pageSize }) : updater;
      setPageIndex(next.pageIndex);
      setPageSize(next.pageSize);
    },
    enableSortingRemoval: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    refreshScroll()
  }, [onlyFav, visible.length, sorting, pageIndex, pageSize])

  if (isLoading) return <PriceTableSceleton />
  if (error) {
    console.log(error)
    return <ErrorBox error={error}/>
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center mb-30">
      <Heading />

      <div className="w-full">
        <Table className={"lg:mx-auto lg:w-5xl w-full font-sans sm:text-[1rem] text-[0.75rem]"}>

          <colgroup>
            <col className="xl:w-[4%] md:w-[6%] sm:w-[6%] w-[10%]"></col>
            <col className="xl:w-auto md:w-auto sm:w-auto w-auto"></col>
            <col className="xl:w-[15%] md:w-[15%] sm:w-[15%] w-[25%]"></col>
            <col className="xl:w-[7%] md:w-[9%] sm:w-[10%] w-[12%]"></col>
            <col className="xl:w-[5%] md:w-[6%] sm:w-[7%] w-[10%]"></col>
          </colgroup>

          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} className={"h-12 lg:w-5xl w-full"}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead 
                      key={header.id} 
                      className={`
                        p-0 h-full
                        `}
                      >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>)
                })}

              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 
            ?
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-6" >
                  List is empty.
                </TableCell>
              </TableRow>
            
              
            : table.getRowModel().rows.map(row => (
              <TableRow key={row.id} className={"h-12 w-5xl sm:w-dvw hover:bg-muted/50"}>
                {row.getVisibleCells().map(cell  => {

                  const group = cell.column.columnDef.meta?.group;

                  return (
                    <TableCell 
                      key={cell.id} 
                      className={`
                        ${group === "left" ? "text-left" : "text-right"}
                        p-0 h-12
                      `}
                      >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      
                    </TableCell>)
                })}

              </TableRow>
            ))}
          </TableBody>

          
        </Table>
      </div>

      <Pagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        pageCount={table.getPageCount()}
        canPrev={table.getCanPreviousPage()}
        canNext={table.getCanNextPage()}
        setPageIndex={setPageIndex}
        setPageSize={setPageSize}
      />
      <GlobalSearch />
    </div>
  );
}

function Heading() {
  return(
    <div className="my-30">
      <ScrumbleText text={"Crypto Prices"} align="center" className="xl:text-9xl lg:text-8xl md:text-7xl text-3xl"/>
    </div>
  )
}
