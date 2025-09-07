"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SignificantFiguresPresentation() {
  const [showDefinition, setShowDefinition] = useState(false)
  const [showStep1Answer1, setShowStep1Answer1] = useState(false)
  const [showStep1Answer2, setShowStep1Answer2] = useState(false)
  const [showStep2Answer1, setShowStep2Answer1] = useState(false)
  const [showStep2Answer2, setShowStep2Answer2] = useState(false)
  const [showStep3Answer1, setShowStep3Answer1] = useState(false)
  const [showStep3Answer2, setShowStep3Answer2] = useState(false)
  const [showPiCalculation, setShowPiCalculation] = useState(false)

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-[#ea1f27] text-balance">
            Cifras significativas exactas de un número aproximado y Relación con cotas de error
          </h1>
          <p className="text-xl text-gray-600">Una Introducción al Cálculo Numérico</p>
        </div>

        {/* Section 1: Introduction */}
        <Card className="shadow-lg border-[#ea1f27] border-2">
          <CardHeader className="bg-[#ea1f27] text-white">
            <CardTitle className="text-2xl flex items-center gap-2">
              ¿Qué son las Cifras Significativas?
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDefinition(!showDefinition)}
                className="bg-white text-[#ea1f27] border-white mt-1 hover:bg-gray-100"
              >
                {showDefinition ? "Ocultar" : "Mostrar"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 mt-4">
            {showDefinition && (
              <div className="space-y-4 animate-in fade-in duration-500">
                <p className="text-gray-700 leading-relaxed">
                  Las cifras significativas son los dígitos de un número que aportan información sobre su exactitud y
                  precisión, incluyendo todos los dígitos distintos de cero y los ceros que son necesarios para indicar
                  esa precisión.
                </p>

                <div className="bg-[#26a7df]/10 p-4 rounded-lg border border-[#26a7df]">
                  <h4 className="font-semibold text-[#26a7df] mb-3">Reglas para definir cifras significativas:</h4>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="space-y-1">
                      <div>• Todos los dígitos excepto el cero son siempre significativos</div>
                      <div className="ml-4 text-[#26a7df] font-mono">
                        Ejemplo: 789 contiene 3 dígitos significativos
                      </div>
                    </li>
                    <li className="space-y-1">
                      <div>• Cualquier cero entre dos dígitos distintos de cero es significativo</div>
                      <div className="ml-4 text-[#26a7df] font-mono">
                        Ejemplo: 10.007 contiene 5 dígitos significativos
                      </div>
                    </li>
                    <li className="space-y-1">
                      <div>• Los ceros a la izquierda del primer dígito distinto de cero no son significativos</div>
                      <div className="ml-4 text-[#26a7df] font-mono">
                        Ejemplo: 0,0012 contiene 2 dígitos significativos
                      </div>
                    </li>
                    <li className="space-y-1">
                      <div>
                        • Los ceros a la derecha del punto decimal son significativos cuando no hay dígitos distintos de
                        cero después
                      </div>
                      <div className="ml-4 text-[#26a7df] font-mono">
                        Ejemplo: 80.00 contiene 4 dígitos significativos
                      </div>
                    </li>
                    <li className="space-y-1">
                      <div>
                        • Los ceros a la derecha del último dígito distinto de cero después del punto decimal son
                        significativos
                      </div>
                      <div className="ml-4 text-[#26a7df] font-mono">
                        Ejemplo: 0.005500 contiene 4 dígitos significativos
                      </div>
                    </li>
                    <li className="space-y-1">
                      <div>
                        • Los ceros a la derecha del último dígito distinto de cero son significativos cuando provienen
                        de una medición (depende del contexto)
                      </div>
                      <div className="ml-4 text-[#26a7df] font-mono">
                        Ejemplo: 3560 m contiene 4 dígitos significativos
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#faec1d]/20 p-3 rounded-lg border border-[#faec1d]">
                    <p className="font-mono text-lg">2,003</p>
                    <p className="text-sm text-gray-700">tiene cuatro cifras significativas</p>
                  </div>
                  <div className="bg-[#faec1d]/20 p-3 rounded-lg border border-[#faec1d]">
                    <p className="font-mono text-lg">0,0020</p>
                    <p className="text-sm text-gray-700">tiene dos cifras significativas (el 2 y el 0 de la derecha)</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 2: Exact Significant Figures */}
        <Card className="shadow-lg border-[#26a7df] border-2">
          <CardHeader className="bg-[#26a7df] text-white">
            <CardTitle className="text-2xl">¿Cuán "Exactas" son Nuestras Cifras?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 mt-4">
            <p className="text-gray-700 leading-relaxed">
              Un número aproximado tiene todas sus cifras significativas exactas si el error absoluto es inferior a una
              unidad del orden de la última cifra.
            </p>

            <div className="bg-[#26a7df]/10 p-4 rounded-lg border border-[#26a7df]">
              <p className="font-mono text-center text-lg mb-2">Δ*(a) = |Δ(a)| = |α - a| ≤ 10^(-m) × 10^k</p>
              <p className="text-sm text-[#26a7df] text-center">Cifras exactas en sentido estricto</p>
              <p className="font-mono text-center text-lg mt-2">Δ*(a) = |Δ(a)| ≤ (1/2) × 10^(-m) × 10^k</p>
            </div>

            <div className="bg-[#faec1d]/20 p-4 rounded-lg border border-[#faec1d]">
              <h4 className="font-semibold text-gray-800 mb-3">Ejemplo con π:</h4>
              <p className="mb-2">π = 3.14159 redondeado a 3.14</p>

              <Button
                variant="outline"
                onClick={() => setShowPiCalculation(!showPiCalculation)}
                className="mb-3 border-[#ea1f27] text-[#ea1f27] hover:bg-[#ea1f27] hover:text-white"
              >
                {showPiCalculation ? "Ocultar cálculo" : "Ver cálculo paso a paso"}
              </Button>

              {showPiCalculation && (
                <div className="space-y-2 animate-in fade-in duration-500 text-sm">
                  <p>• Una centésima es igual a 10^(-2) 0.01</p> 
                  <p>• Dividimos el orden a la mitad: 1/2 × 0.01 = 0.005</p>
                  <p>• Verificación: |π - 3.14| = |3.14159 - 3.14| = 0.00159</p>
                  <p className="font-semibold text-[#26a7df]">• Como 0.00159 ≤ 0.005, la cota de error se cumple ✓</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Interactive Exercise */}
        <Card className="shadow-lg border-[#faec1d] border-2">
          <CardHeader className="bg-[#faec1d] text-black">
            <CardTitle className="text-2xl">¡Pongamos a Prueba!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 mt-4">
            <p className="text-lg font-semibold">Número: 1,62351....</p>

            {/* Step 1: Décimas */}
            <div className="bg-[#ea1f27]/10 p-4 rounded-lg border border-[#ea1f27]">
              <h4 className="font-semibold text-[#ea1f27] mb-3">Paso 1: Redondeo a décimas → 1.6</h4>
              <div className="space-y-3">
                <div>
                  <p className="mb-2">¿Cuántas cifras significativas tiene 1.6?</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowStep1Answer1(!showStep1Answer1)}
                    className="border-[#ea1f27] text-[#ea1f27] hover:bg-[#ea1f27] hover:text-white"
                  >
                    Ver respuesta
                  </Button>
                  {showStep1Answer1 && (
                    <Badge className="ml-2 bg-[#ea1f27] text-white animate-in fade-in duration-300">
                      2 CIFRAS SIGNIFICATIVAS
                    </Badge>
                  )}
                </div>
                <div>
                  <p className="mb-2">¿Cuál es la cota de error?</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowStep1Answer2(!showStep1Answer2)}
                    className="border-[#ea1f27] text-[#ea1f27] hover:bg-[#ea1f27] hover:text-white"
                  >
                    Ver respuesta
                  </Button>
                  {showStep1Answer2 && (
                    <Badge className="ml-2 bg-[#ea1f27] text-white animate-in fade-in duration-300">0,05</Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Centésimas */}
            <div className="bg-[#26a7df]/10 p-4 rounded-lg border border-[#26a7df]">
              <h4 className="font-semibold text-[#26a7df] mb-3">Paso 2: Redondeo a centésimas → 1.62</h4>
              <div className="space-y-3">
                <div>
                  <p className="mb-2">¿Cuántas cifras significativas tiene 1.62?</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowStep2Answer1(!showStep2Answer1)}
                    className="border-[#26a7df] text-[#26a7df] hover:bg-[#26a7df] hover:text-white"
                  >
                    Ver respuesta
                  </Button>
                  {showStep2Answer1 && (
                    <Badge className="ml-2 bg-[#26a7df] text-white animate-in fade-in duration-300">
                      3 CIFRAS SIGNIFICATIVAS
                    </Badge>
                  )}
                </div>
                <div>
                  <p className="mb-2">¿Cuál es la cota de error?</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowStep2Answer2(!showStep2Answer2)}
                    className="border-[#26a7df] text-[#26a7df] hover:bg-[#26a7df] hover:text-white"
                  >
                    Ver respuesta
                  </Button>
                  {showStep2Answer2 && (
                    <Badge className="ml-2 bg-[#26a7df] text-white animate-in fade-in duration-300">0,005</Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Step 3: Milésimas */}
            <div className="bg-[#faec1d]/20 p-4 rounded-lg border border-[#faec1d]">
              <h4 className="font-semibold text-gray-800 mb-3">Paso 3: Redondeo a milésimas → 1.624</h4>
              <div className="space-y-3">
                <div>
                  <p className="mb-2">¿Cuántas cifras significativas tiene 1.624?</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowStep3Answer1(!showStep3Answer1)}
                    className="border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white"
                  >
                    Ver respuesta
                  </Button>
                  {showStep3Answer1 && (
                    <Badge className="ml-2 bg-gray-600 text-white animate-in fade-in duration-300">
                      4 CIFRAS SIGNIFICATIVAS
                    </Badge>
                  )}
                </div>
                <div>
                  <p className="mb-2">¿Cuál es la cota de error?</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowStep3Answer2(!showStep3Answer2)}
                    className="border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white"
                  >
                    Ver respuesta
                  </Button>
                  {showStep3Answer2 && (
                    <Badge className="ml-2 bg-gray-600 text-white animate-in fade-in duration-300">0,0005</Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Relative Error */}
        <Card className="shadow-lg border-[#ea1f27] border-2">
          <CardHeader className="bg-[#ea1f27] text-white">
            <CardTitle className="text-2xl">Cota de Error Relativo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 mt-4">
            <div className="bg-[#ea1f27]/10 p-4 rounded-lg border border-[#ea1f27]">
              <p className="font-mono text-center text-lg mb-2">ε*(a) ≤ Δ*(a) / |a|</p>
              <p className="text-sm text-[#ea1f27] text-center">Fórmula de la cota del error relativo</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
              <p className="text-gray-700 leading-relaxed text-center">
                <strong>Conclusión:</strong> Cuanto mayor sea el número de cifras significativas, menor será el valor
                del error relativo.
              </p>
            </div>

            <div className="bg-[#26a7df]/10 p-4 rounded-lg border border-[#26a7df]">
              <h4 className="font-semibold text-[#26a7df] mb-2">Ejemplo:</h4>
              <p className="text-sm">Número aproximado a = 0,57</p>
              <p className="text-sm">Ea = 0,005 (orden de las centésimas)</p>
              <p className="text-sm">Er = 0,005/0,57 = 0,0088 ≈ 0,8%</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8 space-y-4">
          <p className="text-gray-600">Presentación Interactiva - Teoría de Errores y Cifras Significativas</p>
        </div>
      </div>
    </div>
  )
}
