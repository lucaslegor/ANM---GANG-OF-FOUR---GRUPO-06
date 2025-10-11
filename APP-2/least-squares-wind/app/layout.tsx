import type React from "react"
import "../app/globals.css"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import { AnalysisProvider } from "@/context/AnalysisContext"

export const metadata: Metadata = {
  title: "Least Squares – Wind Power Analysis",
  description: "Regression analysis for wind power vs speed using least squares methods",
    generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" />
      </head>
      <body>
        <AnalysisProvider>
          <Navbar />
          <main className="container">{children}</main>
        </AnalysisProvider>
      </body>
    </html>
  )
}
