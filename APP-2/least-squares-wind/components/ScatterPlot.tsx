"use client"
import { Scatter } from "react-chartjs-2"
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js"
import { useAnalysis } from "@/context/AnalysisContext"

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

export default function ScatterPlot() {
  const { x, y, results } = useAnalysis()
  const points = x.map((xi, i) => ({ x: xi, y: y[i] }))

  const datasets: any[] = [
    {
      label: "Data",
      data: points,
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      pointRadius: 4,
      showLine: false,
    },
  ]

  const colors: Record<string, string> = {
    linear: "rgba(0, 112, 243, 1)",
    quadratic: "rgba(121, 40, 202, 1)",
    power: "rgba(0, 217, 255, 1)",
  }

  Object.entries(results).forEach(([name, r]) => {
    // Sort for smooth line
    const sorted = x.map((xi, i) => ({ x: xi, y: r.yhat[i] })).sort((a, b) => a.x - b.x)
    datasets.push({
      label: name.toUpperCase(),
      data: sorted,
      borderColor: colors[name] || "rgba(255, 255, 255, 0.8)",
      borderWidth: 2,
      pointRadius: 0,
      showLine: true,
      fill: false,
    })
  })

  return (
    <div className="chart-container">
      <Scatter
        data={{ datasets }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: "top" } },
          scales: {
            x: { title: { display: true, text: "Velocity (m/s)" } },
            y: { title: { display: true, text: "Power (kW)" } },
          },
        }}
      />
    </div>
  )
}
