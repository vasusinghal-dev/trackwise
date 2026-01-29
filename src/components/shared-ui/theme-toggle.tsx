"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

  const toggleTheme = () => {
    const toggle = !document.documentElement.classList.contains("dark");

    document.documentElement.classList.toggle("dark", toggle);
    localStorage.setItem("theme", toggle ? "dark" : "light");
    setIsDark(toggle);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-3 rounded-full bg-surface border border-border
                 hover:border-primary transition-colors hover:shadow-md"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-text-primary" />
      ) : (
        <Moon className="w-5 h-5 text-text-primary" />
      )}
    </button>
  );
}
