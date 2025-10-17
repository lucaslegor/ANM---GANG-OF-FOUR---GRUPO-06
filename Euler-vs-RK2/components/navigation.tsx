"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/methods", label: "Los Métodos" },
  { href: "/comparison", label: "Comparativa" },
  { href: "/verdict", label: "Veredicto Final" },
  { href: "/source", label: "Fuentes" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-white rounded-full p-1 shadow-sm">
              <Image
                src="/logo.jpg"
                alt="Logo UTN"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
                style={{ backgroundColor: "white" }}
              />
            </div>
            <span className="text-xl font-bold" style={{ color: "#EA1F27" }}>
              Gang Of Four
            </span>
          </Link>

          <div className="flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:opacity-80",
                  pathname === item.href ? "text-[var(--color-primary)]" : "text-[var(--color-foreground)]",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
