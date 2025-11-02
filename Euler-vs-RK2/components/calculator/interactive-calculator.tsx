"use client"

import React, { useMemo, useState } from "react"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Row = {
  step: number
  x: number
  yEuler: number
  yRK2: number
}

function format(num: number) {
  if (!isFinite(num)) return "NaN"
  return Number(num.toFixed(6)).toString()
}

export function InteractiveCalculator() {
  const [equation, setEquation] = useState<string>("2*x*y")
  const [x0, setX0] = useState<string>("1")
  const [y0, setY0] = useState<string>("1")
  const [h, setH] = useState<string>("0.1")
  const [xf, setXf] = useState<string>("1.3")
  const [error, setError] = useState<string>("")
  const [rows, setRows] = useState<Row[] | null>(null)

  const stepsPlanned = useMemo(() => {
    const _x0 = parseFloat(x0)
    const _xf = parseFloat(xf)
    const _h = parseFloat(h)
    if (!isFinite(_x0) || !isFinite(_xf) || !isFinite(_h) || _h === 0) return 0
    const n = Math.max(1, Math.ceil(Math.abs((_xf - _x0) / Math.abs(_h))))
    return n
  }, [x0, xf, h])

  function compile(expr: string): ((x: number, y: number) => number) | null {
    try {
      // Muy simple: evaluar como JS. Usuario debe escribir expresiones JS válidas.
      // Ejemplos: 2*x*y, x + y, x*y - x
      // Deshabilitamos acceso implícito a globales comunes vía cierre vacío
      // eslint-disable-next-line no-new-func
      const fn = new Function("x", "y", `"use strict"; return (${expr});`) as (x: number, y: number) => number
      // Prueba rápida
      void fn(0, 0)
      return fn
    } catch (e) {
      return null
    }
  }

  function compute() {
    setError("")
    setRows(null)

    const _x0 = parseFloat(x0)
    const _y0 = parseFloat(y0)
    const _h = parseFloat(h)
    const _xf = parseFloat(xf)

    if (!isFinite(_x0) || !isFinite(_y0) || !isFinite(_h) || !isFinite(_xf)) {
      setError("Parámetros inválidos. Revisa números y formato.")
      return
    }
    if (_h === 0) {
      setError("El paso h no puede ser 0.")
      return
    }
    const f = compile(equation)
    if (!f) {
      setError("Ecuación inválida. Usa una expresión JS en x,y. Ej: 2*x*y")
      return
    }

    const absH = Math.abs(_h)
    // Asegura avanzar hacia xf incluso si h tiene signo opuesto
    const stepH = (_xf - _x0) >= 0 ? absH : -absH
    const nSteps = Math.max(1, Math.ceil(Math.abs((_xf - _x0) / absH)))
    const res: Row[] = []

    let x = _x0
    let yE = _y0
    let yR = _y0
    res.push({ step: 0, x, yEuler: yE, yRK2: yR })

    for (let i = 1; i <= nSteps; i++) {
      // Euler
      const kE = f(x, yE)
      const yE1 = yE + stepH * kE

      // RK2 (punto medio)
      const k1 = f(x, yR)
      const k2 = f(x + stepH / 2, yR + (stepH * k1) / 2)
      const yR1 = yR + stepH * k2

      x = _x0 + i * stepH
      yE = yE1
      yR = yR1
      res.push({ step: i, x, yEuler: yE, yRK2: yR })
    }

    // Si el último x sobrepasó xf por redondeo, ajusta el valor de x del último registro
    const last = res[res.length - 1]
    if (Math.sign(_xf - _x0) !== 0 && Math.sign(last.x - _xf) === Math.sign(stepH)) {
      last.x = _xf
    }

    // Filtra valores no finitos para que el gráfico no quede vacío
    const clean = res.filter(r => isFinite(r.x) && isFinite(r.yEuler) && isFinite(r.yRK2))
    setRows(clean)
  }

  return (
    <section className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-6 md:p-8 rounded-2xl border-2 border-cyan-500/30 backdrop-blur-sm animate-fade-in-up">
      <h2 className="text-3xl font-bold mb-6 text-cyan-300 text-center">Calculadora Interactiva</h2>

      {/* Parámetros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-900/40 p-4 rounded-xl border border-cyan-500/20">
          <Label className="block text-sm text-gray-300 mb-2">Ecuación f(x, y)</Label>
          <Input
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            placeholder="Ej: 2*x*y"
            className="bg-slate-800/70 border-slate-600 text-gray-100"
          />
          <p className="text-xs text-gray-400 mt-2">Formato JS. Operadores: + - * / y potencias con Math.pow(x,n)</p>
        </div>

        <div className="bg-slate-900/40 p-4 rounded-xl border border-cyan-500/20">
          <Label className="block text-sm text-gray-300 mb-2">Condición inicial</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              value={x0}
              onChange={(e) => setX0(e.target.value)}
              placeholder="x0"
              className="bg-slate-800/70 border-slate-600 text-gray-100"
            />
            <Input
              value={y0}
              onChange={(e) => setY0(e.target.value)}
              placeholder="y0"
              className="bg-slate-800/70 border-slate-600 text-gray-100"
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">Ej: x0 = 1, y0 = 1</p>
        </div>

        <div className="bg-slate-900/40 p-4 rounded-xl border border-cyan-500/20">
          <Label className="block text-sm text-gray-300 mb-2">Paso y valor final</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              value={h}
              onChange={(e) => setH(e.target.value)}
              placeholder="h"
              className="bg-slate-800/70 border-slate-600 text-gray-100"
            />
            <Input
              value={xf}
              onChange={(e) => setXf(e.target.value)}
              placeholder="x_f"
              className="bg-slate-800/70 border-slate-600 text-gray-100"
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">Pasos estimados: {stepsPlanned}</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-lg border border-red-500/40 bg-red-900/30 text-red-200">
          {error}
        </div>
      )}

      <div className="flex items-center gap-3 mb-8">
        <Button
          onClick={compute}
          className="bg-blue-600 hover:bg-blue-500 text-white border-2 border-blue-400/50 ring-1 ring-blue-400/30 shadow-[0_0_12px] shadow-blue-500/30 hover:shadow-blue-500/60"
        >
          Calcular
        </Button>
        <Button
          onClick={() => {
            setEquation("2*x*y")
            setX0("1")
            setY0("1")
            setH("0.1")
            setXf("1.3")
            setRows(null)
            setError("")
          }}
          className="bg-red-600 hover:bg-red-500 text-white border-2 border-red-400/50 ring-1 ring-red-400/30 shadow-[0_0_12px] shadow-red-500/30 hover:shadow-red-500/60"
        >
          Reset ejemplo
        </Button>
      </div>

      {rows && (
        <Tabs defaultValue="compare" className="mt-6">
          <TabsList className="flex w-full gap-2 p-0 px-2 bg-transparent">
            <TabsTrigger
              value="euler"
              className="flex-1 h-10 rounded-lg text-red-300 border border-red-500/30 hover:text-red-200 data-[state=active]:bg-red-950/30 data-[state=active]:border-red-500 data-[state=active]:shadow-[0_0_12px] data-[state=active]:shadow-red-500/40"
            >
              Euler
            </TabsTrigger>
            <TabsTrigger
              value="rk2"
              className="flex-1 h-10 rounded-lg text-blue-300 border border-blue-500/30 hover:text-blue-200 data-[state=active]:bg-blue-950/30 data-[state=active]:border-blue-500 data-[state=active]:shadow-[0_0_12px] data-[state=active]:shadow-blue-500/40"
            >
              Runge-Kutta 2
            </TabsTrigger>
            <TabsTrigger
              value="compare"
              className="flex-1 h-10 rounded-lg text-yellow-300 border border-yellow-500/30 hover:text-yellow-200 data-[state=active]:bg-yellow-950/20 data-[state=active]:border-yellow-500 data-[state=active]:shadow-[0_0_12px] data-[state=active]:shadow-yellow-500/40"
            >
              Comparativa
            </TabsTrigger>
          </TabsList>

          <TabsContent value="euler">
            <div className="overflow-x-auto rounded-xl border border-cyan-500/20">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-800/60 border-b border-cyan-500/20">
                    <th className="text-left p-3 text-cyan-200">Paso</th>
                    <th className="text-left p-3 text-cyan-200">x</th>
                    <th className="text-left p-3 text-red-300">y (Euler)</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.step} className="odd:bg-slate-900/30">
                      <td className="p-3 text-gray-200">{r.step}</td>
                      <td className="p-3 text-gray-200">{format(r.x)}</td>
                      <td className="p-3 text-red-200">{format(r.yEuler)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="rk2">
            <div className="overflow-x-auto rounded-xl border border-cyan-500/20">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-800/60 border-b border-cyan-500/20">
                    <th className="text-left p-3 text-cyan-200">Paso</th>
                    <th className="text-left p-3 text-cyan-200">x</th>
                    <th className="text-left p-3 text-blue-300">y (RK2)</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.step} className="odd:bg-slate-900/30">
                      <td className="p-3 text-gray-200">{r.step}</td>
                      <td className="p-3 text-gray-200">{format(r.x)}</td>
                      <td className="p-3 text-blue-200">{format(r.yRK2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="compare">
            <div className="overflow-x-auto rounded-xl border border-cyan-500/20">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-800/60 border-b border-cyan-500/20">
                    <th className="text-left p-3 text-cyan-200">Paso</th>
                    <th className="text-left p-3 text-cyan-200">x</th>
                    <th className="text-left p-3 text-red-300">y (Euler)</th>
                    <th className="text-left p-3 text-blue-300">y (RK2)</th>
                    <th className="text-left p-3 text-gray-300">|Euler - RK2|</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.step} className="odd:bg-slate-900/30">
                      <td className="p-3 text-gray-200">{r.step}</td>
                      <td className="p-3 text-gray-200">{format(r.x)}</td>
                      <td className="p-3 text-red-200">{format(r.yEuler)}</td>
                      <td className="p-3 text-blue-200">{format(r.yRK2)}</td>
                      <td className="p-3 text-gray-200">{format(Math.abs(r.yEuler - r.yRK2))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3 text-center text-cyan-200">Comparación Gráfica</h3>
              <ChartContainer
                config={{
                  euler: { label: "Euler", color: "#f87171" },
                  rk2: { label: "RK2", color: "#60a5fa" },
                }}
                className="w-full"
              >
                <LineChart data={rows.map(r => ({ x: r.x, euler: r.yEuler, rk2: r.yRK2 }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                  <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="euler" stroke="var(--color-euler)" dot={false} strokeWidth={2} />
                  <Line type="monotone" dataKey="rk2" stroke="var(--color-rk2)" dot={false} strokeWidth={2} />
                  <ChartLegend content={<ChartLegendContent />} />
                </LineChart>
              </ChartContainer>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </section>
  )
}
