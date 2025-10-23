"use client";

import Image from "next/image";

import FirstBlack from "@/public/FirstBlack.svg";
import NextBlack from "@/public/NextBlack.svg";
import PreviousBlack from "@/public/PreviousBlack.svg";
import LastBlack from "@/public/LastBlack.svg";
import FirstWhite from "@/public/FirstWhite.svg";
import NextWhite from "@/public/NextWhite.svg";
import PreviousWhite from "@/public/PreviousWhite.svg";
import LastWhite from "@/public/LastWhite.svg";

export default function Pagination({ table, className = "" }) {
    const { pageIndex } = table.getState().pagination;
    const pageCount = table.getPageCount();

    const canPrev = table.getCanPreviousPage();
    const canNext = table.getCanNextPage();

    const goFirst = () => table.setPageIndex(0);
    const goPrev = () => table.previousPage();
    const goNext = () => table.nextPage();
    const goLast = () => table.setPageIndex(pageCount - 1);

    return (
        <div className={`flex justify-center sm:h-12 h-8 ${className}`}>
            <div className="w-5xl flex justify-center items-center bg-[var(--tableColor)] tabular-nums font-sans sm:text-[1rem] text-[0.7rem]">
                <div className="flex justify-center items-center sm:gap-2 gap-0.5">
                    {/* first */}
                    <PaginationButton
                        onClick={goFirst}
                        disabled={!canPrev}
                        iconLight={FirstBlack}
                        iconDark={FirstWhite}
                        alt="First Page"
                    />
                    {/* prev */}
                    <PaginationButton
                        onClick={goPrev}
                        disabled={!canPrev}
                        iconLight={PreviousBlack}
                        iconDark={PreviousWhite}
                        alt="Previous Page"
                    />

                    <span className="text-center sm:w-20 w-10">
                        {pageCount > 0
                            ? `${pageIndex + 1} of ${pageCount}`
                            : `0 of 0`}
                    </span>

                    {/* next */}
                    <PaginationButton
                        onClick={goNext}
                        disabled={!canNext}
                        iconLight={NextBlack}
                        iconDark={NextWhite}
                        alt="Next Page"
                    />
                    {/* last */}
                    <PaginationButton
                        onClick={goLast}
                        disabled={!canNext}
                        iconLight={LastBlack}
                        iconDark={LastWhite}
                        alt="Last Page"
                    />
                </div>
            </div>
        </div>
    );
}

/** внутренняя кнопка для переиспользования */
function PaginationButton({ onClick, disabled, iconLight, iconDark, alt }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
        >
            <Image
                src={iconLight}
                alt={alt}
                width={16}
                height={16}
                className="sm:w-4 sm:h-4 h-3 w-3 block dark:hidden hover:scale-140 transition-all duration-300"
            />
            <Image
                src={iconDark}
                alt={alt}
                width={16}
                height={16}
                className="sm:w-4 sm:h-4 h-3 w-3 hidden dark:block hover:scale-140 transition-all duration-300"
            />
        </button>
    );
}
