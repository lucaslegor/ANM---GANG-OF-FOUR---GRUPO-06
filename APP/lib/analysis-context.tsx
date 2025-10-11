"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface DataPoint {
  velocidad: number
  potencia: number
}

interface FitResult {
  model: "linear" | "quadratic" | "power"
  params: Record<string, number>
  r2: number
  r2Adj: number
  yhat: number[]
  resid: number[]
  equation: string
}

interface AnalysisContextType {
  dataset: DataPoint[]
  setDataset: (data: DataPoint[]) => void
  selectedModels: Set<string>
  toggleModel: (model: string) => void
  fitResults: FitResult[]
  setFitResults: (results: FitResult[]) => void
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined)

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [dataset, setDataset] = useState<DataPoint[]>([])
  const [selectedModels, setSelectedModels] = useState<Set<string>>(new Set(["linear"]))
  const [fitResults, setFitResults] = useState<FitResult[]>([])

  const toggleModel = (model: string) => {
    setSelectedModels((prev) => {
      const next = new Set(prev)
      if (next.has(model)) {
        next.delete(model)
      } else {
        next.add(model)
      }
      return next
    })
  }

  return (
    <AnalysisContext.Provider
      value={{
        dataset,
        setDataset,
        selectedModels,
        toggleModel,
        fitResults,
        setFitResults,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  )
}

export function useAnalysis() {
  const context = useContext(AnalysisContext)
  if (!context) {
    throw new Error("useAnalysis must be used within AnalysisProvider")
  }
  return context
}
