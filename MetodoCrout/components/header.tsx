"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import ThemeToggle from "./theme-toggle"

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="bg-white dark:bg-gray-900 border-b-2 border-[#ea1f27] shadow-sm transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image src="/logo.png" alt="Gang Of Four Logo" width={50} height={50} className="rounded-full" />
            <h1 className="text-2xl font-bold text-[#ea1f27]">Gang Of Four</h1>
          </div>

          <div className="flex items-center space-x-4">
            <nav className="flex space-x-6">
              <Link
                href="/"
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  pathname === "/" ? "bg-[#ea1f27] text-white" : "text-[#ea1f27] hover:bg-[#ea1f27] hover:text-white"
                }`}
              >
                Inicio
              </Link>
              <Link
                href="/ejercicios"
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  pathname === "/ejercicios"
                    ? "bg-[#26a7df] text-white"
                    : "text-[#26a7df] hover:bg-[#26a7df] hover:text-white"
                }`}
              >
                Ejercicios
              </Link>
              <Link
                href="/ejercicios-quiz"
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  pathname === "/ejercicios-quiz"
                    ? "bg-[#ea1f27] text-white"
                    : "text-[#ea1f27] hover:bg-[#ea1f27] hover:text-white"
                }`}
              >
                Ejercicios y Quiz
              </Link>
              <Link
                href="/calculadora"
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  pathname === "/calculadora"
                    ? "bg-[#faec1d] text-black"
                    : "text-gray-700 dark:text-gray-300 hover:bg-[#faec1d] hover:text-black"
                }`}
              >
                Calculadora
              </Link>
              <Link
                href="/acerca"
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  pathname === "/acerca"
                    ? "bg-gray-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-600 hover:text-white"
                }`}
              >
                Acerca de
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
