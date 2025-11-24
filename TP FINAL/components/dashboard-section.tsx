'use client'

/**
 * Dashboard Section - Visualización de métricas y análisis
 * 
 * Muestra estadísticas generales y comparaciones entre clústeres
 * utilizando los modelos de regresión segmentada
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BarChart3, TrendingUp, Activity, Zap, Clock, Target } from 'lucide-react'
import { useState, useMemo } from 'react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts'
import { useGrowthData } from '@/lib/use-growth-data'
import { CLUSTER_OPTIONS, predictGrowth, calculateGrowthRate } from '@/lib/data-processor'
import { motion, AnimatePresence } from 'framer-motion'

export function DashboardSection() {
  const { clusters, loading, error } = useGrowthData()
  const [selectedTemperature, setSelectedTemperature] = useState<string>('all')
  const [selectedMedium, setSelectedMedium] = useState<string>('all')

  // Filtrar clusters según los parámetros seleccionados
  const filteredClusters = useMemo(() => {
    return CLUSTER_OPTIONS.filter(option => {
      const tempMatch = selectedTemperature === 'all' || option.temperature === parseInt(selectedTemperature)
      const mediumMatch = selectedMedium === 'all' || option.medium === selectedMedium
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

    // Calcular tasas de crecimiento promedio (entre 2h y 4h)
    const growthRates = filteredClusterData.map(cluster => {
      if (!cluster.model) return 0
      return calculateGrowthRate(cluster.model, 2, 4) // horas
    })

    const avgGrowthRate = growthRates.reduce((a, b) => a + b, 0) / growthRates.length

    // Calcular crecimiento en diferentes periodos
    const growth12h = filteredClusterData.map(cluster => {
      if (!cluster.model) return 0
      const growth0 = predictGrowth(cluster.model, 0)
      const growth12 = predictGrowth(cluster.model, 12) // 12 horas
      if (growth0 === 0) return 0
      return ((growth12 - growth0) / growth0) * 100
    })

    const avgGrowth12h = growth12h.reduce((a, b) => a + b, 0) / growth12h.length

    // Tiempo crítico promedio
    const avgCriticalTime = filteredClusterData.reduce((sum, cluster) => 
      sum + cluster.model.t_crit, 0
    ) / filteredClusterData.length

    // R² promedio
    const avgRSquared = filteredClusterData.reduce((sum, cluster) => 
      sum + cluster.rSquared, 0
    ) / filteredClusterData.length

    // Comparación entre clusters
    const clusterComparison = filteredClusterData.map((cluster, index) => {
      const option = filteredClusters[index]
      return {
        name: option ? `${option.temperature}°C - ${option.medium === 'rico' ? 'Rico' : 'Lim.'}` : `Cluster ${index + 1}`,
        growthRate: growthRates[index] || 0,
        growth12h: growth12h[index] || 0,
        rSquared: cluster.rSquared || 0,
        criticalTime: cluster.model.t_crit || 0,
        temperature: cluster.temperature,
        medium: cluster.medium,
      }
    })

    return {
      avgGrowthRate,
      avgGrowth12h,
      avgCriticalTime,
      avgRSquared,
      clusterComparison,
      totalClusters: filteredClusterData.length,
    }
  }, [clusters, selectedTemperature, selectedMedium, filteredClusters])

  // Datos para gráfico de tendencias
  const trendData = useMemo(() => {
    if (!clusters || clusters.size === 0) return []

    const data: Array<{ time: number; [key: string]: number | string }> = []
    const timePoints = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12] // horas

    timePoints.forEach(time => {
      const point: { time: number; [key: string]: number | string } = { time }
      
      filteredClusters.forEach(option => {
        const clusterKey = `${option.temperature}-${option.medium}`
        const cluster = clusters.get(clusterKey)
        if (!cluster || !cluster.model) return

        const growth = predictGrowth(cluster.model, time)
        const label = `${option.temperature}°C-${option.medium === 'rico' ? 'R' : 'L'}`
        point[label] = growth
      })

      data.push(point)
    })

    return data
  }, [clusters, filteredClusters])

  // Datos para gráfico de radar
  const radarData = useMemo(() => {
    if (!metrics) return []

    return metrics.clusterComparison.map(cluster => ({
      cluster: cluster.name,
      'Tasa Crecimiento': (cluster.growthRate * 100).toFixed(2),
      'R² (x100)': (cluster.rSquared * 100).toFixed(2),
      'Crecimiento 12h': Math.min(cluster.growth12h, 100),
    }))
  }, [metrics])

  const colors = {
    primary: 'oklch(0.75 0.25 200)',
    secondary: 'oklch(0.7 0.28 320)',
    accent: 'oklch(0.8 0.22 140)',
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-current border-t-transparent rounded-full animate-spin mx-auto mb-4"
            style={{ color: colors.primary }}
          />
          <p style={{ color: 'oklch(0.7 0.05 200)' }}>Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <Card className="glass border-red-500/50">
          <CardContent className="p-8 text-center">
            <p className="text-red-400">Error al cargar datos: {error}</p>
          </CardContent>
        </Card>
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
            Dashboard de Análisis
          </h2>
          <p className="text-lg leading-relaxed"
            style={{ color: 'oklch(0.7 0.05 200)' }}
          >
            Métricas y comparaciones de los modelos de regresión segmentada
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="glass neon-border">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'oklch(0.95 0.01 200)' }}>
                    Temperatura
                  </label>
                  <Select value={selectedTemperature} onValueChange={setSelectedTemperature}>
                    <SelectTrigger className="glass border" style={{ borderColor: `${colors.primary} / 0.5` }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass">
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="25">25°C</SelectItem>
                      <SelectItem value="30">30°C</SelectItem>
                      <SelectItem value="37">37°C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'oklch(0.95 0.01 200)' }}>
                    Medio de Cultivo
                  </label>
                  <Select value={selectedMedium} onValueChange={setSelectedMedium}>
                    <SelectTrigger className="glass border" style={{ borderColor: `${colors.primary} / 0.5` }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass">
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="rico">Rico</SelectItem>
                      <SelectItem value="limitado">Limitado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Métricas principales */}
        {metrics && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid md:grid-cols-4 gap-6 mb-8"
            >
              {[
                { 
                  label: 'Tasa de Crecimiento Promedio', 
                  value: (metrics.avgGrowthRate * 100).toFixed(4),
                  unit: '%/h',
                  icon: TrendingUp,
                  color: colors.primary,
                },
                { 
                  label: 'Crecimiento 12h', 
                  value: metrics.avgGrowth12h.toFixed(2),
                  unit: '%',
                  icon: Activity,
                  color: colors.secondary,
                },
                { 
                  label: 'Tiempo Crítico Promedio', 
                  value: metrics.avgCriticalTime.toFixed(2),
                  unit: 'h',
                  icon: Clock,
                  color: colors.accent,
                },
                { 
                  label: 'R² Promedio', 
                  value: metrics.avgRSquared.toFixed(4),
                  unit: '',
                  icon: Target,
                  color: colors.primary,
                },
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card className="glass neon-border hover:scale-105 transition-transform">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <metric.icon className="h-5 w-5" style={{ color: metric.color }} />
                        <p className="text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>
                          {metric.label}
                        </p>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold" style={{ color: metric.color }}>
                          {metric.value}
                        </span>
                        <span className="text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>
                          {metric.unit}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Gráficos */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Gráfico de Tendencias */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="glass neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: 'oklch(0.95 0.01 200)' }}>
                  <TrendingUp className="h-5 w-5" style={{ color: colors.primary }} />
                  Tendencias de Crecimiento
                </CardTitle>
                <CardDescription style={{ color: 'oklch(0.7 0.05 200)' }}>
                  Evolución del crecimiento normalizado en el tiempo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.1 200 / 0.3)" />
                      <XAxis 
                        dataKey="time"
                        label={{ value: 'Tiempo (h)', position: 'insideBottom', offset: -5 }}
                        stroke="oklch(0.7 0.05 200)"
                      />
                      <YAxis 
                        label={{ value: 'Crecimiento', angle: -90, position: 'insideLeft' }}
                        stroke="oklch(0.7 0.05 200)"
                      />
                      <Tooltip 
                        contentStyle={{
                          background: 'oklch(0.12 0.04 240 / 0.95)',
                          border: `1px solid ${colors.primary}`,
                          borderRadius: '8px',
                          color: 'oklch(0.95 0.01 200)',
                        }}
                      />
                      <Legend />
                      {filteredClusters.map((option, index) => {
                        const label = `${option.temperature}°C-${option.medium === 'rico' ? 'R' : 'L'}`
                        const colors = [
                          '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#ef4444'
                        ]
                        return (
                          <Line
                            key={option.id}
                            type="monotone"
                            dataKey={label}
                            stroke={colors[index % colors.length]}
                            strokeWidth={2}
                            dot={false}
                          />
                        )
                      })}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Gráfico de Barras - Tiempos Críticos */}
          {metrics && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="glass neon-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: 'oklch(0.95 0.01 200)' }}>
                    <BarChart3 className="h-5 w-5" style={{ color: colors.secondary }} />
                    Tiempos Críticos
                  </CardTitle>
                  <CardDescription style={{ color: 'oklch(0.7 0.05 200)' }}>
                    Comparación de tiempos de cambio de fase
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={metrics.clusterComparison}>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.1 200 / 0.3)" />
                        <XAxis 
                          dataKey="name"
                          stroke="oklch(0.7 0.05 200)"
                          angle={-45}
                          textAnchor="end"
                          height={100}
                        />
                        <YAxis 
                          label={{ value: 't_crit (h)', angle: -90, position: 'insideLeft' }}
                          stroke="oklch(0.7 0.05 200)"
                        />
                        <Tooltip 
                          contentStyle={{
                            background: 'oklch(0.12 0.04 240 / 0.95)',
                            border: `1px solid ${colors.secondary}`,
                            borderRadius: '8px',
                            color: 'oklch(0.95 0.01 200)',
                          }}
                        />
                        <Bar 
                          dataKey="criticalTime" 
                          fill={colors.secondary}
                          name="Tiempo Crítico"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Gráfico de Radar */}
          {radarData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="md:col-span-2"
            >
              <Card className="glass neon-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: 'oklch(0.95 0.01 200)' }}>
                    <Zap className="h-5 w-5" style={{ color: colors.accent }} />
                    Análisis Multidimensional
                  </CardTitle>
                  <CardDescription style={{ color: 'oklch(0.7 0.05 200)' }}>
                    Comparación de métricas clave entre clústeres
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="oklch(0.3 0.1 200 / 0.3)" />
                        <PolarAngleAxis 
                          dataKey="cluster" 
                          stroke="oklch(0.7 0.05 200)"
                        />
                        <PolarRadiusAxis stroke="oklch(0.7 0.05 200)" />
                        <Radar
                          name="Tasa Crecimiento"
                          dataKey="Tasa Crecimiento"
                          stroke={colors.primary}
                          fill={colors.primary}
                          fillOpacity={0.3}
                        />
                        <Radar
                          name="R² (x100)"
                          dataKey="R² (x100)"
                          stroke={colors.secondary}
                          fill={colors.secondary}
                          fillOpacity={0.3}
                        />
                        <Radar
                          name="Crecimiento 12h"
                          dataKey="Crecimiento 12h"
                          stroke={colors.accent}
                          fill={colors.accent}
                          fillOpacity={0.3}
                        />
                        <Legend />
                        <Tooltip 
                          contentStyle={{
                            background: 'oklch(0.12 0.04 240 / 0.95)',
                            border: `1px solid ${colors.accent}`,
                            borderRadius: '8px',
                            color: 'oklch(0.95 0.01 200)',
                          }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
