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
  Label
} from "recharts"
import type { DataPoint, RegressionResult } from "@/lib/types"
import { useEffect, useState } from 'react'

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

  const equationText = result.equation;
  const r2Text = `R²: ${result.r2.toFixed(4)}`;

  
  // Labels for axes coming from dataset selection (stored in localStorage)
  const [xLabel, setXLabel] = useState<string>("Variable Independiente (X)")
  const [yLabel, setYLabel] = useState<string>("Variable Dependiente (Y)")

  useEffect(() => {
    // Leer las columnas seleccionadas que Guarda la página /dataset/page.tsx
    try {
      const xCol = localStorage.getItem("xColumn")
      const yCol = localStorage.getItem("yColumn")
      if (xCol) setXLabel(xCol)
      if (yCol) setYLabel(yCol)
    } catch (e) {
      // no-op: si localStorage no está disponible, mantener los valores por defecto
    }
  }, [])

  return (
    <div className="w-full h-[420px]">
      <div className="mb-2">
        <div className="text-sm font-bold text-black">{equationText}</div>
        <div className="text-xs text-muted-foreground">{r2Text}</div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 30, left: 60, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            type="number"
            dataKey="x"
            name={xLabel}
            className="text-xs"
            label={{ value: xLabel, position: "bottom", offset: 20 }}
            tick={{fontSize: 12}}
            tickMargin={8}
          />
          <YAxis
            type="number"
            name={yLabel}
            className="text-xs"
            label={{ value: yLabel, angle: -90, position: "left", offset: -10 }}
            tick={{fontSize: 12}}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Legend verticalAlign="top" align="right" height={36} wrapperStyle={{ paddingBottom: 8 }} />
          <Scatter name="Datos Originales" data={chartData} fill="blue" dataKey="actual" />
          <Line
            type="monotone"
            data={chartData}
            dataKey="predicted"
            stroke="red"
            strokeWidth={2}
            dot={false}
            name="Ajuste"

          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}