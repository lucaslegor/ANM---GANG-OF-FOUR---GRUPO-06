"use client"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("theme")
    const isDark = stored ? stored === "dark" : true
    setDark(isDark)
    document.documentElement.classList.toggle("light", !isDark)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark)
    localStorage.setItem("theme", dark ? "dark" : "light")
  }, [dark])

  return (
    <button aria-label="Toggle theme" className="toggle" onClick={() => setDark(!dark)}>
      {dark ? "☀️" : "🌙"}
    </button>
  )
}
