"use client"

import {
  ScatterChart,
  Scatter,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import type { DataPoint, RegressionResult } from "@/lib/regression"

interface RegressionChartProps {
  data: DataPoint[]
  result: RegressionResult
}

export function RegressionChart({ data, result }: RegressionChartProps) {
  // Combine original data with predictions
  const chartData = data.map((point, index) => ({
    x: point.x,
    actual: point.y,
    predicted: result.predictions[index],
  }))

  // Sort by x for proper line rendering
  chartData.sort((a, b) => a.x - b.x)

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            type="number"
            dataKey="x"
            name="X"
            className="text-xs"
            label={{ value: "Variable Independiente (X)", position: "insideBottom", offset: -10 }}
          />
          <YAxis
            type="number"
            name="Y"
            className="text-xs"
            label={{ value: "Variable Dependiente (Y)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Scatter name="Datos Originales" data={chartData} fill="hsl(var(--chart-1))" dataKey="actual" />
          <Line
            type="monotone"
            data={chartData}
            dataKey="predicted"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={false}
            name="Ajuste"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
