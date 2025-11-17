'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BarChart3, TrendingUp, Activity, Zap } from 'lucide-react'
import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { useGrowthData } from '@/lib/use-growth-data'
import { CLUSTER_OPTIONS, predictGrowth, calculateGrowthRate } from '@/lib/data-processor'
import { motion } from 'framer-motion'

export function DashboardSection() {
  const { clusters, loading, error } = useGrowthData()
  const [selectedTemperature, setSelectedTemperature] = useState<string>('all')
  const [selectedMedium, setSelectedMedium] = useState<string>('all')

  // Filtrar clusters según los parámetros seleccionados
  const filteredClusters = useMemo(() => {
    return CLUSTER_OPTIONS.filter(option => {
      const tempMatch = selectedTemperature === 'all' || option.temperature === parseInt(selectedTemperature)
      // Mapear 'rich'/'limited' del select a 'rico'/'limitado' de CLUSTER_OPTIONS
      const mediumMap: Record<string, string> = {
        'rich': 'rico',
        'limited': 'limitado',
        'all': 'all'
      }
      const mappedMedium = mediumMap[selectedMedium] || selectedMedium
      const mediumMatch = selectedMedium === 'all' || option.medium === mappedMedium
      return tempMatch && mediumMatch
    })
  }, [selectedTemperature, selectedMedium])

  // Calcular métricas agregadas
  const metrics = useMemo(() => {
    if (!clusters || clusters.size === 0) return null

    // Filtrar clusters según los parámetros seleccionados
    const filteredClusterData = filteredClusters
      .map(option => {
        const clusterKey = `${option.temperature}-${option.medium}`
        return clusters.get(clusterKey)
      })
      .filter((cluster): cluster is NonNullable<typeof cluster> => 
        cluster !== undefined && cluster.model !== undefined
      )

    if (filteredClusterData.length === 0) return null

    // Calcular tasas de crecimiento promedio
    const growthRates = filteredClusterData.map(cluster => {
      if (!cluster.model) return 0
      const t1 = 2 * 60 // Convertir horas a minutos
      const t2 = 4 * 60
      return calculateGrowthRate(cluster.model, t1, t2)
    })

    const avgGrowthRate = growthRates.reduce((a, b) => a + b, 0) / growthRates.length

    // Calcular porcentaje de crecimiento en diferentes periodos
    const growth24h = filteredClusterData.map(cluster => {
      if (!cluster.model) return 0
      const growth0 = predictGrowth(cluster.model, 0)
      const growth24 = predictGrowth(cluster.model, 24 * 60) // 24 horas en minutos
      if (growth0 === 0) return 0
      return ((growth24 - growth0) / growth0) * 100
    })

    const avgGrowth24h = growth24h.reduce((a, b) => a + b, 0) / growth24h.length

    // Comparación entre clusters
    const clusterComparison = filteredClusterData.map((cluster, index) => {
      const option = filteredClusters[index]
      return {
        name: option ? `${option.temperature}°C - ${option.medium === 'rico' ? 'Rico' : 'Limitado'}` : `Cluster ${index + 1}`,
        growthRate: growthRates[index] || 0,
        growth24h: growth24h[index] || 0,
      }
    })

    return {
      avgGrowthRate,
      avgGrowth24h,
      clusterComparison,
      totalClusters: filteredClusterData.length,
    }
  }, [clusters, selectedTemperature, selectedMedium, filteredClusters])

  // Datos para gráfico de tendencias
  const trendData = useMemo(() => {
    if (!clusters || clusters.size === 0) return []

    const data: Array<{ time: number; [key: string]: number | string }> = []
    const timePoints = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24].map(t => t * 60) // En minutos

    filteredClusters.forEach(option => {
      const clusterKey = `${option.temperature}-${option.medium}`
      const cluster = clusters.get(clusterKey)
      if (!cluster || !cluster.model) return

      timePoints.forEach(time => {
        const existing = data.find(d => d.time === time / 60)
        const growth = predictGrowth(cluster.model, time)
        const label = `${option.temperature}°C - ${option.medium === 'rico' ? 'Rico' : 'Limitado'}`

        if (existing) {
          existing[label] = growth
        } else {
          data.push({
            time: time / 60, // Convertir a horas para visualización
            [label]: growth,
          })
        }
      })
    })

    return data.sort((a, b) => (a.time as number) - (b.time as number))
  }, [clusters, filteredClusters])

  const colors = [
    'oklch(0.75 0.25 200)',
    'oklch(0.7 0.28 320)',
    'oklch(0.8 0.22 140)',
    'oklch(0.65 0.25 240)',
    'oklch(0.72 0.26 280)',
    'oklch(0.78 0.24 160)',
  ]

  return (
    <section className="min-h-screen flex items-center justify-center py-20 pt-32 md:pt-40 relative border-t border-b"
      style={{ 
        borderColor: 'oklch(0.75 0.25 200 / 0.2)',
        borderTopWidth: '1px',
        borderBottomWidth: '1px',
      }}
    >
      <div className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, oklch(0.75 0.25 200 / 0.2), transparent 70%)',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance neon-glow"
            style={{ color: 'oklch(0.95 0.01 200)' }}
          >
            Dashboard de Estadísticas y Métricas
          </h2>
          <p className="text-lg text-pretty leading-relaxed"
            style={{ color: 'oklch(0.7 0.05 200)' }}
          >
            Visualiza métricas clave del crecimiento bacteriano. Filtra por temperatura y medio para análisis comparativos.
          </p>
        </motion.div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <Card className="glass neon-border">
              <CardContent className="py-12 text-center">
                <motion.div
                  className="inline-block rounded-full border-4 border-current border-t-transparent"
                  style={{ 
                    color: 'oklch(0.75 0.25 200)',
                    width: '48px',
                    height: '48px',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <p className="mt-4" style={{ color: 'oklch(0.7 0.05 200)' }}>
                  Cargando métricas...
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {error && (
          <Card className="glass border-red-500/50 mb-6">
            <CardContent className="py-6">
              <p style={{ color: 'oklch(0.7 0.05 200)' }}>
                Error al cargar los datos: {error}
              </p>
            </CardContent>
          </Card>
        )}

        {!loading && !error && metrics && (
          <div className="space-y-8">
            {/* Filtros */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass neon-border"
                style={{
                  borderColor: 'oklch(0.75 0.25 200 / 0.5)',
                }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"
                    style={{ color: 'oklch(0.95 0.01 200)' }}
                  >
                    <BarChart3 className="h-5 w-5" style={{ color: 'oklch(0.75 0.25 200)' }} />
                    Filtros de Análisis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm" style={{ color: 'oklch(0.95 0.01 200)' }}>
                        Temperatura
                      </label>
                      <Select value={selectedTemperature} onValueChange={setSelectedTemperature}>
                        <SelectTrigger className="glass border"
                          style={{ borderColor: 'oklch(0.75 0.25 200 / 0.5)' }}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass border"
                          style={{ borderColor: 'oklch(0.75 0.25 200 / 0.5)' }}
                        >
                          <SelectItem value="all">Todas las temperaturas</SelectItem>
                          <SelectItem value="25">25°C</SelectItem>
                          <SelectItem value="30">30°C</SelectItem>
                          <SelectItem value="37">37°C</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm" style={{ color: 'oklch(0.95 0.01 200)' }}>
                        Medio
                      </label>
                      <Select value={selectedMedium} onValueChange={setSelectedMedium}>
                        <SelectTrigger className="glass border"
                          style={{ borderColor: 'oklch(0.75 0.25 200 / 0.5)' }}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass border"
                          style={{ borderColor: 'oklch(0.75 0.25 200 / 0.5)' }}
                        >
                          <SelectItem value="all">Todos los medios</SelectItem>
                          <SelectItem value="rich">Rico</SelectItem>
                          <SelectItem value="limited">Limitado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Métricas principales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid md:grid-cols-3 gap-6"
            >
              <Card className="glass neon-border"
                style={{
                  borderColor: 'oklch(0.75 0.25 200 / 0.5)',
                  boxShadow: '0 0 20px oklch(0.75 0.25 200 / 0.2)',
                }}
              >
                <CardContent className="py-6">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="h-8 w-8" style={{ color: 'oklch(0.75 0.25 200)' }} />
                  </div>
                  <div className="text-3xl font-bold neon-glow mb-2" style={{ color: 'oklch(0.75 0.25 200)' }}>
                    {metrics.avgGrowthRate.toFixed(6)}
                  </div>
                  <p className="text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>
                    Tasa de Crecimiento Promedio
                  </p>
                </CardContent>
              </Card>

              <Card className="glass neon-border"
                style={{
                  borderColor: 'oklch(0.7 0.28 320 / 0.5)',
                  boxShadow: '0 0 20px oklch(0.7 0.28 320 / 0.2)',
                }}
              >
                <CardContent className="py-6">
                  <div className="flex items-center justify-between mb-4">
                    <Activity className="h-8 w-8" style={{ color: 'oklch(0.7 0.28 320)' }} />
                  </div>
                  <div className="text-3xl font-bold neon-glow mb-2" style={{ color: 'oklch(0.7 0.28 320)' }}>
                    {metrics.avgGrowth24h.toFixed(1)}%
                  </div>
                  <p className="text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>
                    Crecimiento en 24 horas
                  </p>
                </CardContent>
              </Card>

              <Card className="glass neon-border"
                style={{
                  borderColor: 'oklch(0.8 0.22 140 / 0.5)',
                  boxShadow: '0 0 20px oklch(0.8 0.22 140 / 0.2)',
                }}
              >
                <CardContent className="py-6">
                  <div className="flex items-center justify-between mb-4">
                    <Zap className="h-8 w-8" style={{ color: 'oklch(0.8 0.22 140)' }} />
                  </div>
                  <div className="text-3xl font-bold neon-glow mb-2" style={{ color: 'oklch(0.8 0.22 140)' }}>
                    {metrics.totalClusters}
                  </div>
                  <p className="text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>
                    Clusters Analizados
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Gráfico de tendencias */}
            {trendData.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="glass neon-border"
                  style={{
                    borderColor: 'oklch(0.75 0.25 200 / 0.5)',
                  }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"
                      style={{ color: 'oklch(0.95 0.01 200)' }}
                    >
                      <TrendingUp className="h-5 w-5" style={{ color: 'oklch(0.75 0.25 200)' }} />
                      Tendencias de Crecimiento
                    </CardTitle>
                    <CardDescription style={{ color: 'oklch(0.7 0.05 200)' }}>
                      Comparación de patrones de crecimiento por cluster
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData}>
                          <CartesianGrid strokeDasharray="3 3" 
                            stroke="oklch(0.3 0.1 200 / 0.3)" 
                          />
                          <XAxis 
                            dataKey="time" 
                            label={{ value: 'Tiempo (horas)', position: 'insideBottom', offset: -5 }}
                            stroke="oklch(0.7 0.05 200)"
                          />
                          <YAxis 
                            label={{ value: 'Crecimiento Normalizado', angle: -90, position: 'insideLeft' }}
                            domain={[0, 1]}
                            stroke="oklch(0.7 0.05 200)"
                          />
                          <Tooltip 
                            contentStyle={{
                              background: 'oklch(0.12 0.04 240 / 0.95)',
                              border: '1px solid oklch(0.75 0.25 200 / 0.5)',
                              borderRadius: '8px',
                              color: 'oklch(0.95 0.01 200)',
                            }}
                          />
                          <Legend />
                          {filteredClusters.map((option, index) => {
                            const label = `${option.temperature}°C - ${option.medium === 'rico' ? 'Rico' : 'Limitado'}`
                            return (
                              <Line
                                key={option.id}
                                type="monotone"
                                dataKey={label}
                                stroke={colors[index % colors.length]}
                                strokeWidth={2}
                                dot={false}
                                name={label}
                              />
                            )
                          })}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Comparación entre clusters */}
            {metrics.clusterComparison.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="glass neon-border"
                  style={{
                    borderColor: 'oklch(0.7 0.28 320 / 0.5)',
                  }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"
                      style={{ color: 'oklch(0.95 0.01 200)' }}
                    >
                      <BarChart3 className="h-5 w-5" style={{ color: 'oklch(0.7 0.28 320)' }} />
                      Comparación entre Clusters
                    </CardTitle>
                    <CardDescription style={{ color: 'oklch(0.7 0.05 200)' }}>
                      Tasas de crecimiento por condición ambiental
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={metrics.clusterComparison}>
                          <CartesianGrid strokeDasharray="3 3" 
                            stroke="oklch(0.3 0.1 200 / 0.3)" 
                          />
                          <XAxis 
                            dataKey="name" 
                            stroke="oklch(0.7 0.05 200)"
                            angle={-45}
                            textAnchor="end"
                            height={100}
                          />
                          <YAxis 
                            stroke="oklch(0.7 0.05 200)"
                          />
                          <Tooltip 
                            contentStyle={{
                              background: 'oklch(0.12 0.04 240 / 0.95)',
                              border: '1px solid oklch(0.7 0.28 320 / 0.5)',
                              borderRadius: '8px',
                              color: 'oklch(0.95 0.01 200)',
                            }}
                          />
                          <Legend />
                          <Bar dataKey="growthRate" fill="oklch(0.75 0.25 200)" name="Tasa de Crecimiento" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

