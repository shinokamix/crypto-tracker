"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

import LightToggle from "../public/LightToggle.svg"
import DarkToggle from "../public/DarkToggle.svg"

import gsap from "gsap";

function Light() {
  return (
    <Image  src={LightToggle} alt="" height={32} width={32} className="transform-all duration-300 hover:scale-110 sm:h-8 sm:w-8 w-5 h-5"/>
  )
}

function Dark() {
  return (
    <Image  src={DarkToggle} alt="" height={32} width={32} className="transform-all duration-300 hover:scale-110 sm:h-8 sm:w-8 w-5 h-5"/>
  )
}

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const buttonRef = useRef(null)

  useEffect(() => setMounted(true), []);

  const handleClick = () => {
    gsap.fromTo(buttonRef.current,
      {rotation: 0}, {
        rotation: 360, 
        duration: 0.3,
        ease: "power1.inOut"
      }
      
    )
    setTheme(isDark ? "light" : "dark")
  }

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";
  return (
    <button
      onClick={handleClick}
      className="m-3 cursor-pointer "
      ref={buttonRef}
    >
      {isDark ? <Dark /> : <Light />}
    </button>
  );
}
