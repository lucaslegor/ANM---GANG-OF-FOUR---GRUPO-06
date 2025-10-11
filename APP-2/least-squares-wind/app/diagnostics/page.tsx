"use client"
import SectionTitle from "@/components/SectionTitle"
import { useAnalysis } from "@/context/AnalysisContext"
import { Scatter, Bar } from "react-chartjs-2"
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend, CategoryScale, BarElement } from "chart.js"

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, CategoryScale, BarElement)

export default function DiagnosticsPage() {
  const { x, results } = useAnalysis()
  const first = Object.values(results)[0]
  const resid = first?.residuals ?? []

  // Create histogram bins
  const bins = 10
  const histData = resid.length > 0 ? createHistogram(resid, bins) : { labels: [], data: [] }

  return (
    <section>
      <SectionTitle label="Diagnostic Analysis" />
      {!first && <p className="muted">First run a fit in the Model Fitting page.</p>}
      {first && (
        <>
          <div className="grid2">
            <div className="card p">
              <h3>Residuals vs Velocity</h3>
              <Scatter
                data={{
                  datasets: [
                    {
                      label: "Residuals",
                      data: resid.map((r, i) => ({ x: x[i], y: r })),
                      backgroundColor: "rgba(0, 112, 243, 0.6)",
                      pointRadius: 3,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { title: { display: true, text: "Velocity" } },
                    y: { title: { display: true, text: "Residual" } },
                  },
                }}
              />
            </div>
            <div className="card p">
              <h3>Histogram of Residuals</h3>
              <Bar
                data={{
                  labels: histData.labels,
                  datasets: [
                    {
                      label: "Frequency",
                      data: histData.data,
                      backgroundColor: "rgba(0, 217, 255, 0.6)",
                      borderColor: "rgba(0, 217, 255, 1)",
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { title: { display: true, text: "Residual Range" } },
                    y: { title: { display: true, text: "Frequency" } },
                  },
                }}
              />
            </div>
          </div>
          <div className="card p" style={{ marginTop: "1.5rem" }}>
            <h3>Diagnostic Notes</h3>
            <p className="muted">
              <strong>Residuals vs Velocity:</strong> Check for patterns. Random scatter suggests good fit. Funnel
              shapes indicate heteroscedasticity.
            </p>
            <p className="muted" style={{ marginTop: "0.5rem" }}>
              <strong>Histogram:</strong> Should approximate normal distribution for valid inference. Skewness or
              outliers may indicate model issues.
            </p>
          </div>
        </>
      )}
    </section>
  )
}

function createHistogram(data: number[], bins: number) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const binWidth = (max - min) / bins
  const counts = new Array(bins).fill(0)
  const labels: string[] = []

  for (let i = 0; i < bins; i++) {
    const start = min + i * binWidth
    const end = start + binWidth
    labels.push(`${start.toFixed(2)}`)
    counts[i] = data.filter((v) => v >= start && v < end).length
  }

  return { labels, data: counts }
}
