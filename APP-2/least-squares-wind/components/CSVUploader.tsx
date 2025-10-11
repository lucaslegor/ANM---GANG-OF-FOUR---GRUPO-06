"use client"
import Papa from "papaparse"
import type React from "react"

import { useAnalysis } from "@/context/AnalysisContext"

export default function CSVUploader() {
  const { setData } = useAnalysis()

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      delimiter: ";", // Support semicolon-separated CSV files
      complete: (res) => {
        const rows = res.data as any[]
        const x: number[] = []
        const y: number[] = []
        rows.forEach((r) => {
          const vx = Number(r.velocidad ?? r.wind_speed_ms ?? r.x)
          const vy = Number(r.potencia ?? r.power_kW ?? r.y)
          if (Number.isFinite(vx) && Number.isFinite(vy)) {
            x.push(vx)
            y.push(vy)
          }
        })
        if (x.length > 0) {
          setData(x, y)
          alert(`Loaded ${x.length} data points successfully!`)
        } else {
          alert("No valid data found. Check CSV headers (velocidad/x, potencia/y).")
        }
      },
    })
  }

  return (
    <div className="uploader card p">
      <label className="btn btn-outline" style={{ cursor: "pointer" }}>
        Upload CSV File
        <input type="file" accept=".csv" onChange={onFile} style={{ display: "none" }} />
      </label>
      <p className="muted" style={{ marginTop: "1rem" }}>
        Expected headers: <code>velocidad</code>, <code>potencia</code> (or <code>x</code>, <code>y</code>)
      </p>
    </div>
  )
}
