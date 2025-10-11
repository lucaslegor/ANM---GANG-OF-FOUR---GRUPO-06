"use client"
import { useEffect, useState } from "react"
import { useAnalysis } from "@/lib/analysis-context"
import { SectionTitle } from "@/components/section-title"
import { Card } from "@/components/card"
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
import styles from "./page.module.css"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

type Row = { velocidad: number; potencia: number }

export default function DatasetClient({ initialDataset }: { initialDataset: Row[] }) {
  const { dataset, setDataset } = useAnalysis()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (initialDataset && initialDataset.length > 0) {
      setDataset(initialDataset)
      setError("")
    } else {
      setError("No se encontraron datos válidos en el CSV")
    }
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialDataset])

  const current = dataset ? dataset : initialDataset

  const stats =
    current.length > 0
      ? {
          n: current.length,
          velocidadMin: Math.min(...current.map((d) => d.velocidad)),
          velocidadMax: Math.max(...current.map((d) => d.velocidad)),
          velocidadMean: current.reduce((s, d) => s + d.velocidad, 0) / current.length,
          potenciaMin: Math.min(...current.map((d) => d.potencia)),
          potenciaMax: Math.max(...current.map((d) => d.potencia)),
          potenciaMean: current.reduce((s, d) => s + d.potencia, 0) / current.length,
        }
      : null

  const scatterData = {
    datasets: [
      {
        label: "Datos observados",
        data: current.map((d) => ({ x: d.velocidad, y: d.potencia })),
        backgroundColor: "rgba(239, 68, 68, 0.6)",
        borderColor: "rgba(239, 68, 68, 1)",
        pointRadius: 5,
      },
    ],
  }

  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Velocidad del Viento vs Potencia" },
    },
    scales: {
      x: { title: { display: true, text: "Velocidad del Viento (m/s)" } },
      y: { title: { display: true, text: "Potencia (kW)" } },
    },
  }

  if (loading) {
    return (
      <div className={styles.page}>
        <SectionTitle>Dataset</SectionTitle>
        <div className={styles.container}>
          <Card>
            <p className={styles.cardText}>Cargando datos...</p>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <SectionTitle>Dataset</SectionTitle>
      <div className={styles.container}>
        {error && (
          <Card>
            <p className={styles.error}>{error}</p>
          </Card>
        )}

        {stats && (
          <>
            <Card>
              <h3 className={styles.cardTitle}>Estadísticas básicas</h3>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Observaciones:</span>
                  <span className={styles.statValue}>{stats.n}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Velocidad (min/max/media):</span>
                  <span className={styles.statValue}>
                    {stats.velocidadMin.toFixed(2)} / {stats.velocidadMax.toFixed(2)} /{" "}
                    {stats.velocidadMean.toFixed(2)}
                  </span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Potencia (min/max/media):</span>
                  <span className={styles.statValue}>
                    {stats.potenciaMin.toFixed(2)} / {stats.potenciaMax.toFixed(2)} /{" "}
                    {stats.potenciaMean.toFixed(2)}
                  </span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className={styles.cardTitle}>Gráfico de Dispersión</h3>
              <div style={{ height: "400px" }}>
                <Scatter data={scatterData} options={scatterOptions} />
              </div>
            </Card>

            <Card>
              <h3 className={styles.cardTitle}>Vista previa (primeras 20 filas)</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Velocidad (m/s)</th>
                      <th>Potencia (kW)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {current.slice(0, 20).map((row, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{row.velocidad.toFixed(2)}</td>
                        <td>{row.potencia.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}