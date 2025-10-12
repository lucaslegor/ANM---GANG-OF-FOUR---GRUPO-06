"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  linearRegression,
  polynomialRegression,
  exponentialRegression,
  powerRegression,
  type DataPoint,
  type RegressionResult,
} from "@/lib/regression"
import { RegressionChart } from "@/components/regression-chart"
import { RegressionTheory } from "@/components/regression-theory"

export default function FitPage() {
  const router = useRouter()
  const [data, setData] = useState<DataPoint[]>([])
  const [results, setResults] = useState<RegressionResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedData = localStorage.getItem("datasetData")
    const xColumn = localStorage.getItem("xColumn")
    const yColumn = localStorage.getItem("yColumn")

    if (!storedData || !xColumn || !yColumn) {
      router.push("/dataset")
      return
    }

    const parsedData = JSON.parse(storedData)
    const points: DataPoint[] = parsedData.map((row: any) => ({
      x: Number.parseFloat(row[xColumn]),
      y: Number.parseFloat(row[yColumn]),
    }))

    setData(points)

    // Calculate all regressions
    const regressionResults = [
      linearRegression(points),
      polynomialRegression(points),
      exponentialRegression(points),
      powerRegression(points),
    ]

    setResults(regressionResults)

    // Store results for comparison page
    localStorage.setItem("regressionResults", JSON.stringify(regressionResults))

    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Calculando ajustes...</p>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>No hay datos disponibles. Por favor, carga un archivo CSV primero.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Ajuste de Modelos</h1>
        <p className="text-muted-foreground">Análisis de regresión con {data.length} puntos de datos</p>
      </div>

      <div className="space-y-6">
        {results.map((result, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{result.name}</CardTitle>
              <CardDescription>
                {result.equation} | R² = {result.r2.toFixed(4)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chart" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chart">Gráfico</TabsTrigger>
                  <TabsTrigger value="theory">Teoría</TabsTrigger>
                </TabsList>
                <TabsContent value="chart" className="mt-4">
                  <RegressionChart data={data} result={result} />
                </TabsContent>
                <TabsContent value="theory" className="mt-4">
                  <RegressionTheory type={result.type} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
