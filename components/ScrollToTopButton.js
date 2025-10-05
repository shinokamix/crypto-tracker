'use client'

import { useEffect, useState, useCallback } from 'react'
import { useLenis } from 'lenis/react'

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  // useLenis возвращает сам инстанс lenis,
  // а также позволяет подписаться на события прокрутки
  const lenis = useLenis((scroll) => {
    // показываем кнопку после 300px
    setVisible(scroll > 50)
  })

  const onClick = useCallback(() => {
    lenis?.scrollTo(0, { duration: 1.2 }) // плавный скролл наверх
  }, [lenis])

  return (
    <div className='flex'>
        <button
        onClick={onClick}
        aria-label="Прокрутить наверх"
        className={`fixed bottom-6 right-6 z-50 rounded-full px-4 py-3 shadow-lg transition-opacity
        ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        bg-black text-white`}
        >
        ↑
        </button>
    </div>
  )
}
