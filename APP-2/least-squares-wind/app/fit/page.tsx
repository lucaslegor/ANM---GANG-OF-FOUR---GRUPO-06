"use client"
import SectionTitle from "@/components/SectionTitle"
import { useAnalysis } from "@/context/AnalysisContext"
import Button from "@/components/Button"
import ScatterPlot from "@/components/ScatterPlot"
import MetricsPanel from "@/components/MetricsPanel"
import Equation from "@/components/Equation"
import { runPyodideFit } from "@/lib/pyodideClient"
import { useState } from "react"

export default function FitPage() {
  const { x, y, selected, setSelected, results, setResults } = useAnalysis()
  const [loading, setLoading] = useState(false)
  const ready = x.length > 0 && y.length > 0

  async function fitServer() {
    if (!ready) return
    setLoading(true)
    const models = Object.entries(selected)
      .filter(([, v]) => v)
      .map(([k]) => k)
    try {
      const res = await fetch("/api/fit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ x, y, models }),
      })
      if (!res.ok) {
        alert("Server fit error: " + res.statusText)
        return
      }
      const data = await res.json()
      setResults(normalizeServerResults(data, x, y))
    } catch (err: any) {
      alert("Error: " + (err?.message || String(err)))
    } finally {
      setLoading(false)
    }
  }

  async function fitLocal() {
    if (!ready) return
    setLoading(true)
    const models = Object.entries(selected)
      .filter(([, v]) => v)
      .map(([k]) => k)
    try {
      const data = await runPyodideFit({ x, y, models })
      setResults(normalizeServerResults(data, x, y))
    } catch (err: any) {
      alert("Pyodide fit error: " + (err?.message || String(err)))
    } finally {
      setLoading(false)
    }
  }

  function normalizeServerResults(data: any, x: number[], y: number[]) {
    const out: Record<string, any> = {}
    for (const [name, r] of Object.entries<any>(data.models || {})) {
      const yhat = r.yhat ?? x.map(() => 0)
      const residuals = r.residuals ?? y.map((yi, i) => yi - yhat[i])
      out[name] = {
        model: name,
        n: x.length,
        k: r.k ?? (name === "quadratic" ? 3 : 2),
        r2: r.r2,
        r2Adj: r.r2Adj,
        yhat,
        residuals,
        equationLatex: r.latex,
        coef: r.coef,
      }
    }
    return out
  }

  const hasSelection = Object.values(selected).some((v) => v)

  return (
    <section>
      <SectionTitle label="Model Fitting" />
      <div className="card p">
        <div className="model-pills">
          {(["linear", "quadratic", "power"] as const).map((m) => (
            <label key={m} className={`pill ${selected[m] ? "pill-on" : ""}`}>
              <input
                type="checkbox"
                checked={selected[m]}
                onChange={(e) => setSelected({ ...selected, [m]: e.target.checked })}
              />
              {m.toUpperCase()}
            </label>
          ))}
          <Button onClick={fitServer} disabled={!ready || !hasSelection || loading} variant="primary">
            {loading ? "Fitting..." : "Fit (Server · Python)"}
          </Button>
          <Button onClick={fitLocal} disabled={!ready || !hasSelection || loading} variant="outline">
            {loading ? "Fitting..." : "Fit (Local · Pyodide)"}
          </Button>
        </div>
      </div>

      <div className="grid2">
        <div className="card p">
          <h3>Scatter Plot with Fitted Curves</h3>
          <ScatterPlot />
        </div>
        <div className="card p">
          <h3>Model Parameters</h3>
          {Object.entries(results).length === 0 && <p className="muted">Run a fit to see results.</p>}
          {Object.entries(results).map(([k, r]) => (
            <div key={k} className="eq-block">
              <h4>{k.toUpperCase()}</h4>
              <Equation tex={r.equationLatex} />
              <MetricsPanel r2={r.r2} r2Adj={r.r2Adj} n={r.n} k={r.k} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
