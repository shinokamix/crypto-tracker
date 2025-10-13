'use client'

import { useEffect, useState, useCallback } from 'react'
import { useLenis } from 'lenis/react'
import Image from 'next/image'

import arrowWhite from "@/public/arrow_white.svg"
import arrowBlack from "@/public/arrow_black.svg"

function Arrow() {
  return(
    <>
      <Image src={arrowWhite} alt='arrow' width={20} height={20} className='block dark:hidden' />
      <Image src={arrowBlack} alt='arrow' width={20} height={20} className='hidden dark:block'/>
    </>
  )
}

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  const lenis = useLenis(( { animatedScroll, limit } ) => {
    setVisible(animatedScroll > 1000 && (limit - animatedScroll > 700))
  })

  const onClick = useCallback(() => {
    lenis?.scrollTo(0, { duration: 1.2 })
  }, [lenis])

  return (
    <div className='flex'>
        <button
        onClick={onClick}
        aria-label="Прокрутить наверх"
        className={`fixed bottom-6 right-10 z-50 rounded-full p-2.5
        ${visible ? 'opacity-30' : 'opacity-0 pointer-events-none'}
        bg-[var(--foreground)] cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-100`}
        >
         <Arrow />
        </button>
    </div>
  )
}
