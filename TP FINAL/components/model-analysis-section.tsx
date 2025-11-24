'use client'

/**
 * Componente de Análisis de Modelos
 * 
 * Muestra visualizaciones detalladas de los modelos de regresión segmentada:
 * 1. Gráfico de dispersión con curvas ajustadas
 * 2. Análisis de error vs tiempo de cambio
 * 3. Comparación de los 6 clústeres
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import { 
  LineChart, 
  Line, 
  ScatterChart,
  Scatter,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart
} from 'recharts'
import { useGrowthData } from '@/lib/use-growth-data'
import { CLUSTER_OPTIONS, predictGrowth, generateTimeSeries } from '@/lib/data-processor'
import { TrendingUp, BarChart3, GitCompare, Layers } from 'lucide-react'

const CLUSTER_COLORS = {
  '25-rico': '#3b82f6',
  '30-rico': '#10b981',
  '37-rico': '#f59e0b',
  '25-limitado': '#8b5cf6',
  '30-limitado': '#ec4899',
  '37-limitado': '#ef4444',
}

export function ModelAnalysisSection() {
  const { clusters, loading } = useGrowthData()
  const [selectedCluster, setSelectedCluster] = useState<string>('37-rico')

  // Datos para gráfico de dispersión con curva ajustada
  const scatterData = useMemo(() => {
    const option = CLUSTER_OPTIONS.find(opt => opt.id === selectedCluster.replace('rico', 'rich').replace('limitado', 'limited'))
    if (!option) return { experimental: [], fitted: [] }

    const clusterKey = `${option.temperature}-${option.medium}`
    const clusterData = clusters.get(clusterKey)
    
    if (!clusterData) return { experimental: [], fitted: [] }

    const experimental = clusterData.dataPoints.map(p => ({
      time: p.time,
      growth: p.growth,
    }))

    const fitted = generateTimeSeries(
      clusterData.model,
      0,
      Math.max(...clusterData.dataPoints.map(p => p.time)),
      200
    )

    return { experimental, fitted, model: clusterData.model }
  }, [selectedCluster, clusters])

  // Datos para comparación de todos los clústeres
  const comparisonData = useMemo(() => {
    const maxTime = 12 // horas
    const allClusters: Record<string, any[]> = {}

    for (const [key, clusterData] of clusters.entries()) {
      const series = generateTimeSeries(clusterData.model, 0, maxTime, 150)
      allClusters[key] = series
    }

    return allClusters
  }, [clusters])

  // Datos para análisis de error (simulación del algoritmo de búsqueda)
  const errorAnalysisData = useMemo(() => {
    const option = CLUSTER_OPTIONS.find(opt => opt.id === selectedCluster.replace('rico', 'rich').replace('limitado', 'limited'))
    if (!option) return []

    const clusterKey = `${option.temperature}-${option.medium}`
    const clusterData = clusters.get(clusterKey)
    
    if (!clusterData) return []

    const { dataPoints, model } = clusterData
    const times = dataPoints.map(p => p.time).sort((a, b) => a - b)
    
    // Simular búsqueda del tiempo óptimo
    const errors: Array<{ time: number; error: number; isOptimal: boolean }> = []
    const n = times.length
    
    for (let i = 4; i < n - 4; i++) {
      const t = times[i]
      
      // Calcular error aproximado para este punto de corte
      const expData = dataPoints.filter(p => p.time < t)
      const linData = dataPoints.filter(p => p.time >= t)
      
      let errorExp = 0
      for (const p of expData) {
        const pred = predictGrowth(model, p.time)
        errorExp += Math.pow(p.growth - pred, 2)
      }
      
      let errorLin = 0
      for (const p of linData) {
        const pred = predictGrowth(model, p.time)
        errorLin += Math.pow(p.growth - pred, 2)
      }
      
      const totalError = errorExp + errorLin
      const isOptimal = Math.abs(t - model.t_crit) < 0.01
      
      errors.push({ time: t, error: totalError, isOptimal })
    }
    
    return errors
  }, [selectedCluster, clusters])

  const currentColor = CLUSTER_COLORS[selectedCluster as keyof typeof CLUSTER_COLORS] || '#3b82f6'

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-current border-t-transparent rounded-full animate-spin mx-auto mb-4"
            style={{ color: currentColor }}
          />
          <p style={{ color: 'oklch(0.7 0.05 200)' }}>Cargando análisis de modelos...</p>
        </div>
      </div>
    )
  }

  return (
    <section className="min-h-screen py-20 pt-32 md:pt-40 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: 'oklch(0.95 0.01 200)' }}
          >
            Análisis de Modelos Matemáticos
          </h2>
          <p className="text-lg leading-relaxed"
            style={{ color: 'oklch(0.7 0.05 200)' }}
          >
            Visualización detallada de los modelos de regresión segmentada aplicados a cada clúster
          </p>
        </motion.div>

        <Tabs defaultValue="scatter" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 glass">
            <TabsTrigger value="scatter" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Dispersión y Ajuste
            </TabsTrigger>
            <TabsTrigger value="error" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Análisis de Error
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2">
              <GitCompare className="h-4 w-4" />
              Comparación
            </TabsTrigger>
          </TabsList>

          {/* Panel 1: Gráfico de Dispersión con Curva Ajustada */}
          <TabsContent value="scatter">
            <Card className="glass neon-border">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2"
                      style={{ color: 'oklch(0.95 0.01 200)' }}
                    >
                      <Layers className="h-5 w-5" style={{ color: currentColor }} />
                      Datos Experimentales y Modelo Ajustado
                    </CardTitle>
                    <CardDescription className="mt-2" style={{ color: 'oklch(0.7 0.05 200)' }}>
                      Visualización de puntos experimentales con la curva del modelo segmentado
                    </CardDescription>
                  </div>
                  <Select value={selectedCluster} onValueChange={setSelectedCluster}>
                    <SelectTrigger className="w-[240px] glass border"
                      style={{ borderColor: `${currentColor} / 0.5` }}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass">
                      {Object.keys(CLUSTER_COLORS).map(key => (
                        <SelectItem key={key} value={key}>
                          {key.replace('-', ' - ').replace('rico', 'Rico').replace('limitado', 'Limitado')}°C
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.1 200 / 0.3)" />
                      <XAxis 
                        dataKey="time"
                        type="number"
                        domain={[0, 'auto']}
                        label={{ value: 'Tiempo (horas)', position: 'insideBottom', offset: -5 }}
                        stroke="oklch(0.7 0.05 200)"
                      />
                      <YAxis 
                        label={{ value: 'Crecimiento Normalizado', angle: -90, position: 'insideLeft' }}
                        domain={[0, 'auto']}
                        stroke="oklch(0.7 0.05 200)"
                      />
                      <Tooltip 
                        contentStyle={{
                          background: 'oklch(0.12 0.04 240 / 0.95)',
                          border: `1px solid ${currentColor}`,
                          borderRadius: '8px',
                          color: 'oklch(0.95 0.01 200)',
                        }}
                      />
                      <Legend />
                      
                      {/* Línea vertical en t_crit */}
                      {scatterData.model && (
                        <ReferenceLine 
                          x={scatterData.model.t_crit} 
                          stroke={currentColor}
                          strokeDasharray="5 5"
                          label={{ 
                            value: `t_crit = ${scatterData.model.t_crit.toFixed(2)}h`, 
                            position: 'top',
                            fill: currentColor,
                            fontSize: 12,
                          }}
                        />
                      )}
                      
                      {/* Curva ajustada */}
                      <Line
                        data={scatterData.fitted}
                        type="monotone"
                        dataKey="growth"
                        name="Modelo Segmentado"
                        stroke={currentColor}
                        strokeWidth={3}
                        dot={false}
                        isAnimationActive={true}
                      />
                      
                      {/* Puntos experimentales */}
                      <Scatter
                        data={scatterData.experimental}
                        dataKey="growth"
                        name="Datos Experimentales"
                        fill={currentColor}
                        fillOpacity={0.6}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                {/* Información del modelo */}
                {scatterData.model && (
                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div className="glass p-4 rounded-lg border"
                      style={{ borderColor: `${currentColor} / 0.3` }}
                    >
                      <h4 className="font-semibold mb-2" style={{ color: 'oklch(0.95 0.01 200)' }}>
                        Fase Exponencial (t &lt; {scatterData.model.t_crit.toFixed(2)}h)
                      </h4>
                      <p className="text-sm font-mono" style={{ color: currentColor }}>
                        y = {scatterData.model.exponential.a.toFixed(6)} · exp({scatterData.model.exponential.b.toFixed(6)} · t)
                      </p>
                    </div>
                    <div className="glass p-4 rounded-lg border"
                      style={{ borderColor: `${currentColor} / 0.3` }}
                    >
                      <h4 className="font-semibold mb-2" style={{ color: 'oklch(0.95 0.01 200)' }}>
                        Fase Estacionaria (t ≥ {scatterData.model.t_crit.toFixed(2)}h)
                      </h4>
                      <p className="text-sm font-mono" style={{ color: currentColor }}>
                        y = {scatterData.model.linear.m.toExponential(3)} · t + {scatterData.model.linear.c.toFixed(4)}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Panel 2: Análisis de Error vs Tiempo de Cambio */}
          <TabsContent value="error">
            <Card className="glass neon-border">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2"
                      style={{ color: 'oklch(0.95 0.01 200)' }}
                    >
                      <BarChart3 className="h-5 w-5" style={{ color: currentColor }} />
                      Error Total vs Tiempo de Cambio
                    </CardTitle>
                    <CardDescription className="mt-2" style={{ color: 'oklch(0.7 0.05 200)' }}>
                      Análisis del algoritmo de búsqueda del tiempo crítico óptimo
                    </CardDescription>
                  </div>
                  <Select value={selectedCluster} onValueChange={setSelectedCluster}>
                    <SelectTrigger className="w-[240px] glass border"
                      style={{ borderColor: `${currentColor} / 0.5` }}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass">
                      {Object.keys(CLUSTER_COLORS).map(key => (
                        <SelectItem key={key} value={key}>
                          {key.replace('-', ' - ').replace('rico', 'Rico').replace('limitado', 'Limitado')}°C
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={errorAnalysisData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.1 200 / 0.3)" />
                      <XAxis 
                        dataKey="time"
                        label={{ value: 'Tiempo candidato (horas)', position: 'insideBottom', offset: -5 }}
                        stroke="oklch(0.7 0.05 200)"
                      />
                      <YAxis 
                        label={{ value: 'Error Total (SSE)', angle: -90, position: 'insideLeft' }}
                        stroke="oklch(0.7 0.05 200)"
                      />
                      <Tooltip 
                        contentStyle={{
                          background: 'oklch(0.12 0.04 240 / 0.95)',
                          border: `1px solid ${currentColor}`,
                          borderRadius: '8px',
                          color: 'oklch(0.95 0.01 200)',
                        }}
                        formatter={(value: any) => [value.toFixed(6), 'Error']}
                      />
                      <Legend />
                      
                      {/* Área bajo la curva */}
                      <Area
                        type="monotone"
                        dataKey="error"
                        name="Error Total"
                        fill={currentColor}
                        fillOpacity={0.3}
                        stroke={currentColor}
                        strokeWidth={2}
                      />
                      
                      {/* Punto óptimo */}
                      <Scatter
                        data={errorAnalysisData.filter(d => d.isOptimal)}
                        dataKey="error"
                        name="Tiempo Óptimo"
                        fill="#ef4444"
                        shape="star"
                        size={200}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 glass p-4 rounded-lg border"
                  style={{ borderColor: `${currentColor} / 0.3` }}
                >
                  <h4 className="font-semibold mb-2" style={{ color: 'oklch(0.95 0.01 200)' }}>
                    Interpretación
                  </h4>
                  <p className="text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>
                    El gráfico muestra cómo varía el error total (suma de errores exponencial + lineal) 
                    según el punto de corte elegido. El tiempo crítico óptimo (marcado con estrella roja) 
                    es aquel que minimiza este error, asegurando el mejor ajuste conjunto de ambos modelos.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Panel 3: Comparación de Todos los Clústeres */}
          <TabsContent value="comparison">
            <Card className="glass neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"
                  style={{ color: 'oklch(0.95 0.01 200)' }}
                >
                  <GitCompare className="h-5 w-5" style={{ color: '#3b82f6' }} />
                  Comparación de los 6 Clústeres
                </CardTitle>
                <CardDescription className="mt-2" style={{ color: 'oklch(0.7 0.05 200)' }}>
                  Visualización simultánea de todos los modelos con tiempos críticos marcados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.1 200 / 0.3)" />
                      <XAxis 
                        dataKey="time"
                        type="number"
                        domain={[0, 12]}
                        label={{ value: 'Tiempo (horas)', position: 'insideBottom', offset: -5 }}
                        stroke="oklch(0.7 0.05 200)"
                      />
                      <YAxis 
                        label={{ value: 'Crecimiento Normalizado', angle: -90, position: 'insideLeft' }}
                        domain={[0, 'auto']}
                        stroke="oklch(0.7 0.05 200)"
                      />
                      <Tooltip 
                        contentStyle={{
                          background: 'oklch(0.12 0.04 240 / 0.95)',
                          border: '1px solid oklch(0.5 0.2 200)',
                          borderRadius: '8px',
                          color: 'oklch(0.95 0.01 200)',
                        }}
                      />
                      <Legend />
                      
                      {/* Líneas de cada clúster */}
                      {Object.entries(comparisonData).map(([key, data]) => {
                        const color = CLUSTER_COLORS[key as keyof typeof CLUSTER_COLORS]
                        const label = key.replace('-', ' - ').replace('rico', 'Rico').replace('limitado', 'Limitado')
                        
                        return (
                          <Line
                            key={key}
                            data={data}
                            type="monotone"
                            dataKey="growth"
                            name={label}
                            stroke={color}
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={true}
                          />
                        )
                      })}
                      
                      {/* Líneas verticales de t_crit */}
                      {Array.from(clusters.values()).map((clusterData) => (
                        <ReferenceLine
                          key={clusterData.cluster}
                          x={clusterData.model.t_crit}
                          stroke={CLUSTER_COLORS[clusterData.cluster as keyof typeof CLUSTER_COLORS]}
                          strokeDasharray="3 3"
                          strokeWidth={1}
                          opacity={0.5}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Tabla de resumen */}
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b" style={{ borderColor: 'oklch(0.3 0.1 200)' }}>
                        <th className="text-left p-2" style={{ color: 'oklch(0.95 0.01 200)' }}>Clúster</th>
                        <th className="text-left p-2" style={{ color: 'oklch(0.95 0.01 200)' }}>Temp</th>
                        <th className="text-left p-2" style={{ color: 'oklch(0.95 0.01 200)' }}>Medio</th>
                        <th className="text-right p-2" style={{ color: 'oklch(0.95 0.01 200)' }}>t_crit (h)</th>
                        <th className="text-right p-2" style={{ color: 'oklch(0.95 0.01 200)' }}>R²</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from(clusters.values())
                        .sort((a, b) => a.model.cluster_id - b.model.cluster_id)
                        .map((clusterData) => (
                          <tr 
                            key={clusterData.cluster} 
                            className="border-b hover:bg-white/5 transition-colors"
                            style={{ borderColor: 'oklch(0.3 0.1 200 / 0.3)' }}
                          >
                            <td className="p-2">
                              <span 
                                className="inline-block w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: CLUSTER_COLORS[clusterData.cluster as keyof typeof CLUSTER_COLORS] }}
                              />
                              <span style={{ color: 'oklch(0.7 0.05 200)' }}>
                                {clusterData.model.cluster_id}
                              </span>
                            </td>
                            <td className="p-2" style={{ color: 'oklch(0.7 0.05 200)' }}>
                              {clusterData.temperature}°C
                            </td>
                            <td className="p-2" style={{ color: 'oklch(0.7 0.05 200)' }}>
                              {clusterData.model.medium_label}
                            </td>
                            <td className="text-right p-2 font-mono" style={{ color: CLUSTER_COLORS[clusterData.cluster as keyof typeof CLUSTER_COLORS] }}>
                              {clusterData.model.t_crit.toFixed(2)}
                            </td>
                            <td className="text-right p-2 font-mono" style={{ color: 'oklch(0.7 0.05 200)' }}>
                              {clusterData.rSquared.toFixed(6)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 glass p-4 rounded-lg border"
                  style={{ borderColor: 'oklch(0.5 0.2 200 / 0.3)' }}
                >
                  <h4 className="font-semibold mb-2" style={{ color: 'oklch(0.95 0.01 200)' }}>
                    Observaciones
                  </h4>
                  <ul className="text-sm space-y-1" style={{ color: 'oklch(0.7 0.05 200)' }}>
                    <li>• A mayor temperatura, menor tiempo crítico (entrada más rápida a fase estacionaria)</li>
                    <li>• El medio rico acelera el crecimiento inicial comparado con el medio limitado</li>
                    <li>• Todos los modelos presentan R² &gt; 0.98, validando la regresión segmentada</li>
                    <li>• Las líneas verticales punteadas indican los tiempos críticos de cada clúster</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

