"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download } from "lucide-react"

interface Matrix {
  [key: number]: { [key: number]: number }
}

interface Vector {
  [key: number]: number
}

export default function CalculadoraPage() {
  const [n, setN] = useState<number>(3)
  const [matrixA, setMatrixA] = useState<Matrix>({})
  const [vectorB, setVectorB] = useState<Vector>({})
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string>("")
  const [isCalculating, setIsCalculating] = useState<boolean>(false)

  // Initialize matrix and vector when n changes
  useEffect(() => {
    const newMatrix: Matrix = {}
    const newVector: Vector = {}

    for (let i = 0; i < n; i++) {
      newMatrix[i] = {}
      for (let j = 0; j < n; j++) {
        newMatrix[i][j] = matrixA[i]?.[j] || 0
      }
      newVector[i] = vectorB[i] || 0
    }

    setMatrixA(newMatrix)
    setVectorB(newVector)
  }, [n])

  const updateMatrixValue = (i: number, j: number, value: string) => {
    const numValue = Number.parseFloat(value) || 0
    setMatrixA((prev) => ({
      ...prev,
      [i]: { ...prev[i], [j]: numValue },
    }))
  }

  const updateVectorValue = (i: number, value: string) => {
    const numValue = Number.parseFloat(value) || 0
    setVectorB((prev) => ({ ...prev, [i]: numValue }))
  }

  // Calculate determinant of a submatrix
  const calculateDeterminant = (matrix: Matrix, size: number): number => {
    if (size === 1) return matrix[0][0]
    if (size === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]

    let det = 0
    for (let j = 0; j < size; j++) {
      const subMatrix: Matrix = {}
      for (let i = 1; i < size; i++) {
        subMatrix[i - 1] = {}
        let colIndex = 0
        for (let k = 0; k < size; k++) {
          if (k !== j) {
            subMatrix[i - 1][colIndex] = matrix[i][k]
            colIndex++
          }
        }
      }
      det += Math.pow(-1, j) * matrix[0][j] * calculateDeterminant(subMatrix, size - 1)
    }
    return det
  }

  // Validate leading principal minors
  const validateMinors = (): { valid: boolean; minors: number[] } => {
    const minors: number[] = []

    for (let k = 1; k <= n; k++) {
      const subMatrix: Matrix = {}
      for (let i = 0; i < k; i++) {
        subMatrix[i] = {}
        for (let j = 0; j < k; j++) {
          subMatrix[i][j] = matrixA[i][j]
        }
      }
      const minor = calculateDeterminant(subMatrix, k)
      minors.push(minor)

      if (Math.abs(minor) < 1e-10) {
        return { valid: false, minors }
      }
    }

    return { valid: true, minors }
  }

  // Perform Crout factorization
  const croutFactorization = (): { L: Matrix; U: Matrix } => {
    const L: Matrix = {}
    const U: Matrix = {}

    // Initialize matrices
    for (let i = 0; i < n; i++) {
      L[i] = {}
      U[i] = {}
      for (let j = 0; j < n; j++) {
        L[i][j] = 0
        U[i][j] = i === j ? 1 : 0
      }
    }

    // Crout algorithm
    for (let i = 0; i < n; i++) {
      // Calculate L[i][j] for j <= i
      for (let j = 0; j <= i; j++) {
        let sum = 0
        for (let k = 0; k < j; k++) {
          sum += L[i][k] * U[k][j]
        }
        L[i][j] = matrixA[i][j] - sum
      }

      // Calculate U[i][j] for j > i
      for (let j = i + 1; j < n; j++) {
        let sum = 0
        for (let k = 0; k < i; k++) {
          sum += L[i][k] * U[k][j]
        }
        U[i][j] = (matrixA[i][j] - sum) / L[i][i]
      }
    }

    return { L, U }
  }

  // Forward substitution (L * y = b)
  const forwardSubstitution = (L: Matrix, b: Vector): { y: Vector; steps: string[] } => {
    const y: Vector = {}
    const steps: string[] = []

    for (let i = 0; i < n; i++) {
      let sum = 0
      let equation = `y_{${i + 1}} = \\frac{1}{${L[i][i].toFixed(3)}} \\left( ${b[i].toFixed(3)}`

      for (let j = 0; j < i; j++) {
        sum += L[i][j] * y[j]
        equation += ` - ${L[i][j].toFixed(3)} \\cdot ${y[j].toFixed(3)}`
      }

      y[i] = (b[i] - sum) / L[i][i]
      equation += ` \\right) = ${y[i].toFixed(3)}`
      steps.push(equation)
    }

    return { y, steps }
  }

  // Backward substitution (U * x = y)
  const backwardSubstitution = (U: Matrix, y: Vector): { x: Vector; steps: string[] } => {
    const x: Vector = {}
    const steps: string[] = []

    for (let i = n - 1; i >= 0; i--) {
      let sum = 0
      let equation = `x_{${i + 1}} = ${y[i].toFixed(3)}`

      for (let j = i + 1; j < n; j++) {
        sum += U[i][j] * x[j]
        equation += ` - ${U[i][j].toFixed(3)} \\cdot ${x[j].toFixed(3)}`
      }

      x[i] = y[i] - sum
      equation += ` = ${x[i].toFixed(3)}`
      steps.push(equation)
    }

    return { x, steps: steps.reverse() }
  }

  const calculateSystem = () => {
    setIsCalculating(true)
    setError("")
    setResults(null)

    try {
      // Validate minors
      const { valid, minors } = validateMinors()

      if (!valid) {
        setError("No se puede aplicar el método de Crout porque uno de los menores principales es 0.")
        setIsCalculating(false)
        return
      }

      // Perform factorization
      const { L, U } = croutFactorization()

      // Forward substitution
      const { y, steps: forwardSteps } = forwardSubstitution(L, vectorB)

      // Backward substitution
      const { x, steps: backwardSteps } = backwardSubstitution(U, y)

      // Calculate determinant (product of L diagonal)
      let determinant = 1
      for (let i = 0; i < n; i++) {
        determinant *= L[i][i]
      }

      setResults({
        minors,
        L,
        U,
        y,
        x,
        forwardSteps,
        backwardSteps,
        determinant,
      })
    } catch (err) {
      setError("Error en el cálculo. Verifique los datos ingresados.")
    }

    setIsCalculating(false)
  }

  const formatMatrix = (matrix: Matrix, size: number, name: string) => {
    let latex = `${name} = \\begin{pmatrix}`
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        latex += matrix[i][j].toFixed(3)
        if (j < size - 1) latex += " & "
      }
      if (i < size - 1) latex += " \\\\ "
    }
    latex += "\\end{pmatrix}"
    return latex
  }

  const formatVector = (vector: Vector, size: number, name: string) => {
    let latex = `${name} = \\begin{pmatrix}`
    for (let i = 0; i < size; i++) {
      latex += vector[i].toFixed(3)
      if (i < size - 1) latex += " \\\\ "
    }
    latex += "\\end{pmatrix}"
    return latex
  }

  const downloadResults = (format: "pdf" | "excel") => {
    if (!results) return

    if (format === "excel") {
      // Create CSV content for Excel compatibility
      let csvContent = "Método de Crout - Resultados\n\n"

      // Add matrices
      csvContent += "Matriz L (triangular inferior):\n"
      for (let i = 0; i < n; i++) {
        let row = ""
        for (let j = 0; j < n; j++) {
          row += results.L[i][j].toFixed(6) + ","
        }
        csvContent += row.slice(0, -1) + "\n"
      }

      csvContent += "\nMatriz U (triangular superior):\n"
      for (let i = 0; i < n; i++) {
        let row = ""
        for (let j = 0; j < n; j++) {
          row += results.U[i][j].toFixed(6) + ","
        }
        csvContent += row.slice(0, -1) + "\n"
      }

      csvContent += "\nVector y:\n"
      for (let i = 0; i < n; i++) {
        csvContent += `y${i + 1},${results.y[i].toFixed(6)}\n`
      }

      csvContent += "\nSolución x:\n"
      for (let i = 0; i < n; i++) {
        csvContent += `x${i + 1},${results.x[i].toFixed(6)}\n`
      }

      csvContent += `\nDeterminante,${results.determinant.toFixed(6)}\n`

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "crout_resultados.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else if (format === "pdf") {
      // Create text content for PDF
      let textContent = "MÉTODO DE CROUT - RESULTADOS\n"
      textContent += "================================\n\n"

      textContent += "MATRIZ L (triangular inferior):\n"
      for (let i = 0; i < n; i++) {
        let row = "["
        for (let j = 0; j < n; j++) {
          row += results.L[i][j].toFixed(3).padStart(8)
        }
        row += " ]\n"
        textContent += row
      }

      textContent += "\nMATRIZ U (triangular superior):\n"
      for (let i = 0; i < n; i++) {
        let row = "["
        for (let j = 0; j < n; j++) {
          row += results.U[i][j].toFixed(3).padStart(8)
        }
        row += " ]\n"
        textContent += row
      }

      textContent += "\nVECTOR Y:\n"
      for (let i = 0; i < n; i++) {
        textContent += `y${i + 1} = ${results.y[i].toFixed(6)}\n`
      }

      textContent += "\nSOLUCIÓN X:\n"
      for (let i = 0; i < n; i++) {
        textContent += `x${i + 1} = ${results.x[i].toFixed(6)}\n`
      }

      textContent += `\nDETERMINANTE: ${results.determinant.toFixed(6)}\n`

      const blob = new Blob([textContent], { type: "text/plain;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "crout_resultados.txt")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#ea1f27] mb-4">Calculadora del Método de Crout</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Resuelve sistemas de ecuaciones lineales usando factorización LU
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="border-2 border-[#26a7df]">
            <CardHeader className="bg-[#26a7df] text-white">
              <CardTitle>Datos de Entrada</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6">
                <Label htmlFor="size" className="text-lg font-medium">
                  Tamaño del sistema (n):
                </Label>
                <select
                  id="size"
                  value={n}
                  onChange={(e) => setN(Number.parseInt(e.target.value))}
                  className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#26a7df] focus:border-transparent"
                >
                  <option value={2}>2x2</option>
                  <option value={3}>3x3</option>
                  <option value={4}>4x4</option>
                  <option value={5}>5x5</option>
                </select>
              </div>

              <div className="mb-6">
                <Label className="text-lg font-medium mb-3 block">
                  Matriz A ({n}×{n}):
                </Label>
                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
                  {Array.from({ length: n }, (_, i) =>
                    Array.from({ length: n }, (_, j) => (
                      <Input
                        key={`${i}-${j}`}
                        type="number"
                        step="any"
                        value={matrixA[i]?.[j] || 0}
                        onChange={(e) => updateMatrixValue(i, j, e.target.value)}
                        className="text-center"
                        placeholder={`a${i + 1}${j + 1}`}
                      />
                    )),
                  ).flat()}
                </div>
              </div>

              <div className="mb-6">
                <Label className="text-lg font-medium mb-3 block">Vector b ({n}×1):</Label>
                <div className="grid gap-2" style={{ gridTemplateColumns: "1fr" }}>
                  {Array.from({ length: n }, (_, i) => (
                    <Input
                      key={i}
                      type="number"
                      step="any"
                      value={vectorB[i] || 0}
                      onChange={(e) => updateVectorValue(i, e.target.value)}
                      className="text-center"
                      placeholder={`b${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              <Button
                onClick={calculateSystem}
                disabled={isCalculating}
                className="w-full bg-[#ea1f27] hover:bg-red-700 text-white py-3 text-lg font-medium"
              >
                {isCalculating ? "Calculando..." : "Resolver Sistema"}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="border-2 border-[#faec1d]">
            <CardHeader className="bg-[#faec1d] text-black">
              <CardTitle>Resultados</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {error && (
                <Alert className="mb-6 border-red-500 bg-red-50">
                  <AlertDescription className="text-red-700 font-medium">{error}</AlertDescription>
                </Alert>
              )}

              {results && (
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="determinants" className="border border-gray-200 rounded-lg">
                    <AccordionTrigger className="px-4 py-3 bg-gray-50 rounded-t-lg hover:bg-gray-100">
                      <span className="font-medium">Determinantes</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-3">
                      <div className="space-y-2">
                        {results.minors.map((minor: number, index: number) => (
                          <div key={index} className="text-sm">
                            <span className="font-mono">
                              Δ_{index + 1} = {minor.toFixed(6)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="matrices" className="border border-gray-200 rounded-lg">
                    <AccordionTrigger className="px-4 py-3 bg-gray-50 rounded-t-lg hover:bg-gray-100">
                      <span className="font-medium">Matrices L y U</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-3">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Matriz L (triangular inferior):</h4>
                          <div className="bg-gray-50 p-3 rounded font-mono text-sm overflow-x-auto">
                            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
                              {Array.from({ length: n }, (_, i) =>
                                Array.from({ length: n }, (_, j) => (
                                  <span key={`${i}-${j}`} className="text-center p-1">
                                    {results.L[i][j].toFixed(3)}
                                  </span>
                                )),
                              ).flat()}
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Matriz U (triangular superior):</h4>
                          <div className="bg-gray-50 p-3 rounded font-mono text-sm overflow-x-auto">
                            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
                              {Array.from({ length: n }, (_, i) =>
                                Array.from({ length: n }, (_, j) => (
                                  <span key={`${i}-${j}`} className="text-center p-1">
                                    {results.U[i][j].toFixed(3)}
                                  </span>
                                )),
                              ).flat()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="forward" className="border border-gray-200 rounded-lg">
                    <AccordionTrigger className="px-4 py-3 bg-gray-50 rounded-t-lg hover:bg-gray-100">
                      <span className="font-medium">Sustitución hacia adelante (y)</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-3">
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Resolviendo L·y = b:</p>
                        {results.forwardSteps.map((step: string, index: number) => (
                          <div key={index} className="bg-gray-50 p-2 rounded font-mono text-sm">
                            {step}
                          </div>
                        ))}
                        <div className="mt-4 p-3 bg-blue-50 rounded">
                          <h4 className="font-medium mb-2">Vector y:</h4>
                          <div className="font-mono text-sm">
                            {Array.from({ length: n }, (_, i) => (
                              <div key={i}>
                                y_{i + 1} = {results.y[i].toFixed(6)}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="backward" className="border border-gray-200 rounded-lg">
                    <AccordionTrigger className="px-4 py-3 bg-gray-50 rounded-t-lg hover:bg-gray-100">
                      <span className="font-medium">Sustitución hacia atrás (x)</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-3">
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Resolviendo U·x = y:</p>
                        {results.backwardSteps.map((step: string, index: number) => (
                          <div key={index} className="bg-gray-50 p-2 rounded font-mono text-sm">
                            {step}
                          </div>
                        ))}
                        <div className="mt-4 p-3 bg-green-50 rounded">
                          <h4 className="font-medium mb-2">Solución final (x):</h4>
                          <div className="font-mono text-sm">
                            {Array.from({ length: n }, (_, i) => (
                              <div key={i} className="font-bold">
                                x_{i + 1} = {results.x[i].toFixed(6)}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="determinant" className="border border-gray-200 rounded-lg">
                    <AccordionTrigger className="px-4 py-3 bg-gray-50 rounded-t-lg hover:bg-gray-100">
                      <span className="font-medium">Determinante final</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-3">
                      <div className="bg-yellow-50 p-4 rounded">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          El determinante de A es el producto de la diagonal de L:
                        </p>
                        <div className="font-mono text-lg font-bold">det(A) = {results.determinant.toFixed(6)}</div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}

              {results && (
                <div className="mt-6 p-4 bg-[#26a7df]/10 rounded-lg border border-[#26a7df]">
                  <h4 className="font-semibold text-[#26a7df] mb-3 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Descargar Resultados
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Exporta los resultados completos (matrices L y U, vectores y y x, determinante) en diferentes
                    formatos.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => downloadResults("excel")}
                      variant="outline"
                      className="border-[#26a7df] text-[#26a7df] hover:bg-[#26a7df] hover:text-white flex-1"
                    >
                      📊 Descargar Excel (CSV)
                    </Button>
                    <Button
                      onClick={() => downloadResults("pdf")}
                      variant="outline"
                      className="border-[#ea1f27] text-[#ea1f27] hover:bg-[#ea1f27] hover:text-white flex-1"
                    >
                      📄 Descargar Texto
                    </Button>
                  </div>
                </div>
              )}

              {!results && !error && (
                <div className="text-center text-gray-500 py-8">
                  <p>Ingrese los datos y presione "Resolver Sistema" para ver los resultados.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
