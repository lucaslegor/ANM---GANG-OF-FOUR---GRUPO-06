"use client"
import { useEffect, useRef } from "react"

export default function Equation({ tex }: { tex: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current && typeof window !== "undefined" && (window as any).MathJax) {
      ;(window as any).MathJax.typesetPromise([ref.current]).catch((err: any) => console.error("MathJax error:", err))
    }
  }, [tex])

  return (
    <div ref={ref} style={{ fontSize: "1.1rem", margin: "0.75rem 0" }}>
      {`\\[${tex}\\]`}
    </div>
  )
}
