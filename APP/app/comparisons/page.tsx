"use client"

import { useAnalysis } from "@/lib/analysis-context"
import { SectionTitle } from "@/components/section-title"
import { Card } from "@/components/card"
import styles from "./page.module.css"

export default function ComparisonsPage() {
  const { fitResults } = useAnalysis()

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

  if (fitResults.length === 0) {
    return (
      <div className={styles.page}>
        <SectionTitle>Comparación de Modelos</SectionTitle>
        <div className={styles.container}>
          <Card>
            <p className={styles.cardText}>
              No hay modelos ajustados. Por favor, ve a la página de <strong>Ajuste</strong> para ajustar modelos
              primero.
            </p>
          </Card>
        </div>
      </div>
    )
  }

  // Find best model by R²
  const bestModel = fitResults.reduce((best, current) => (current.r2 > best.r2 ? current : best), fitResults[0])

  return (
    <div className={styles.page}>
      <SectionTitle>Comparación de Modelos</SectionTitle>

      <div className={styles.container}>
        <Card>
          <h3 className={styles.cardTitle}>Tabla Comparativa</h3>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Modelo</th>
                  <th>SST</th>
                  <th>SSE</th>
                  <th>R²</th>
                  <th>R² Ajustado</th>
                </tr>
              </thead>
              <tbody>
                {fitResults.map((result, i) => (
                  <tr key={i} className={result.model === bestModel.model ? styles.bestRow : ""}>
                    <td>
                      <strong>{getModelName(result.model)}</strong>
                      {result.model === bestModel.model && <span className={styles.badge}>Mejor ajuste</span>}
                    </td>
                    <td>{result.sst.toFixed(2)}</td>
                    <td>{result.sse.toFixed(2)}</td>
                    <td>{result.r2.toFixed(4)}</td>
                    <td>{result.r2Adj.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h3 className={styles.cardTitle}>Interpretación</h3>
          <div className={styles.interpretation}>
            <p>
              <strong>SST (Suma Total de Cuadrados):</strong> Mide la variabilidad total de los datos observados
              respecto a su media. Es la misma para todos los modelos.
            </p>
            <p>
              <strong>SSE (Suma de Cuadrados del Error):</strong> Mide la variabilidad no explicada por el modelo. Un
              valor menor indica un mejor ajuste.
            </p>
            <p>
              <strong>R² (Coeficiente de Determinación):</strong> Proporción de la variabilidad explicada por el modelo.
              Valores cercanos a 1 indican un mejor ajuste.
            </p>
            <p>
              <strong>R² Ajustado:</strong> Versión ajustada de R² que penaliza la complejidad del modelo. Útil para
              comparar modelos con diferente número de parámetros.
            </p>
          </div>
        </Card>

        <Card>
          <h3 className={styles.cardTitle}>Mejor Modelo</h3>
          <div className={styles.bestModel}>
            <p>
              El modelo con mejor ajuste es: <strong>{getModelName(bestModel.model)}</strong>
            </p>
            <p>
              Ecuación: <span className={styles.equation}>${bestModel.equation}$</span>
            </p>
            <p>
              R² = <strong>{bestModel.r2.toFixed(4)}</strong>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
