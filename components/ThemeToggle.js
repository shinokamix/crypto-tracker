"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

import LightToggle from "../public/LightToggle.svg"
import DarkToggle from "../public/DarkToggle.svg"

function Light() {
  return (
    <Image  src={LightToggle} alt="" height={32} width={32}/>
  )
}

function Dark() {
  return (
    <Image  src={DarkToggle} alt="" height={32} width={32}/>
  )
}



export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme(); // "light" | "dark" (после маунта)
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // ничего не рендерим (или можно вернуть кнопку без текста/иконки)
    return null;
  }

  const isDark = resolvedTheme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="m-3"
    >
      {isDark ? <Dark /> : <Light />}
    </button>
  );
}
