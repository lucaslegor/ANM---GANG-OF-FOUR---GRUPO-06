"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, Upload, LineChart, BarChart3 } from "lucide-react"
import Image from "next/image"

const navItems = [
  { href: "/theory", label: "Teoría", icon: BookOpen },
  { href: "/dataset", label: "Datos", icon: Upload },
  { href: "/fit", label: "Ajuste", icon: LineChart },
  { href: "/comparison", label: "Comparación", icon: BarChart3 },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/theory" className="flex items-center gap-3 font-semibold text-lg">
            <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
            <span className="hidden sm:inline">Mínimos Cuadrados</span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
