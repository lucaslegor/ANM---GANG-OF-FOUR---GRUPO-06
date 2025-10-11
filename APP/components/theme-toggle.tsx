"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import styles from "./theme-toggle.module.css"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = stored === "dark" || (!stored && prefersDark)

    setIsDark(shouldBeDark)
    document.documentElement.classList.toggle("dark", shouldBeDark)
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    document.documentElement.classList.toggle("dark", newIsDark)
    localStorage.setItem("theme", newIsDark ? "dark" : "light")
  }

  return (
    <button onClick={toggleTheme} className={styles.toggle} aria-label="Toggle theme">
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}
