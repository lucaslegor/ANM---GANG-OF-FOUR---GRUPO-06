"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ChevronDown, ChevronRight } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function EjerciciosPage() {
  const [showEjercicio7, setShowEjercicio7] = useState(false)
  const [showEjercicio8, setShowEjercicio8] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
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
          <h1 className="text-4xl font-bold text-[#ea1f27] text-balance">Ejercicios – Método de Crout</h1>
        </div>

        <Card className="shadow-lg border-[#26a7df] border-2">
          <CardHeader className="bg-[#26a7df] text-white">
            <CardTitle className="text-xl">Cómo usar</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-700 dark:text-gray-300">
              Cada ejercicio presenta un <strong>Enunciado</strong> con el problema a resolver y una{" "}
              <strong>Solución</strong>
              desplegable con los pasos detallados. Te recomendamos intentar resolver el ejercicio por tu cuenta antes
              de consultar la solución.
            </p>
          </CardContent>
        </Card>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-[#ea1f27] mb-8">Práctica adicional (TP)</h2>

          {/* Ejercicio 7 */}
          <Card className="shadow-lg border-[#ea1f27] border-2">
            <CardHeader className="bg-[#ea1f27] text-white">
              <CardTitle className="text-2xl">Ejercicio 7 (TP3 – Sistemas de Ecuaciones Lineales)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 mt-4">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#26a7df]">Enunciado:</h3>
                <div className="bg-[#ea1f27]/10 p-4 rounded-lg border border-[#ea1f27]">
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="font-mono text-lg mb-4">
                        A = [1 2 3 4 ]<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;[1 4 9 16 ]<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;[1 8 27 64 ]<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;[1 16 81 256]
                      </div>
                      <div className="font-mono text-lg">b = [2, 10, 44, 190]ᵀ</div>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="font-semibold mb-2">Tareas:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Factorizar A = L·U (Crout con diag(U) = 1)</li>
                        <li>Calcular det(A)</li>
                        <li>Resolver Ax = b</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Collapsible open={showEjercicio7} onOpenChange={setShowEjercicio7}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full border-[#ea1f27] text-[#ea1f27] hover:bg-[#ea1f27] hover:text-white flex items-center justify-center gap-2 bg-transparent"
                    >
                      {showEjercicio7 ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      {showEjercicio7 ? "Ocultar solución" : "Ver solución paso a paso"}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 mt-4">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-300">
                      <h4 className="font-semibold mb-4 text-[#26a7df] text-lg">Solución Detallada:</h4>

                      <div className="space-y-8">
                        {/* Fórmulas de Crout */}
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <h5 className="font-semibold text-[#26a7df] mb-3">Fórmulas de Crout (con diag(U) = 1):</h5>
                          <div className="space-y-2 text-sm font-mono">
                            <p>• u_kk = 1</p>
                            <p>• l_ik = a_ik - Σ(l_ip × u_pk) para i = k,...,n</p>
                            <p>• u_kj = (a_kj - Σ(l_kp × u_pj)) / l_kk para j = k+1,...,n</p>
                          </div>
                        </div>

                        {/* Paso k=1 */}
                        <div>
                          <h5 className="font-semibold text-[#ea1f27] mb-3">Paso k = 1:</h5>
                          <div className="bg-white p-4 rounded border space-y-3">
                            <p className="text-sm text-gray-600">
                              Suma vacía ⇒ tomamos la columna 1 de L directo de A y la fila 1 de U dividiendo por l₁₁
                            </p>
                            <div className="grid md:grid-cols-2 gap-4 text-sm font-mono">
                              <div>
                                <p className="font-semibold mb-2">Columna L:</p>
                                <p>l₁₁ = a₁₁ = 1</p>
                                <p>l₂₁ = a₂₁ = 1</p>
                                <p>l₃₁ = a₃₁ = 1</p>
                                <p>l₄₁ = a₄₁ = 1</p>
                              </div>
                              <div>
                                <p className="font-semibold mb-2">Fila U:</p>
                                <p>u₁₁ = 1</p>
                                <p>u₁₂ = a₁₂/l₁₁ = 2/1 = 2</p>
                                <p>u₁₃ = a₁₃/l₁₁ = 3/1 = 3</p>
                                <p>u₁₄ = a₁₄/l₁₁ = 4/1 = 4</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Paso k=2 */}
                        <div>
                          <h5 className="font-semibold text-[#ea1f27] mb-3">Paso k = 2:</h5>
                          <div className="bg-white p-4 rounded border space-y-3">
                            <div className="text-sm font-mono space-y-1">
                              <p>l₂₂ = a₂₂ - l₂₁×u₁₂ = 4 - (1)(2) = 2</p>
                              <p>l₃₂ = a₃₂ - l₃₁×u₁₂ = 8 - (1)(2) = 6</p>
                              <p>l₄₂ = a₄₂ - l₄₁×u₁₂ = 16 - (1)(2) = 14</p>
                              <p>u₂₂ = 1</p>
                              <p>u₂₃ = (a₂₃ - l₂₁×u₁₃)/l₂₂ = (9 - (1)(3))/2 = 6/2 = 3</p>
                              <p>u₂₄ = (a₂₄ - l₂₁×u₁₄)/l₂₂ = (16 - (1)(4))/2 = 12/2 = 6</p>
                            </div>
                          </div>
                        </div>

                        {/* Paso k=3 */}
                        <div>
                          <h5 className="font-semibold text-[#ea1f27] mb-3">Paso k = 3:</h5>
                          <div className="bg-white p-4 rounded border space-y-3">
                            <div className="text-sm font-mono space-y-1">
                              <p>l₃₃ = a₃₃ - (l₃₁×u₁₃ + l₃₂×u₂₃) = 27 - (1×3 + 6×3) = 27 - 21 = 6</p>
                              <p>l₄₃ = a₄₃ - (l₄₁×u₁₃ + l₄₂×u₂₃) = 81 - (1×3 + 14×3) = 81 - 45 = 36</p>
                              <p>u₃₃ = 1</p>
                              <p>u₃₄ = (a₃₄ - (l₃₁×u₁₄ + l₃₂×u₂₄))/l₃₃ = (64 - (1×4 + 6×6))/6 = 24/6 = 4</p>
                            </div>
                          </div>
                        </div>

                        {/* Paso k=4 */}
                        <div>
                          <h5 className="font-semibold text-[#ea1f27] mb-3">Paso k = 4:</h5>
                          <div className="bg-white p-4 rounded border space-y-3">
                            <div className="text-sm font-mono">
                              <p>l₄₄ = a₄₄ - (l₄₁×u₁₄ + l₄₂×u₂₄ + l₄₃×u₃₄)</p>
                              <p>&nbsp;&nbsp;&nbsp;&nbsp;= 256 - (1×4 + 14×6 + 36×4) = 256 - 232 = 24</p>
                              <p>u₄₄ = 1</p>
                            </div>
                          </div>
                        </div>

                        {/* Resultado de factorización */}
                        <div>
                          <h5 className="font-semibold text-[#26a7df] mb-3">Resultado de la Factorización:</h5>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white p-3 rounded border">
                              <p className="font-semibold mb-2">Matriz L:</p>
                              <div className="font-mono text-sm">
                                [1&nbsp;&nbsp;0&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;0]
                                <br />
                                [1&nbsp;&nbsp;2&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;0]
                                <br />
                                [1&nbsp;&nbsp;6&nbsp;&nbsp;6&nbsp;&nbsp;&nbsp;0]
                                <br />
                                [1&nbsp;14&nbsp;36&nbsp;24]
                              </div>
                            </div>
                            <div className="bg-white p-3 rounded border">
                              <p className="font-semibold mb-2">Matriz U:</p>
                              <div className="font-mono text-sm">
                                [1&nbsp;2&nbsp;3&nbsp;4]
                                <br />
                                [0&nbsp;1&nbsp;3&nbsp;6]
                                <br />
                                [0&nbsp;0&nbsp;1&nbsp;4]
                                <br />
                                [0&nbsp;0&nbsp;0&nbsp;1]
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Determinante */}
                        <div className="bg-[#faec1d]/20 p-4 rounded border border-[#faec1d]">
                          <p className="font-semibold mb-2">Determinante:</p>
                          <p className="font-mono">det(A) = det(L) × det(U) = (1×2×6×24) × 1 = 288</p>
                        </div>

                        {/* Resolución del sistema */}
                        <div>
                          <h5 className="font-semibold text-[#26a7df] mb-3">Resolución del Sistema Ax = b:</h5>

                          {/* Forward substitution */}
                          <div className="space-y-4">
                            <div className="bg-white p-4 rounded border">
                              <p className="font-semibold mb-3">1) Sustitución hacia adelante (L·y = b):</p>
                              <div className="text-sm font-mono space-y-1">
                                <p>y₁ = 2</p>
                                <p>y₁ + 2y₂ = 10 ⇒ 2 + 2y₂ = 10 ⇒ y₂ = 4</p>
                                <p>y₁ + 6y₂ + 6y₃ = 44 ⇒ 2 + 24 + 6y₃ = 44 ⇒ y₃ = 3</p>
                                <p>y₁ + 14y₂ + 36y₃ + 24y₄ = 190 ⇒ 2 + 56 + 108 + 24y₄ = 190 ⇒ y₄ = 1</p>
                                <p className="font-semibold mt-2">⇒ y = (2, 4, 3, 1)ᵀ</p>
                              </div>
                            </div>

                            {/* Backward substitution */}
                            <div className="bg-white p-4 rounded border">
                              <p className="font-semibold mb-3">2) Sustitución hacia atrás (U·x = y):</p>
                              <div className="text-sm font-mono space-y-1">
                                <p>x₄ = 1</p>
                                <p>x₃ + 4x₄ = 3 ⇒ x₃ + 4 = 3 ⇒ x₃ = -1</p>
                                <p>x₂ + 3x₃ + 6x₄ = 4 ⇒ x₂ - 3 + 6 = 4 ⇒ x₂ = 1</p>
                                <p>x₁ + 2x₂ + 3x₃ + 4x₄ = 2 ⇒ x₁ + 2 - 3 + 4 = 2 ⇒ x₁ = -1</p>
                                <p className="font-semibold mt-2">⇒ x = (-1, 1, -1, 1)ᵀ</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Verificación */}
                        <div className="bg-green-50 p-4 rounded border border-green-200">
                          <p className="font-semibold text-green-800 mb-2">Verificación:</p>
                          <p className="text-sm space-y-1">
                            <p>L × U = A ✓</p>
                            <p>det(A) = 288 ✓</p>
                            <p>Solución: x = (-1, 1, -1, 1)ᵀ ✓</p>
                          </p>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-[#26a7df] border-2">
            <CardHeader className="bg-[#26a7df] text-white">
              <CardTitle className="text-2xl">Ejercicio 8 (a partir del Problema 1 – 3×3)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 mt-4">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#ea1f27]">Enunciado:</h3>
                <div className="bg-[#ea1f27]/10 p-4 rounded-lg border border-[#ea1f27]">
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-2">Sistema de ecuaciones:</p>
                      <div className="bg-white p-4 rounded border font-mono text-center space-y-2">
                        <div>3x + y + z = 4</div>
                        <div>2x + 5y + z = -1</div>
                        <div>-x + y + 3z = 4</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-mono text-lg mb-2">
                        A = [3 1 1]
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;[2 5 1]
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;[-1 1 3]
                      </div>
                      <div className="font-mono text-lg">b = [4, -1, 4]ᵀ</div>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="font-semibold mb-2">Tareas a realizar:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Factorizar A = L·U usando el método de Crout</li>
                        <li>Calcular det(A)</li>
                        <li>Resolver el sistema Ax = b</li>
                        <li>Verificar la solución</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Collapsible open={showEjercicio8} onOpenChange={setShowEjercicio8}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full border-[#26a7df] text-[#26a7df] hover:bg-[#26a7df] hover:text-white flex items-center justify-center gap-2 bg-transparent"
                    >
                      {showEjercicio8 ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      {showEjercicio8 ? "Ocultar solución" : "Ver solución paso a paso"}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 mt-4">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-300">
                      <h4 className="font-semibold mb-4 text-[#26a7df] text-lg">Solución Detallada:</h4>

                      <div className="space-y-8">
                        {/* Factorización paso a paso */}
                        <div>
                          <h5 className="font-semibold text-[#ea1f27] mb-3">
                            1) Factorización A = L·U (Crout, diag(U) = 1):
                          </h5>

                          {/* Paso k=1 */}
                          <div className="space-y-4">
                            <div className="bg-white p-4 rounded border">
                              <p className="font-semibold mb-2">Paso k = 1:</p>
                              <div className="text-sm font-mono space-y-1">
                                <p>l₁₁ = 3, l₂₁ = 2, l₃₁ = -1</p>
                                <p>u₁₂ = a₁₂/l₁₁ = 1/3</p>
                                <p>u₁₃ = a₁₃/l₁₁ = 1/3</p>
                              </div>
                            </div>

                            {/* Paso k=2 */}
                            <div className="bg-white p-4 rounded border">
                              <p className="font-semibold mb-2">Paso k = 2:</p>
                              <div className="text-sm font-mono space-y-1">
                                <p>l₂₂ = 5 - 2×(1/3) = 5 - 2/3 = 13/3</p>
                                <p>l₃₂ = 1 - (-1)×(1/3) = 1 + 1/3 = 4/3</p>
                                <p>u₂₃ = (1 - 2×(1/3))/(13/3) = (1/3)/(13/3) = 1/13</p>
                              </div>
                            </div>

                            {/* Paso k=3 */}
                            <div className="bg-white p-4 rounded border">
                              <p className="font-semibold mb-2">Paso k = 3:</p>
                              <div className="text-sm font-mono space-y-1">
                                <p>l₃₃ = 3 - [(-1)×(1/3) + (4/3)×(1/13)]</p>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;= 3 - (-1/3 + 4/39) = 3 - (-3/13) = 42/13</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Resultado de factorización */}
                        <div>
                          <h5 className="font-semibold text-[#26a7df] mb-3">Resultado de la Factorización:</h5>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white p-3 rounded border">
                              <p className="font-semibold mb-2">Matriz L:</p>
                              <div className="font-mono text-sm">
                                [3&nbsp;&nbsp;&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;]
                                <br />
                                [2&nbsp;&nbsp;13/3&nbsp;&nbsp;&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;]
                                <br />
                                [-1&nbsp;&nbsp;4/3&nbsp;&nbsp;42/13]
                              </div>
                            </div>
                            <div className="bg-white p-3 rounded border">
                              <p className="font-semibold mb-2">Matriz U:</p>
                              <div className="font-mono text-sm">
                                [1&nbsp;&nbsp;1/3&nbsp;&nbsp;1/3&nbsp;]
                                <br />
                                [0&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;1/13]
                                <br />
                                [0&nbsp;&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;]
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Determinante */}
                        <div className="bg-[#faec1d]/20 p-4 rounded border border-[#faec1d]">
                          <p className="font-semibold mb-2">Determinante:</p>
                          <p className="font-mono">det(A) = det(L) × det(U) = 3 × (13/3) × (42/13) = 42</p>
                        </div>

                        {/* Resolución del sistema */}
                        <div>
                          <h5 className="font-semibold text-[#26a7df] mb-3">2) Resolución del Sistema:</h5>

                          {/* Forward substitution */}
                          <div className="space-y-4">
                            <div className="bg-white p-4 rounded border">
                              <p className="font-semibold mb-3">Sustitución hacia adelante (L·y = b):</p>
                              <div className="text-sm font-mono space-y-1">
                                <p>3y₁ = 4 ⇒ y₁ = 4/3</p>
                                <p>2y₁ + (13/3)y₂ = -1 ⇒ 8/3 + (13/3)y₂ = -1 ⇒ y₂ = -11/13</p>
                                <p>-y₁ + (4/3)y₂ + (42/13)y₃ = 4</p>
                                <p>⇒ -4/3 + (4/3)(-11/13) + (42/13)y₃ = 4</p>
                                <p>⇒ -32/13 + (42/13)y₃ = 4 ⇒ y₃ = 2</p>
                                <p className="font-semibold mt-2">⇒ y = (4/3, -11/13, 2)ᵀ</p>
                              </div>
                            </div>

                            {/* Backward substitution */}
                            <div className="bg-white p-4 rounded border">
                              <p className="font-semibold mb-3">Sustitución hacia atrás (U·x = y):</p>
                              <div className="text-sm font-mono space-y-1">
                                <p>x₃ = y₃ = 2</p>
                                <p>x₂ + (1/13)x₃ = y₂ ⇒ x₂ + 2/13 = -11/13 ⇒ x₂ = -1</p>
                                <p>x₁ + (1/3)x₂ + (1/3)x₃ = y₁</p>
                                <p>⇒ x₁ - 1/3 + 2/3 = 4/3 ⇒ x₁ = 1</p>
                                <p className="font-semibold mt-2">⇒ x = (1, -1, 2)ᵀ</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Verificación */}
                        <div className="bg-green-50 p-4 rounded border border-green-200">
                          <p className="font-semibold text-green-800 mb-2">Verificación:</p>
                          <div className="text-sm space-y-1">
                            <p>3(1) + (-1) + 2 = 4 ✓</p>
                            <p>2(1) + 5(-1) + 2 = -1 ✓</p>
                            <p>-(1) + (-1) + 3(2) = 4 ✓</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">Ejercicios - Método de Crout (LU)</p>
        </div>
      </div>
    </div>
  )
}
