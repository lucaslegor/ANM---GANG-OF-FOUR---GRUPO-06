import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Método de Crout - Gang Of Four",
  description: "Sitio educativo sobre el Método de Crout (LU) para resolver sistemas de ecuaciones lineales",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-white dark:bg-[#121212] text-gray-900 dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
