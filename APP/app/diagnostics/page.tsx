"use client"

import { useAnalysis } from "@/lib/analysis-context"
import { SectionTitle } from "@/components/section-title"
import { Card } from "@/components/card"
import styles from "./page.module.css"

export default function DiagnosticsPage() {
  const { dataset, fitResults } = useAnalysis()

  if (fitResults.length === 0) {
    return (
      <div className={styles.page}>
        <SectionTitle>Diagnóstico de Residuos</SectionTitle>
        <div className={styles.container}>
          <Card>
            <p className={styles.empty}>
              No hay modelos ajustados. Por favor ajusta un modelo primero en la página de Ajuste.
            </p>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <SectionTitle>Diagnóstico de Residuos</SectionTitle>

      <div className={styles.container}>
        {fitResults.map((result, i) => {
          const x = dataset.map((d) => d.velocidad)
          const residStats = {
            mean: result.resid.reduce((a, b) => a + b, 0) / result.resid.length,
            min: Math.min(...result.resid),
            max: Math.max(...result.resid),
            std: Math.sqrt(
              result.resid.reduce((sum, r) => {
                const mean = result.resid.reduce((a, b) => a + b, 0) / result.resid.length
                return sum + (r - mean) ** 2
              }, 0) / result.resid.length,
            ),
          }

          return (
            <Card key={i}>
              <h3 className={styles.cardTitle}>
                Modelo{" "}
                {result.model === "linear" ? "Lineal" : result.model === "quadratic" ? "Cuadrático" : "Potencial"}
              </h3>

              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span>Media de residuos:</span>
                  <span>{residStats.mean.toFixed(4)}</span>
                </div>
                <div className={styles.stat}>
                  <span>Desviación estándar:</span>
                  <span>{residStats.std.toFixed(4)}</span>
                </div>
                <div className={styles.stat}>
                  <span>Rango:</span>
                  <span>
                    [{residStats.min.toFixed(2)}, {residStats.max.toFixed(2)}]
                  </span>
                </div>
              </div>

              <div className={styles.interpretation}>
                <h4>Interpretación:</h4>
                <ul>
                  <li>
                    {Math.abs(residStats.mean) < 0.01
                      ? "✓ La media de residuos es cercana a cero (buen ajuste)"
                      : "⚠ La media de residuos no es cercana a cero"}
                  </li>
                  <li>
                    {result.r2 > 0.9
                      ? "✓ R² alto indica buen ajuste del modelo"
                      : result.r2 > 0.7
                        ? "○ R² moderado, considerar otros modelos"
                        : "⚠ R² bajo, el modelo no ajusta bien"}
                  </li>
                </ul>
              </div>
            </Card>
          )
        })}

        <Card>
          <h3 className={styles.cardTitle}>Supuestos del modelo</h3>
          <ul className={styles.assumptions}>
            <li>
              <strong>Linealidad:</strong> La relación entre variables debe ser lineal (o transformable a lineal)
            </li>
            <li>
              <strong>Homocedasticidad:</strong> La varianza de los residuos debe ser constante
            </li>
            <li>
              <strong>Independencia:</strong> Los residuos no deben estar correlacionados
            </li>
            <li>
              <strong>Normalidad:</strong> Los residuos deben seguir una distribución normal
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
