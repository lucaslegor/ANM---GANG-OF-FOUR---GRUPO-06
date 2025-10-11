import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AnalysisProvider } from "@/lib/analysis-context"
import Navbar from "@/components/navbar"
import Script from "next/script"
import { Suspense } from "react"


export const metadata: Metadata = {
  title: "Análisis de Mínimos Cuadrados - Gang Of Four",
  description: "Ajuste por Mínimos Cuadrados: Potencia Eólica vs Velocidad",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <Script
          id="mathjax-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.MathJax = {
                tex: {
                  inlineMath: [['$', '$'], ['\\\$$', '\\\$$']],
                  displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']]
                },
                svg: {
                  fontCache: 'global'
                }
              };
            `,
          }}
        />
        <Script id="mathjax" src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js" strategy="afterInteractive" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <AnalysisProvider>
            <Navbar />
            <main>{children}
            </main>
            {process.env.NODE_ENV === 'production' && <Analytics />}
          </AnalysisProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
