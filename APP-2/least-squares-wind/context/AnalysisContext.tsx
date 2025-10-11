"use client"
import type React from "react"
import { createContext, useContext, useMemo, useState } from "react"

export type FitResult = {
  model: "linear" | "quadratic" | "power"
  n: number
  k: number
  r2: number
  r2Adj: number
  yhat: number[]
  residuals: number[]
  equationLatex: string
  coef?: number[]
}

type Selected = { linear: boolean; quadratic: boolean; power: boolean }

type Ctx = {
  x: number[]
  y: number[]
  selected: Selected
  setSelected: (s: Selected) => void
  setData: (x: number[], y: number[]) => void
  setResults: (r: Record<string, FitResult>) => void
  results: Record<string, FitResult>
  dataSummary: null | {
    n: number
    x: { min: number; max: number; mean: number }
    y: { min: number; max: number; mean: number }
  }
}

const C = createContext<Ctx | null>(null)

export const useAnalysis = () => {
  const ctx = useContext(C)
  if (!ctx) throw new Error("AnalysisContext missing")
  return ctx
}

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [x, setX] = useState<number[]>([])
  const [y, setY] = useState<number[]>([])
  const [selected, setSelected] = useState<Selected>({ linear: true, quadratic: false, power: true })
  const [results, setResults] = useState<Record<string, FitResult>>({})

  const dataSummary = useMemo(() => {
    if (x.length === 0) return null
    const mean = (a: number[]) => a.reduce((s, v) => s + v, 0) / a.length
    return {
      n: x.length,
      x: { min: Math.min(...x), max: Math.max(...x), mean: mean(x) },
      y: { min: Math.min(...y), max: Math.max(...y), mean: mean(y) },
    }
  }, [x, y])

  function setData(nx: number[], ny: number[]) {
    setX(nx)
    setY(ny)
    setResults({})
  }

  return (
    <C.Provider value={{ x, y, selected, setSelected, setData, results, dataSummary, setResults }}>
      {children}
    </C.Provider>
  )
}
