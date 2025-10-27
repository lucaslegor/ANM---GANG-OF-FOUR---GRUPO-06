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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-cyan-500/30 shadow-lg shadow-cyan-500/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-full p-1 shadow-lg shadow-red-500/50 group-hover:shadow-red-500/80 transition-all duration-300">
              <Image
                src="/logo.jpg"
                alt="Logo UTN"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
                style={{ backgroundColor: "white" }}
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-red-400 to-cyan-400 bg-clip-text text-transparent">
              Gang Of Four
            </span>
          </Link>

          <div className="flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-all duration-300 hover:scale-110 relative group",
                  pathname === item.href
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-cyan-300",
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-cyan-500 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
