import FirstBlack from '@/public/FirstBlack.svg'
import NextBlack from '@/public/NextBlack.svg'
import PreviousBlack from '@/public/PreviousBlack.svg'
import LastBlack from '@/public/LastBlack.svg'
import FirstWhite from '@/public/FirstWhite.svg'
import NextWhite from '@/public/NextWhite.svg'
import PreviousWhite from '@/public/PreviousWhite.svg'
import LastWhite from '@/public/LastWhite.svg'

import Image from 'next/image'

import { useLenis } from 'lenis/react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Pagination({
  pageIndex,
  pageSize,
  pageCount,
  canPrev,
  canNext,
  setPageIndex,
  setPageSize,
  className = "",
}) {
  // защита от пустых данных
  const lastIndex = Math.max(0, (pageCount ?? 1) - 1);

  const goFirst = () => setPageIndex(0);
  const goPrev  = () => setPageIndex(Math.max(0, pageIndex - 1));
  const goNext  = () => setPageIndex(Math.min(lastIndex, pageIndex + 1));
  const goLast  = () => setPageIndex(lastIndex);

  const lenis = useLenis();

  const onValueChange = (value) => {
    lenis?.scrollTo(0, { duration: 0 })
    setPageSize(value);
    return
  }

  return (
    <div className={`flex justify-center h-12 ${className}`}>
      <div className="w-5xl flex justify-center items-center bg-[var(--tableColor)] tabular-nums">
        <div className="flex justify-center items-center sm:gap-2 gap-0.5">
          <button onClick={goFirst} disabled={!canPrev} className="disabled:opacity-50 disabled:pointer-events-none cursor-pointer">
            <Image src={FirstBlack} alt='First Page' width={18} height={18} className='block dark:hidden hover:scale-140 transition-all duration-300'/>
            <Image src={FirstWhite} alt='First Page' width={18} height={18} className='hidden dark:block hover:scale-140 transition-all duration-300'/>
          </button>

          <button onClick={goPrev} disabled={!canPrev} className="disabled:opacity-50 disabled:pointer-events-none cursor-pointer">
            <Image src={PreviousBlack} alt='Previous Page' width={18} height={18} className='block dark:hidden hover:scale-140 transition-all duration-300'/>
            <Image src={PreviousWhite} alt='Previous Page' width={18} height={18} className='hidden dark:block hover:scale-140 transition-all duration-300'/>
          </button>

          <span className='text-center sm:w-20 w-10'>{pageIndex + 1} of {pageCount}</span>

          <button onClick={goNext} disabled={!canNext} className="disabled:opacity-50 disabled:pointer-events-none cursor-pointer">
            <Image src={NextBlack} alt='Next Page' width={18} height={18} className='block dark:hidden hover:scale-140 transition-all duration-300'/>
            <Image src={NextWhite} alt='Next Page' width={18} height={18} className='hidden dark:block hover:scale-140 transition-all duration-300'/>
          </button>
          
          <button onClick={goLast} disabled={!canNext} className="disabled:opacity-50 disabled:pointer-events-none cursor-pointer">
            <Image src={LastBlack} alt='Last Page' width={18} height={18} className='block dark:hidden hover:scale-140 transition-all duration-300'/>
            <Image src={LastWhite} alt='Last Page' width={18} height={18} className='hidden dark:block hover:scale-140 transition-all duration-300'/>
          </button>
        </div>
      </div>
    </div>
  );
}