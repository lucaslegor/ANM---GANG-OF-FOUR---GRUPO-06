"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Trophy, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import type { RegressionResult } from "@/lib/types"
import { InlineMath, BlockMath } from 'react-katex';

interface ModelComparison extends RegressionResult {
  rank: number
}

export default function ComparisonPage() {
  const router = useRouter()
  const [comparisons, setComparisons] = useState<ModelComparison[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedResults = localStorage.getItem("regressionResults")
    const storedData = localStorage.getItem("datasetData")

    if (!storedResults || !storedData) {
      router.push("/dataset")
      return
    }

    const results: RegressionResult[] = JSON.parse(storedResults)
    const data = JSON.parse(storedData)
    const n = data.length

    // Calculate adjusted R² for each model
    const withAdjusted = results.map((result) => {
      // Determina el número de predictores (p) en base al tipo de modelo
      let p = 0
      switch (result.type) {
        case "linear":
          p = 1
          break
        case "polynomial":
          // Un polinomio de segundo grado tiene dos predictores (x y x^2)
          p = 2
          break
        case "exponential":
          // El modelo linealizado tiene un predictor (x)
          p = 1
          break
        case "power":
          // El modelo linealizado tiene un predictor (ln(x))
          p = 1
          break
      }

      const adjustedR2 = result.r2Adj // Simplified to use r2Adj already calculated in regression functions
      return {
        ...result,
        r2Adj: adjustedR2, // Corrección: la variable 'adjustedR2' se asigna correctamente a 'r2Adj'
        rank: 0,
      }
    })

    // Sort by adjusted R² and assign ranks
    withAdjusted.sort((a, b) => b.r2Adj - a.r2Adj)
    withAdjusted.forEach((model, index) => {
      model.rank = index + 1
    })

    setComparisons(withAdjusted)
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Comparando modelos...</p>
        </div>
      </div>
    )
  }

  if (comparisons.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>No hay resultados disponibles. Por favor, realiza el ajuste primero.</AlertDescription>
        </Alert>
      </div>
    )
  }

  const bestModel = comparisons[0]

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Comparación de Modelos</h1>
        <p className="text-muted-foreground">Evaluación basada en el coeficiente de determinación ajustado (R²ₐⱼ)</p>
      </div>

      <Card className="mb-6 border-primary">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            <CardTitle>Mejor Modelo</CardTitle>
          </div>
          <CardDescription>El modelo con el mayor R²ₐⱼ proporciona el mejor ajuste</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">{bestModel.name}</h3>
            <p className="text-lg font-mono text-muted-foreground">{bestModel.equation}</p>
            <div className="flex gap-4 mt-4">
              <div>
                <p className="text-sm text-muted-foreground">R²</p>
                <p className="text-2xl font-bold">{bestModel.r2.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">R²ₐⱼ</p>
                <p className="text-2xl font-bold text-primary">{bestModel.r2Adj.toFixed(4)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Ranking de Modelos</CardTitle>
          <CardDescription>Ordenados por coeficiente de determinación ajustado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {comparisons.map((model) => (
              <div
                key={model.name}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Badge variant={model.rank === 1 ? "default" : "secondary"} className="text-lg px-3 py-1">
                    #{model.rank}
                  </Badge>
                  <div>
                    <h4 className="font-semibold">{model.name}</h4>
                    <p className="text-sm text-muted-foreground font-mono">{model.equation}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">R²ₐⱼ</p>
                  <p className="text-xl font-bold">{model.r2Adj.toFixed(4)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            <CardTitle>¿Por qué R²ₐⱼ?</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            El coeficiente de determinación ajustado (R²ₐⱼ) es superior al R² estándar para comparar modelos porque
            penaliza la adición de parámetros innecesarios.
          </p>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-center font-mono">
              <BlockMath>
                {`R_{adj}^2 = 1 - \\frac{((1 - ${bestModel.r2})(n - 1))}{n - ${bestModel.equation.split("+").length} - 1}`}
              </BlockMath>
              
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Ventajas del R²ₐⱼ:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Penaliza modelos con más parámetros que no mejoran significativamente el ajuste</li>
              <li>Permite comparar modelos con diferente número de variables</li>
              <li>Evita el sobreajuste (overfitting) al preferir modelos más simples</li>
              <li>Proporciona una medida más realista de la capacidad predictiva del modelo</li>
            </ul>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Un modelo con R² más alto no siempre es mejor. El R²ₐⱼ considera la complejidad del modelo para dar una
              evaluación más justa.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
