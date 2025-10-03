'use client'

import Link from "next/link"
import Image from "next/image"
import ThemeToggle from "./ThemeToggle"

import { useTheme } from "next-themes"

import { useState, useEffect } from "react"

import return_dark from "@/public/return.svg"
import return_light from "@/public/return_light.svg"

export default function CoinPageHeader() {

    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    const isDark = resolvedTheme === "dark";

    return (
        <div className="flex justify-between p-5">
            <Link href={"/"} className="m-3 cursor-pointer transition-all duration-300 hover:scale-110">
                {mounted ?
                    <Image src={isDark ? return_light : return_dark} alt="return" height={32} width={32}/> : <div className="w-8 h-8" />}
            </Link>
            <ThemeToggle />
        </div>
)
}