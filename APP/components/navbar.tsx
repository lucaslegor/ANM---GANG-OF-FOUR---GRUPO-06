"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import styles from "./navbar.module.css"

export default function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/dataset", label: "Dataset" },
    { href: "/fit", label: "Ajuste" },
    { href: "/comparisons", label: "Comparaciones" },
    { href: "/diagnostics", label: "Diagnóstico" },
    { href: "/theory", label: "Teoría" },
    { href: "/about", label: "Acerca" },
  ]

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.brand}>
          <div className={styles.logo}>
            <svg viewBox="0 0 100 100" className={styles.logoSvg}>
              <circle cx="50" cy="50" r="45" fill="#3b82f6" />
              <circle cx="50" cy="50" r="35" fill="#ef4444" />
              <circle cx="50" cy="50" r="25" fill="#fbbf24" />
              <circle cx="50" cy="50" r="15" fill="#10b981" />
            </svg>
          </div>
          <span className={styles.brandText}>Gang Of Four</span>
        </Link>

        <div className={styles.links}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${pathname === link.href ? styles.linkActive : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <ThemeToggle />
      </div>
    </nav>
  )
}
