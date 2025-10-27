import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { MathRenderer } from "@/components/math-renderer"
import { Footer } from "@/components/footer"
import Script from "next/script"
import 'katex/dist/katex.min.css'; 


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Euler vs RK2 - Comparación de Métodos Numéricos",
  description:
    "Una comparación exhaustiva entre el Método de Euler y Runge-Kutta 2 para resolver Problemas de Valor Inicial",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main className="pt-16">{children}</main>
        <Footer />
        <Script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js" strategy="beforeInteractive" />
        <Script
          src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
          strategy="beforeInteractive"
        />
        <MathRenderer />
      </body>
    </html>
  )
}
