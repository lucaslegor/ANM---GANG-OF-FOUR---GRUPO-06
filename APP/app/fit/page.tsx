"use client"

import { useState } from "react"
import { useAnalysis } from "@/lib/analysis-context"
import { fitLinear, fitQuadratic, fitPower, fitExponential } from "@/lib/regression"
import { SectionTitle } from "@/components/section-title"
import { Card } from "@/components/card"
import { Button } from "@/components/button"
import styles from "./page.module.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Scatter } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function FitPage() {
  const { dataset, selectedModels, toggleModel, fitResults, setFitResults } = useAnalysis()
  const [error, setError] = useState("")

  const handleFit = () => {
    if (dataset.length === 0) {
      setError("Por favor carga un dataset primero")
      return
    }

    const x = dataset.map((d) => d.velocidad)
    const y = dataset.map((d) => d.potencia)
    const results: any[] = []

    try {
      if (selectedModels.has("linear")) {
        const fit = fitLinear(x, y)
        results.push({
          model: "linear",
          params: { a0: fit.a0, a1: fit.a1 },
          r2: fit.r2,
          r2Adj: fit.r2Adj,
          yhat: fit.yhat,
          resid: fit.resid,
          sst: fit.sst,
          sse: fit.sse,
          equation: fit.equation,
        })
      }

      if (selectedModels.has("quadratic")) {
        const fit = fitQuadratic(x, y)
        results.push({
          model: "quadratic",
          params: { a0: fit.a0, a1: fit.a1, a2: fit.a2 },
          r2: fit.r2,
          r2Adj: fit.r2Adj,
          yhat: fit.yhat,
          resid: fit.resid,
          sst: fit.sst,
          sse: fit.sse,
          equation: fit.equation,
        })
      }

      if (selectedModels.has("exponential")) {
        const fit = fitExponential(x, y)
        results.push({
          model: "exponential",
          params: { a: fit.a, b: fit.b },
          r2: fit.r2,
          r2Adj: fit.r2Adj,
          yhat: fit.yhat,
          resid: fit.resid,
          sst: fit.sst,
          sse: fit.sse,
          equation: fit.equation,
        })
      }

      if (selectedModels.has("power")) {
        const fit = fitPower(x, y)
        results.push({
          model: "power",
          params: { a: fit.a, b: fit.b },
          r2: fit.r2,
          r2Adj: fit.r2Adj,
          yhat: fit.yhat,
          resid: fit.resid,
          sst: fit.sst,
          sse: fit.sse,
          equation: fit.equation,
        })
      }

      setFitResults(results)
      setError("")
    } catch (err: any) {
      setError(err.message || "Error al ajustar modelos")
    }
  }

  const handleClear = () => {
    setFitResults([])
    setError("")
  }

  const downloadResults = () => {
    const data = JSON.stringify(fitResults, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "fit-results.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const getModelName = (model: string) => {
    switch (model) {
      case "linear":
        return "Lineal"
      case "quadratic":
        return "Cuadrático"
      case "exponential":
        return "Exponencial"
      case "power":
        return "Potencial"
      default:
        return model
    }
  }

  return (
    <div className={styles.page}>
      <SectionTitle>Ajuste de Modelos</SectionTitle>

      <div className={styles.container}>
        <Card>
          <h3 className={styles.cardTitle}>Seleccionar modelos</h3>

          <div className={styles.checkboxes}>
            <label className={styles.checkbox}>
              <input type="checkbox" checked={selectedModels.has("linear")} onChange={() => toggleModel("linear")} />
              <span>Lineal: $y = a_0 + a_1 x$</span>
            </label>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={selectedModels.has("quadratic")}
                onChange={() => toggleModel("quadratic")}
              />
              <span>Cuadrático: $y = a_0 + a_1 x + a_2 x^2$</span>
            </label>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={selectedModels.has("exponential")}
                onChange={() => toggleModel("exponential")}
              />
              <span>Exponencial: $y = a e^{"{bx}"}$</span>
            </label>

            <label className={styles.checkbox}>
              <input type="checkbox" checked={selectedModels.has("power")} onChange={() => toggleModel("power")} />
              <span>Potencial: $y = a x^b$</span>
            </label>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <Button onClick={handleFit}>Ajustar modelos seleccionados</Button>
            <Button variant="outline" onClick={handleClear}>
              Limpiar
            </Button>
          </div>
        </Card>

        {fitResults.length > 0 && (
          <>
            {fitResults.map((result, i) => {
              const x = dataset.map((d) => d.velocidad)
              const y = dataset.map((d) => d.potencia)

              const sortedIndices = x.map((_, idx) => idx).sort((a, b) => x[a] - x[b])
              const trendData = sortedIndices.map((idx) => ({
                x: x[idx],
                y: result.yhat[idx],
              }))

              const chartData = {
                datasets: [
                  {
                    label: "Datos observados",
                    data: dataset.map((d) => ({ x: d.velocidad, y: d.potencia })),
                    backgroundColor: "rgba(239, 68, 68, 0.6)",
                    borderColor: "rgba(239, 68, 68, 1)",
                    pointRadius: 5,
                    showLine: false,
                  },
                  {
                    label: "Línea de tendencia",
                    data: trendData,
                    backgroundColor: "rgba(59, 130, 246, 0.6)",
                    borderColor: "rgba(59, 130, 246, 1)",
                    pointRadius: 0,
                    showLine: true,
                    borderWidth: 2,
                  },
                ],
              }

              const chartOptions = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top" as const,
                  },
                  title: {
                    display: true,
                    text: `Modelo ${getModelName(result.model)}`,
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Velocidad del Viento (m/s)",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Potencia (kW)",
                    },
                  },
                },
              }

              return (
                <Card key={i}>
                  <h3 className={styles.cardTitle}>Modelo {getModelName(result.model)}</h3>

                  <div style={{ height: "400px", marginBottom: "1.5rem" }}>
                    <Scatter data={chartData} options={chartOptions} />
                  </div>

                  <div className={styles.equation}>
                    <strong>Ecuación:</strong> ${result.equation}$
                  </div>

                  <div className={styles.metrics}>
                    <div className={styles.metric}>
                      <span>R²:</span>
                      <span>{result.r2.toFixed(4)}</span>
                    </div>
                    <div className={styles.metric}>
                      <span>R² ajustado:</span>
                      <span>{result.r2Adj.toFixed(4)}</span>
                    </div>
                  </div>

                  <div className={styles.params}>
                    <strong>Parámetros:</strong>
                    <pre>{JSON.stringify(result.params, null, 2)}</pre>
                  </div>
                </Card>
              )
            })}

            <Card>
              <h3 className={styles.cardTitle}>Exportar resultados</h3>
              <Button variant="outline" onClick={downloadResults}>
                Descargar parámetros (JSON)
              </Button>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
