"use client"

import { InteractiveCalculator } from "@/components/calculator/interactive-calculator"

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 tech-grid opacity-20"></div>
      <div className="container mx-auto px-4 py-24 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-6xl font-bold mb-4 gradient-text">
            Calculadora de Métodos Numéricos
          </h1>
          <div className="h-1 w-48 mx-auto bg-gradient-to-r from-red-500 to-blue-500 rounded-full mb-6"></div>
          <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            Resuelve Problemas de Valor Inicial con Euler y RK2
          </p>
        </div>

        {/* Interactive Calculator */}
        <div className="mb-20">
          <InteractiveCalculator />
        </div>

        {/* Se eliminan secciones de Ejemplos y Práctica */}
      </div>
    </div>
  )
}
