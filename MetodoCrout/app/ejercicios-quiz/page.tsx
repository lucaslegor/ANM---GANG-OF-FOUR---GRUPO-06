"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ChevronDown, ChevronRight, CheckCircle, XCircle } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "¿Cuál es la condición necesaria para aplicar el método de Crout?",
    options: [
      "La matriz debe ser simétrica",
      "Todos los menores principales deben ser no nulos",
      "La matriz debe ser diagonal",
      "El determinante debe ser igual a 1",
    ],
    correct: 1,
    explanation:
      "Para aplicar el método de Crout, todos los menores principales de la matriz A deben ser no nulos (≠ 0). Esto garantiza que la factorización LU existe y es única.",
  },
  {
    id: 2,
    question: "En el método de Crout, ¿qué valores tienen los elementos de la diagonal principal de la matriz U?",
    options: ["Todos son 0", "Todos son 1", "Son iguales a los de la matriz A", "Depende de cada caso específico"],
    correct: 1,
    explanation:
      "En el método de Crout, por convención, todos los elementos de la diagonal principal de la matriz U son iguales a 1. Esto diferencia al método de Crout del método de Doolittle.",
  },
  {
    id: 3,
    question: "¿Cómo se calcula el determinante de A usando la factorización LU?",
    options: [
      "det(A) = det(L) + det(U)",
      "det(A) = det(L) × det(U)",
      "det(A) = det(L) - det(U)",
      "det(A) = det(L) / det(U)",
    ],
    correct: 1,
    explanation:
      "El determinante de A es igual al producto de los determinantes de L y U: det(A) = det(L) × det(U). Como U tiene 1's en la diagonal, det(U) = 1, entonces det(A) = det(L) = producto de la diagonal de L.",
  },
  {
    id: 4,
    question: "¿Cuál es el primer paso para resolver Ax = b usando factorización LU?",
    options: [
      "Resolver U·x = b directamente",
      "Calcular la inversa de A",
      "Resolver L·y = b (sustitución hacia adelante)",
      "Calcular el determinante de A",
    ],
    correct: 2,
    explanation:
      "El primer paso es resolver L·y = b usando sustitución hacia adelante para encontrar el vector y. Luego se resuelve U·x = y usando sustitución hacia atrás.",
  },
  {
    id: 5,
    question: "¿Qué tipo de método es el método de Crout?",
    options: ["Método iterativo", "Método aproximado", "Método directo o exacto", "Método gráfico"],
    correct: 2,
    explanation:
      "El método de Crout es un método directo o exacto porque permite obtener la solución del sistema en un número finito de operaciones aritméticas, llegando a la solución exacta (sin considerar errores de redondeo).",
  },
]

