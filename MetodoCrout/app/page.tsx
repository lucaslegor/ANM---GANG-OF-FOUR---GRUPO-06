"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function CroutMethodHome() {
  const n = 3 // Declare the variable n before using it
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl font-bold text-[#ea1f27] text-balance leading-tight">
            Método de Crout (LU) para sistemas de ecuaciones lineales
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
            Aprende el método exacto de factorización LU para resolver sistemas de ecuaciones lineales de manera
            eficiente y precisa.
          </p>
          <Link href="/ejercicios">
            <Button size="lg" className="bg-[#ea1f27] hover:bg-[#d11a24] text-white px-8 py-3 text-lg">
              Ver Ejercicios
            </Button>
          </Link>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Teoría Section */}
        <section id="teoria" className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-[#26a7df] mb-8">Teoría del Método de Crout</h2>

          {/* Conceptos Previos */}
          <Card className="shadow-lg border-[#26a7df] border-2">
            <CardHeader className="bg-[#26a7df] text-white">
              <CardTitle className="text-2xl">Conceptos Previos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 mt-4">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#ea1f27]">1. Matriz Triangular</h3>
                <p className="text-gray-700 leading-relaxed">
                  Una matriz cuadrada es <strong>triangular superior</strong> si todos los elementos que están debajo de
                  la diagonal principal son 0. De forma análoga, una matriz <strong>triangular inferior</strong>
                  tiene todos los elementos arriba de la diagonal principal iguales a 0.
                </p>

                <div className="bg-[#faec1d]/20 p-4 rounded-lg border border-[#faec1d]">
                  <p className="font-semibold mb-2">Ejemplo de matriz triangular superior 3×3:</p>
                  <div className="font-mono text-center bg-white p-3 rounded border">
                    [2 5 7]
                    <br />
                    [0 5 7]
                    <br />
                    [0 0 7]
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    La diagonal principal es (2, 5, 7). Debajo de la diagonal todos los elementos son 0.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#ea1f27]">2. Matriz Diagonal</h3>
                <p className="text-gray-700 leading-relaxed">
                  Una matriz es <strong>diagonal</strong> si tiene ceros tanto arriba como debajo de la diagonal, es
                  decir, solo la diagonal principal puede tener valores distintos de 0.
                </p>

                <div className="bg-[#26a7df]/20 p-4 rounded-lg border border-[#26a7df]">
                  <p className="font-semibold mb-2">Ejemplo de matriz diagonal 3×3:</p>
                  <div className="font-mono text-center bg-white p-3 rounded border">
                    [3 0 0]
                    <br />
                    [0 -2 0]
                    <br />
                    [0 0 5]
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Solo los elementos de la diagonal principal (3, -2, 5) son distintos de cero.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#ea1f27]">3. Suma y Producto de Matrices Triangulares</h3>
                <div className="space-y-3">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-green-800 font-medium mb-2">✓ Suma de matrices triangulares:</p>
                    <p className="text-green-700 text-sm">
                      Si sumás dos matrices triangulares superiores, el resultado también es triangular superior. Lo
                      mismo vale para matrices triangulares inferiores.
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-blue-800 font-medium mb-2">✓ Producto de matrices triangulares:</p>
                    <p className="text-blue-700 text-sm">
                      El producto U₁ × U₂ de dos matrices triangulares superiores sigue siendo triangular superior. Esta
                      propiedad es fundamental para la factorización LU.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#ea1f27]">4. Inversa de una Matriz Triangular</h3>
                <p className="text-gray-700 leading-relaxed">
                  Si una matriz triangular es invertible (es decir, sus elementos de la diagonal son distintos de 0),
                  entonces su inversa también es triangular de la misma forma (superior o inferior).
                </p>

                <div className="bg-[#ea1f27]/10 p-4 rounded-lg border border-[#ea1f27]">
                  <p className="font-semibold text-[#ea1f27] mb-2">Importancia práctica:</p>
                  <p className="text-gray-700 text-sm">
                    Esto es útil porque resolver sistemas con matrices triangulares es muy rápido (solo requiere
                    sustitución progresiva o regresiva).
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#ea1f27]">5. Determinante de una Matriz Triangular</h3>
                <p className="text-gray-700 leading-relaxed">
                  El determinante de una matriz triangular (sea superior o inferior) es simplemente el{" "}
                  <strong>producto de los elementos de su diagonal principal</strong>.
                </p>

                <div className="bg-[#faec1d]/20 p-4 rounded-lg border border-[#faec1d]">
                  <p className="font-semibold mb-2">Ejemplo:</p>
                  <div className="font-mono text-center bg-white p-3 rounded border mb-2">
                    U = [2 1 3]
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;[0 1 2]
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;[0 0 6]
                  </div>
                  <p className="text-center font-mono text-lg">det(U) = 2 × 1 × 6 = 12</p>
                  <p className="text-sm text-gray-600 mt-2">
                    No hace falta aplicar la regla de Sarrus o de cofactores.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Definición del Método */}
          <Card className="shadow-lg border-[#ea1f27] border-2">
            <CardHeader className="bg-[#ea1f27] text-white">
              <CardTitle className="text-2xl">Definición del Método de Crout</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 mt-4">
              <div className="bg-[#ea1f27]/10 p-4 rounded-lg border border-[#ea1f27]">
                <h4 className="font-semibold text-[#ea1f27] mb-3">¿Qué tipo de método es?</h4>
                <p className="text-gray-700 leading-relaxed">
                  El método de Crout es un <strong>método exacto o directo</strong> que nos sirve para resolver sistemas
                  de ecuaciones lineales y se basa en algoritmos que permiten obtener la solución del sistema a base de
                  un número finito de operaciones aritméticas, es decir, llegar a la solución exacta en un número finito
                  de pasos.
                </p>
                <p className="text-gray-700 leading-relaxed mt-3">
                  Si bien hay varios métodos que son directos como <strong>Cramer</strong> o <strong>Gauss</strong>,
                  Crout se basa en técnicas de <strong>factorización de la matriz</strong>.
                </p>
              </div>

              <div className="bg-[#26a7df]/10 p-6 rounded-lg border border-[#26a7df]">
                <h4 className="font-semibold text-white mb-4 text-lg bg-[#26a7df] px-3 py-1 rounded">
                  Factorización LU
                </h4>
                <div className="text-center space-y-2">
                  <div className="font-mono text-2xl">A = L · U</div>
                  <p className="text-sm text-gray-600">donde diag(U) = 1</p>
                </div>
                <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>L:</strong> Matriz triangular inferior
                    <br />
                    <strong>U:</strong> Matriz triangular superior con diagonal unitaria
                  </div>
                  <div>
                    <strong>A:</strong> Matriz original del sistema
                    <br />
                    <strong>diag(U) = 1:</strong> Todos los elementos de la diagonal de U son 1
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Teorema y Condiciones */}
          <Card className="shadow-lg border-[#faec1d] border-2">
            <CardHeader className="bg-[#faec1d] text-black">
              <CardTitle className="text-2xl">Teorema para Admitir Factorización</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 mt-4">
              <div className="bg-[#faec1d]/20 p-4 rounded-lg border border-[#faec1d]">
                <p className="font-semibold text-lg mb-3">Condición necesaria:</p>
                <p className="text-gray-700">
                  Cualquier matriz cuadrada, con los <strong>menores principales no nulos</strong>, puede expresarse
                  como un producto de dos matrices triangulares L y U. Esta factorización será única si antes nos hemos
                  fijado los elementos diagonales de una de las matrices triangulares.
                </p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-700 mb-2">¿Por qué deben ser no nulos?</h4>
                <p className="text-red-700 text-sm">
                  Si los determinantes de los menores principales son ≠ 0, la matriz A se puede triangularizar sin
                  problemas de división por cero. Entonces se puede construir L y U de manera única.
                </p>
              </div>

              <div className="bg-[#26a7df]/10 p-4 rounded-lg border border-[#26a7df]">
                <h4 className="font-semibold text-[#26a7df] mb-3">Fórmulas para armar la factorización:</h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold mb-2">Para la matriz L (triangular inferior):</p>
                    <div className="font-mono">
                      l<sub>ij</sub> = a<sub>ij</sub> - Σ(l<sub>ik</sub> × u<sub>kj</sub>) para i ≥ j
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold mb-2">Para la matriz U (triangular superior):</p>
                    <div className="font-mono">
                      u<sub>ij</sub> = (a<sub>ij</sub> - Σ(l<sub>ik</sub> × u<sub>kj</sub>)) / l<sub>ii</sub> para i
                      &lt; j
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pasos de Resolución */}
          <Card className="shadow-lg border-[#26a7df] border-2">
            <CardHeader className="bg-[#26a7df] text-white">
              <CardTitle className="text-2xl">Resolución del Sistema de Ecuaciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 mt-4">
              <div className="bg-[#faec1d]/20 p-4 rounded-lg border border-[#faec1d] mb-4">
                <p className="font-semibold text-center mb-2">Una vez obtenida la factorización A = L × U:</p>
                <p className="text-center text-gray-700">El sistema Ax = b se convierte en L × U × x = b</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#ea1f27]/10 p-4 rounded-lg border border-[#ea1f27]">
                  <h4 className="font-semibold text-white bg-[#ea1f27] px-3 py-2 rounded mb-3">
                    Paso 1: Solución Directa Descendente
                  </h4>
                  <div className="font-mono text-center text-lg mb-2">L · y = b</div>
                  <p className="text-sm text-gray-800 mb-3">
                    Resolvemos para encontrar el vector y usando sustitución hacia adelante.
                  </p>
                  <div className="bg-white p-2 rounded text-xs font-mono">
                    y₁ = b₁ / l₁₁
                    <br />
                    y₂ = (b₂ - l₂₁×y₁) / l₂₂
                    <br />
                    y₃ = (b₃ - l₃₁×y₁ - l₃₂×y₂) / l₃₃
                    <br />
                    ...
                  </div>
                </div>

                <div className="bg-[#26a7df]/10 p-4 rounded-lg border border-[#26a7df]">
                  <h4 className="font-semibold text-white bg-[#26a7df] px-3 py-2 rounded mb-3">
                    Paso 2: Solución Directa Ascendente
                  </h4>
                  <div className="font-mono text-center text-lg mb-2">U · x = y</div>
                  <p className="text-sm text-gray-800 mb-3">
                    Resolvemos para encontrar el vector solución x usando sustitución hacia atrás.
                  </p>
                  <div className="bg-white p-2 rounded text-xs font-mono">
                    x<sub>{n}</sub> = y<sub>{n}</sub>
                    <br />x<sub>{n - 1}</sub> = y<sub>{n - 1}</sub> - u
                    <sub>
                      ({n - 1}, {n})
                    </sub>
                    ×y<sub>{n}</sub>
                    <br />x<sub>{n - 2}</sub> = y<sub>{n - 2}</sub> - u
                    <sub>
                      ({n - 2}, {n - 1})
                    </sub>
                    ×y<sub>{n - 1}</sub> - u
                    <sub>
                      ({n - 2}, {n})
                    </sub>
                    ×y<sub>{n}</sub>
                    <br />
                    ...
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Características Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-[#ea1f27] mb-8">Características del Método</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-lg hover:shadow-xl transition-shadow border-[#26a7df] border">
              <CardHeader className="bg-[#26a7df] text-white text-center">
                <CardTitle className="text-lg">Método Exacto</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-gray-700 text-center">
                  Proporciona la solución exacta en un número finito de operaciones aritméticas.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow border-[#ea1f27] border">
              <CardHeader className="bg-[#ea1f27] text-white text-center">
                <CardTitle className="text-lg">Eficiencia</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-gray-700 text-center">
                  Muy eficiente cuando se necesita resolver múltiples sistemas con la misma matriz A.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow border-[#faec1d] border">
              <CardHeader className="bg-[#faec1d] text-black text-center">
                <CardTitle className="text-lg">Claridad</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-gray-700 text-center">
                  Los pasos son claros y sistemáticos, facilitando la comprensión del proceso.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow border-[#26a7df] border">
              <CardHeader className="bg-[#26a7df] text-white text-center">
                <CardTitle className="text-lg">Utilidad Académica</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-gray-700 text-center">
                  Fundamental para entender métodos de factorización en álgebra lineal computacional.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center py-12 bg-gradient-to-r from-[#ea1f27]/10 to-[#26a7df]/10 rounded-lg">
          <h2 className="text-3xl font-bold text-[#ea1f27] mb-4">¿Listo para dominar el Método de Crout?</h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Explora nuestros ejercicios prácticos y pon a prueba tus conocimientos con problemas reales.
          </p>
          <Link href="/ejercicios">
            <Button size="lg" className="bg-[#26a7df] hover:bg-[#2196cd] text-white px-8 py-3 text-lg">
              Ir a Ejercicios
            </Button>
          </Link>
        </section>
      </div>
    </div>
  )
}
