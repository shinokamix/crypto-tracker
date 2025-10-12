import { useTableStore } from "@/app/state/useTableStore";
import { useEffect, useState } from "react";
import { useLenis } from 'lenis/react'

export default function GlobalSearch() {
  const globalFilter = useTableStore((s) => s.globalFilter);
  const setGlobalFilter = useTableStore((s) => s.setGlobalFilter);

  const [value, setValue] = useState(globalFilter);

  const [visible, setVisible] = useState(false)
  
  const lenis = useLenis(( { animatedScroll, limit } ) => {
      setVisible(limit - animatedScroll > 700)
  })

  // 👇 debounce (чтобы не фильтровать на каждый ввод)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setGlobalFilter(value || "");
    }, 300);

    lenis?.scrollTo(0, { duration: 1.2 })

    return () => clearTimeout(timeout);
  }, [value, setGlobalFilter, lenis]);

  return (
    <div className={
      `fixed bottom-6 left-1/2 -translate-x-1/2 z-50 
      ${visible ? 'opacity-70' : 'opacity-0 pointer-events-none'} 
      transition-all duration-300
      border-2 border-[var(--tableColor)] focus:ring
      `}>
      <div className="bg-[var(--tableColor)]  px-3 py-2 flex items-center w-[250px]">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
          className="w-full bg-transparent outline-none placeholde-[var(--tableColor)] text-center"
        />
      </div>
    </div>
  );
}