export default function EjerciciosQuizPage() {
  const [showTarea, setShowTarea] = useState(false)
  const [showEjercicio1, setShowEjercicio1] = useState(false)
  const [showEjercicio2, setShowEjercicio2] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({})
  const [quizSubmitted, setQuizSubmitted] = useState<{ [key: number]: boolean }>({})
  const [quizScore, setQuizScore] = useState<number | null>(null)

  const handleQuizAnswer = (questionId: number, answerIndex: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const submitQuizAnswer = (questionId: number) => {
    setQuizSubmitted((prev) => ({
      ...prev,
      [questionId]: true,
    }))
  }

  const calculateQuizScore = () => {
    let correct = 0
    quizQuestions.forEach((q) => {
      if (quizAnswers[q.id] === q.correct) {
        correct++
      }
    })
    setQuizScore(Math.round((correct / quizQuestions.length) * 100))
  }

  const resetQuiz = () => {
    setQuizAnswers({})
    setQuizSubmitted({})
    setQuizScore(null)
  }

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
          <h1 className="text-4xl font-bold text-[#ea1f27] text-balance">Ejercicios y Quiz – Método de Crout</h1>
        </div>

        {/* Tarea Section - Moved from ejercicios page */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-[#faec1d] mb-8">Tarea para Resolver</h2>

          <Card className="shadow-lg border-[#faec1d] border-2">
            <CardHeader className="bg-[#faec1d] text-black">
              <CardTitle className="text-2xl">Ejercicio Propuesto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 mt-4">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#ea1f27]">Enunciado:</h3>
                <div className="bg-[#faec1d]/20 p-4 rounded-lg border border-[#faec1d]">
                  <div className="space-y-4">
                    <p className="font-semibold mb-2 dark:text-gray-100">
                      Resolver el siguiente sistema de ecuaciones lineales utilizando el método de Crout:
                    </p>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded border font-mono text-center space-y-2">
                      <div>2x + y + z = 5</div>
                      <div>4x + 3y + 2z = 15</div>
                      <div>6x + 5y + 4z = 25</div>
                    </div>
                    <div className="text-center">
                      <div className="font-mono text-lg mb-2">
                        A = [2 1 1]
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;[4 3 2]
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;[6 5 4]
                      </div>
                      <div className="font-mono text-lg">b = [5, 15, 25]ᵀ</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                      <p className="font-semibold mb-2">Tareas a realizar:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Verificar que se puede aplicar el método de Crout (determinantes principales no nulos)</li>
                        <li>Factorizar A = L·U usando el método de Crout</li>
                        <li>Calcular det(A)</li>
                        <li>Resolver el sistema Ax = b</li>
                        <li>Verificar la solución</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[#26a7df]/10 p-4 rounded-lg border border-[#26a7df]">
                  <h4 className="font-semibold text-[#26a7df] mb-3">💡 Sugerencia:</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Intenta resolver este ejercicio paso a paso siguiendo la metodología vista en los ejercicios
                    anteriores. Recuerda verificar primero los determinantes principales antes de proceder con la
                    factorización.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => (window.location.href = "/calculadora")}
                      className="bg-[#ea1f27] hover:bg-[#ea1f27]/90 text-white flex-1"
                    >
                      🧮 Verificar con la Calculadora
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => (window.location.href = "/")}
                      className="border-[#26a7df] text-[#26a7df] hover:bg-[#26a7df] hover:text-white flex-1"
                    >
                      📚 Revisar Teoría
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Additional Exercises Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-[#26a7df] mb-8">Ejercicios Adicionales</h2>

          {/* Exercise 1 - With detailed solution */}
          <Card className="shadow-lg border-[#26a7df] border-2">
            <CardHeader className="bg-[#26a7df] text-white">
              <CardTitle className="text-2xl">Ejercicio 1 - Sistema 2×2</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 mt-4">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#ea1f27]">Enunciado:</h3>
                <div className="bg-[#26a7df]/10 p-4 rounded-lg border border-[#26a7df]">
                  <div className="space-y-4">
                    <p className="font-semibold mb-2 dark:text-gray-100">Resolver usando el método de Crout:</p>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded border font-mono text-center space-y-2">
                      <div>2x + 3y = 8</div>
                      <div>4x + 7y = 18</div>
                    </div>
                  </div>
                </div>

                <Collapsible open={showEjercicio1} onOpenChange={setShowEjercicio1}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full border-[#26a7df] text-[#26a7df] hover:bg-[#26a7df] hover:text-white flex items-center justify-center gap-2 bg-transparent"
                    >
                      {showEjercicio1 ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      {showEjercicio1 ? "Ocultar solución" : "Ver solución paso a paso"}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 mt-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-300">
                      <h4 className="font-semibold mb-4 text-[#26a7df] text-lg">Solución Detallada:</h4>

                      <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-700 p-4 rounded border">
                          <p className="font-semibold mb-2">1) Verificación de menores principales:</p>
                          <div className="text-sm font-mono space-y-1">
                            <p>Δ₁ = 2 ≠ 0 ✓</p>
                            <p>Δ₂ = det(A) = 2×7 - 3×4 = 14 - 12 = 2 ≠ 0 ✓</p>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-700 p-4 rounded border">
                          <p className="font-semibold mb-2">2) Factorización L·U:</p>
                          <div className="text-sm font-mono space-y-2">
                            <p>L = [2 0] &nbsp;&nbsp; U = [1 3/2]</p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;[4 2] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[0 1 ]</p>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-700 p-4 rounded border">
                          <p className="font-semibold mb-2">3) Resolución:</p>
                          <div className="text-sm font-mono space-y-1">
                            <p>L·y = b: y₁ = 4, y₂ = 2</p>
                            <p>U·x = y: x₁ = 1, x₂ = 2</p>
                            <p className="font-bold text-green-600">Solución: x = (1, 2)ᵀ</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <div className="bg-[#26a7df]/10 p-4 rounded-lg border border-[#26a7df]">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => (window.location.href = "/calculadora")}
                      className="bg-[#ea1f27] hover:bg-[#ea1f27]/90 text-white flex-1"
                    >
                      🧮 Verificar con la Calculadora
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exercise 2 - Without solution */}
          <Card className="shadow-lg border-[#ea1f27] border-2">
            <CardHeader className="bg-[#ea1f27] text-white">
              <CardTitle className="text-2xl">Ejercicio 2 - Sistema 3×3 (Sin Solución)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 mt-4">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#26a7df]">Enunciado:</h3>
                <div className="bg-[#ea1f27]/10 p-4 rounded-lg border border-[#ea1f27]">
                  <div className="space-y-4">
                    <p className="font-semibold mb-2 dark:text-gray-100">Resolver usando el método de Crout:</p>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded border font-mono text-center space-y-2">
                      <div>x + 2y + z = 6</div>
                      <div>2x + y + 3z = 11</div>
                      <div>3x + 4y + 2z = 16</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                      <p className="font-semibold mb-2">Tareas:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Verificar condiciones para aplicar Crout</li>
                        <li>Realizar la factorización LU</li>
                        <li>Resolver el sistema completo</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[#faec1d]/20 p-4 rounded-lg border border-[#faec1d]">
                  <h4 className="font-semibold text-[#ea1f27] mb-3">🎯 Desafío:</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Este ejercicio no incluye la solución. Resuélvelo paso a paso y luego verifica tu resultado usando
                    la calculadora interactiva.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => (window.location.href = "/calculadora")}
                      className="bg-[#ea1f27] hover:bg-[#ea1f27]/90 text-white flex-1"
                    >
                      🧮 Verificar con la Calculadora
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => (window.location.href = "/ejercicios")}
                      className="border-[#26a7df] text-[#26a7df] hover:bg-[#26a7df] hover:text-white flex-1"
                    >
                      📖 Ver Ejercicios Resueltos
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quiz Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-[#ea1f27] mb-8">Quiz Interactivo</h2>

          <Card className="shadow-lg border-[#ea1f27] border-2">
            <CardHeader className="bg-[#ea1f27] text-white">
              <CardTitle className="text-2xl">Evaluación de Conocimientos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 mt-4">
              <div className="bg-[#ea1f27]/10 p-4 rounded-lg border border-[#ea1f27]">
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Responde las siguientes preguntas sobre el método de Crout. Recibirás retroalimentación inmediata para
                  cada respuesta.
                </p>
                {quizScore !== null && (
                  <Alert className="mb-4 border-green-500 bg-green-50 dark:bg-green-900/20">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription className="text-green-700 dark:text-green-300 font-medium">
                      Puntuación final: {quizScore}% ({Object.values(quizSubmitted).filter(Boolean).length}/
                      {quizQuestions.length} preguntas respondidas)
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-6">
                {quizQuestions.map((question) => (
                  <Card key={question.id} className="border border-gray-200 dark:border-gray-700">
                    <CardHeader className="bg-gray-50 dark:bg-gray-800">
                      <CardTitle className="text-lg">Pregunta {question.id}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="font-medium mb-4 dark:text-gray-100">{question.question}</p>

                      <div className="space-y-2 mb-4">
                        {question.options.map((option, index) => (
                          <label key={index} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={index}
                              checked={quizAnswers[question.id] === index}
                              onChange={() => handleQuizAnswer(question.id, index)}
                              disabled={quizSubmitted[question.id]}
                              className="text-[#ea1f27] focus:ring-[#ea1f27]"
                            />
                            <span
                              className={`${quizSubmitted[question.id] && index === question.correct ? "text-green-600 font-semibold" : ""} ${quizSubmitted[question.id] && quizAnswers[question.id] === index && index !== question.correct ? "text-red-600" : ""}`}
                            >
                              {option}
                            </span>
                            {quizSubmitted[question.id] && index === question.correct && (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            )}
                            {quizSubmitted[question.id] &&
                              quizAnswers[question.id] === index &&
                              index !== question.correct && <XCircle className="w-4 h-4 text-red-600" />}
                          </label>
                        ))}
                      </div>

                      {!quizSubmitted[question.id] ? (
                        <Button
                          onClick={() => submitQuizAnswer(question.id)}
                          disabled={quizAnswers[question.id] === undefined}
                          className="bg-[#26a7df] hover:bg-[#26a7df]/90 text-white"
                        >
                          Confirmar Respuesta
                        </Button>
                      ) : (
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border">
                          <p className="font-semibold mb-2 text-[#26a7df]">Explicación:</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{question.explanation}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={calculateQuizScore}
                  disabled={Object.keys(quizSubmitted).length !== quizQuestions.length}
                  className="bg-[#ea1f27] hover:bg-[#ea1f27]/90 text-white flex-1"
                >
                  📊 Calcular Puntuación Final
                </Button>
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                  className="border-[#26a7df] text-[#26a7df] hover:bg-[#26a7df] hover:text-white flex-1 bg-transparent"
                >
                  🔄 Reiniciar Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">Ejercicios y Quiz - Método de Crout (LU)</p>
        </div>
      </div>
    </div>
  )
}
