"use client"
import Link from "next/link"
import ThemeToggle from "./ThemeToggle"
import { usePathname } from "next/navigation"

const links = [
  { href: "/", label: "Home" },
  { href: "/dataset", label: "Dataset" },
  { href: "/fit", label: "Fit" },
  { href: "/diagnostics", label: "Diagnostics" },
  { href: "/theory", label: "Theory" },
  { href: "/about", label: "About" },
]

export default function Navbar() {
  const path = usePathname()
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link className="brand" href="/">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          Wind Analysis
        </Link>
        <nav className="nav-links">
          {links.map((l) => (
            <Link key={l.href} className={`nav-link ${path === l.href ? "nav-active" : ""}`} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}
