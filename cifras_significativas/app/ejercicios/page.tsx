"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function EjerciciosPage() {
  const [showAnswerA, setShowAnswerA] = useState(false)
  const [showAnswerB, setShowAnswerB] = useState(false)
  const [showAnswerC, setShowAnswerC] = useState(false)

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
            className="flex items-center gap-2 border-[#ea1f27] text-[#ea1f27] hover:bg-[#ea1f27] hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
          <h1 className="text-4xl font-bold text-[#ea1f27] text-balance">Ejercicio N°5 - Práctica 1</h1>
        </div>

        {/* Exercise A */}
        <Card className="shadow-lg border-[#ea1f27] border-2">
          <CardHeader className="bg-[#ea1f27] text-white">
            <CardTitle className="text-2xl">a) Determinar una cota para el error absoluto y relativo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 mt-4">
            <div className="bg-[#26a7df]/10 p-4 rounded-lg border border-[#26a7df]">
              <p className="font-semibold mb-2">Dado: π = 3.14159265</p>
              <p className="mb-4">Redondeado a 3 cifras significativas:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded border border-[#faec1d]">
                  <p className="font-semibold text-[#ea1f27]">Por defecto: a = 3.14</p>
                </div>
                <div className="bg-white p-3 rounded border border-[#faec1d]">
                  <p className="font-semibold text-[#ea1f27]">Por exceso: a = 3.15</p>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowAnswerA(!showAnswerA)}
              className="w-full border-[#ea1f27] text-[#ea1f27] hover:bg-[#ea1f27] hover:text-white"
            >
              {showAnswerA ? "Ocultar solución" : "Ver solución paso a paso"}
            </Button>

            {showAnswerA && (
              <div className="space-y-4 animate-in fade-in duration-500">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                  <h4 className="font-semibold mb-3 text-[#26a7df]">Solución:</h4>
                  <div className="space-y-2 text-sm">
                    <p>Para ambos casos trabajamos en el orden de las centésimas (10⁻²)</p>
                    <p className="font-mono">Cota de error absoluto = (1/2) × 10⁻² = 0.005</p>

                    <div className="mt-4 space-y-2">
                      <p className="font-semibold">Cota del error relativo:</p>
                      <p>Por defecto: 0.005/3.14 = 0.00159</p>
                      <p>Por exceso: 0.005/3.15 = 0.00158</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Exercise B */}
        <Card className="shadow-lg border-[#26a7df] border-2">
          <CardHeader className="bg-[#26a7df] text-white">
            <CardTitle className="text-2xl">b) Indicar en qué intervalo se puede asegurar que se encuentra π</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 mt-4">
            <div className="bg-[#26a7df]/10 p-4 rounded-lg border border-[#26a7df]">
              <p className="font-mono text-center text-lg">I(α) = a ± Cota del error absoluto</p>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowAnswerB(!showAnswerB)}
              className="w-full border-[#26a7df] text-[#26a7df] hover:bg-[#26a7df] hover:text-white"
            >
              {showAnswerB ? "Ocultar solución" : "Ver solución"}
            </Button>

            {showAnswerB && (
              <div className="space-y-4 animate-in fade-in duration-500">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                  <h4 className="font-semibold mb-3 text-[#26a7df]">Solución:</h4>
                  <div className="space-y-3">
                    <div className="bg-[#faec1d]/20 p-3 rounded border border-[#faec1d]">
                      <p className="font-semibold text-gray-800">Por defecto:</p>
                      <p className="font-mono">3.14 - 0.005 &lt; α &lt; 3.14 + 0.005</p>
                      <p className="font-mono font-bold">3.135 &lt; α &lt; 3.145</p>
                    </div>

                    <div className="bg-[#ea1f27]/10 p-3 rounded border border-[#ea1f27]">
                      <p className="font-semibold text-[#ea1f27]">Por exceso:</p>
                      <p className="font-mono">3.15 - 0.005 &lt; α &lt; 3.15 + 0.005</p>
                      <p className="font-mono font-bold">3.145 &lt; α &lt; 3.155</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Exercise C */}
        <Card className="shadow-lg border-[#faec1d] border-2">
          <CardHeader className="bg-[#faec1d] text-black">
            <CardTitle className="text-2xl">
              c) Determinar con cuántas cifras significativas deben tomarse los valores de π
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 mt-4">
            <div className="bg-[#faec1d]/20 p-4 rounded-lg border border-[#faec1d]">
              <p className="mb-2">Para que su cota de error absoluto sea menor que 10⁻⁶</p>
              <p className="font-mono text-center">Cota de error para n cifras significativas = 0.5 × 10⁻⁽ⁿ⁻¹⁾</p>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowAnswerC(!showAnswerC)}
              className="w-full border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white"
            >
              {showAnswerC ? "Ocultar solución" : "Ver solución paso a paso"}
            </Button>

            {showAnswerC && (
              <div className="space-y-4 animate-in fade-in duration-500">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                  <h4 className="font-semibold mb-3 text-gray-700">Solución:</h4>
                  <div className="space-y-2 text-sm font-mono">
                    <p>Condición: 0.5 × 10⁻⁽ⁿ⁻¹⁾ &lt; 10⁻⁶</p>
                    <p>10⁻⁽ⁿ⁻¹⁾ &lt; 2 × 10⁻⁶</p>
                    <p>log(10⁻⁽ⁿ⁻¹⁾) &lt; log(2 × 10⁻⁶)</p>
                    <p>-(n-1) &lt; log(2) + log(10⁻⁶)</p>
                    <p>-n + 1 &lt; 0.301 - 6</p>
                    <p>-n &lt; -6.699</p>
                    <p className="font-bold text-[#ea1f27]">n &gt; 6.699</p>
                  </div>

                  <div className="mt-4 p-3 bg-[#faec1d]/20 rounded border border-[#faec1d]">
                    <p className="font-bold text-gray-800 text-center">
                      Por lo tanto, se necesitan 7 cifras significativas
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-gray-600">Ejercicios - Teoría de Errores y Cifras Significativas</p>
        </div>
      </div>
    </div>
  )
}
