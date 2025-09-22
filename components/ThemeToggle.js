// components/ThemeToggle.jsx
"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

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
      className="px-3 py-1 border rounded"
    >
      {isDark ? "🌙 Тёмная" : "☀️ Светлая"}
    </button>
  );
}
