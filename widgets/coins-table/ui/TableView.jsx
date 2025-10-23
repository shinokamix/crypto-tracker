"use client";

import Heading from "./parts/Heading";
import Pagination from "./parts/Pagination";
import ErrorBox from "./parts/ErrorBox";
import PriceTableSceleton from "./parts/PriceTableSceleton";
import { SearchInput } from "@/features/search";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/ui/table";

import { flexRender } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export default function TableView({ table, error, isLoading }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return null;
    }

    if (error) {
        console.log(error);
        return <ErrorBox error={error} />;
    }

    if (isLoading) {
        return <PriceTableSceleton />;
    }

    return (
        <div className="flex flex-col justify-center mb-30 w-full ">
            <Heading />

            <Table className={"lg:mx-auto lg:w-5xl w-full"}>
                <colgroup>
                    <col className="xl:w-[4%] md:w-[6%] sm:w-[6%] w-[8%]"></col>
                    <col className="xl:w-auto md:w-auto sm:w-auto w-auto"></col>
                    <col className="xl:w-[15%] md:w-[15%] sm:w-[15%] w-[25%]"></col>
                    <col className="xl:w-[10%] md:w-[12%] sm:w-[15%] w-[20%]"></col>
                    <col className="xl:w-[5%] md:w-[6%] sm:w-[7%] w-[10%]"></col>
                </colgroup>

                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                            key={headerGroup.id}
                            className={
                                "sm:h-12 h-8 font-sans sm:text-[1rem] text-[0.7rem]"
                            }
                        >
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead
                                        key={header.id}
                                        className={`p-0 h-full`}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {!table.getRowModel().rows.length ? (
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                className="text-center py-6"
                            >
                                List is empty.
                            </TableCell>
                        </TableRow>
                    ) : (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                className={"sm:h-12 h-8 hover:bg-muted/50"}
                            >
                                {row.getVisibleCells().map((cell) => {
                                    const group =
                                        cell.column.columnDef.meta?.group;

                                    return (
                                        <TableCell
                                            key={cell.id}
                                            className={`p-0 sm:h-12 h-8`}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            <Pagination table={table} />
            <SearchInput />
        </div>
    );
}
