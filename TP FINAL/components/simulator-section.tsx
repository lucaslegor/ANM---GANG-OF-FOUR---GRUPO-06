'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Calculator, TrendingUp, BarChart3, AlertCircle, Maximize2, Minimize2, Zap, Sparkles, Scan } from 'lucide-react'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Scatter } from 'recharts'
import { useGrowthData } from '@/lib/use-growth-data'
import { CLUSTER_OPTIONS, predictGrowth, calculateGrowthRate } from '@/lib/data-processor'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { ParticleBackgroundSimulator } from './particle-background-simulator'
import { ARQRModal } from './ar-qr-modal'

// Lazy load del componente 3D para mejor rendimiento
const GrowthChart3D = dynamic(() => import('./growth-chart-3d').then(mod => ({ default: mod.GrowthChart3D })), {
  loading: () => (
    <div className="h-96 w-full flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-current border-t-transparent rounded-full animate-spin mx-auto mb-4"
          style={{ color: 'oklch(0.75 0.25 200)' }}
        />
        <p style={{ color: 'oklch(0.7 0.05 200)' }}>Cargando visualización 3D...</p>
      </div>
    </div>
  ),
  ssr: false, // No renderizar en servidor
})

export function SimulatorSection() {
  const { clusters, loading, error, getClusterById } = useGrowthData()
  const [selectedCluster, setSelectedCluster] = useState<string>('25-rich')
  const [t1, setT1] = useState<string>('2')
  const [t2, setT2] = useState<string>('4')
  const [projectionTime, setProjectionTime] = useState<string>('12')
  const [showResults, setShowResults] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('3d')
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null)
  const [showARModal, setShowARModal] = useState(false)

  const clusterData = getClusterById(selectedCluster)
  const clusterOption = useMemo(() => 
    CLUSTER_OPTIONS.find(opt => opt.id === selectedCluster),
    [selectedCluster]
  )

  // Memoizar datos del gráfico - solo recalcular cuando cambian las dependencias
  const { chartData, experimentalData, chart3DData, experimental3DData } = useMemo(() => {
    const chartDataResult: Array<{
      time: number
      experimental: number | null
      fitted: number | null
    }> = []

    const experimentalDataResult: Array<{
      time: number
      experimental: number
      fitted: number
    }> = []

    const chart3DDataResult: Array<{ time: number; growth: number }> = []
    const experimental3DDataResult: Array<{ time: number; growth: number }> = []

    if (clusterData && clusterData.model) {
      const { dataPoints, model } = clusterData
      
      // Obtener rango de tiempos
      const minTime = Math.min(...dataPoints.map(p => p.time))
      const maxTime = Math.max(...dataPoints.map(p => p.time))
      const projectionMaxTime = Math.max(maxTime, parseFloat(projectionTime) || maxTime)
      
      // Reducir puntos para mejor rendimiento (150 en lugar de 300)
      const step = (projectionMaxTime - minTime) / 150
      for (let t = minTime; t <= projectionMaxTime; t += step) {
        const fitted = predictGrowth(model, t)
        chartDataResult.push({
          time: t,
          experimental: null,
          fitted: fitted,
        })
        chart3DDataResult.push({ time: t, growth: fitted })
      }
      
      // Agregar puntos experimentales
      for (const point of dataPoints) {
        experimentalDataResult.push({
          time: point.time,
          experimental: point.growth,
          fitted: predictGrowth(model, point.time),
        })
        experimental3DDataResult.push({ time: point.time, growth: point.growth })
      }
      
      // Ordenar por tiempo
      chartDataResult.sort((a, b) => a.time - b.time)
      experimentalDataResult.sort((a, b) => a.time - b.time)
      chart3DDataResult.sort((a, b) => a.time - b.time)
      experimental3DDataResult.sort((a, b) => a.time - b.time)
    }

    return {
      chartData: chartDataResult,
      experimentalData: experimentalDataResult,
      chart3DData: chart3DDataResult,
      experimental3DData: experimental3DDataResult,
    }
  }, [clusterData, projectionTime])

  const handleCalculate = useCallback(async () => {
    setIsCalculating(true)
    // Reducir tiempo de animación para mejor UX
    await new Promise(resolve => setTimeout(resolve, 400))
    setIsCalculating(false)
    setShowResults(true)
  }, [])

  // Memoizar resultados del cálculo
  const results = useMemo(() => {
    if (!showResults || !clusterData?.model) return null

    const time1 = parseFloat(t1)
    const time2 = parseFloat(t2)
    const projTime = parseFloat(projectionTime)

    if (isNaN(time1) || isNaN(time2) || isNaN(projTime)) return null

    const growth1 = predictGrowth(clusterData.model, time1)
    const growth2 = predictGrowth(clusterData.model, time2)
    const projectedGrowth = predictGrowth(clusterData.model, projTime)
    const rate = calculateGrowthRate(clusterData.model, time1, time2)

    return {
      growth1,
      growth2,
      projectedGrowth,
      rate,
    }
  }, [showResults, clusterData, t1, t2, projectionTime])

  const colors = {
    '25-rich': 'oklch(0.75 0.25 200)',
    '25-limited': 'oklch(0.7 0.28 320)',
    '30-rich': 'oklch(0.8 0.22 140)',
    '30-limited': 'oklch(0.65 0.25 240)',
    '37-rich': 'oklch(0.72 0.26 280)',
    '37-limited': 'oklch(0.78 0.24 160)',
  }

  const currentColor = colors[selectedCluster as keyof typeof colors] || 'oklch(0.75 0.25 200)'

  // Efecto de sonido (opcional - solo visual por ahora)
  useEffect(() => {
    if (showResults && results) {
      // Aquí se podría agregar un sonido futurista
    }
  }, [showResults, results])

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center py-20 pt-32 md:pt-40 relative border-t border-b overflow-hidden"
      style={{ 
        borderColor: 'oklch(0.75 0.25 200 / 0.2)',
        borderTopWidth: '1px',
        borderBottomWidth: '1px',
      }}
    >
      <ParticleBackgroundSimulator />
      
      <div className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 70% 50%, ${currentColor} / 0.3, transparent 70%)`,
        }}
      />
      
      <div className={`container mx-auto px-4 relative z-10 ${isFullscreen ? 'max-w-full h-screen' : 'max-w-7xl'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-balance neon-glow"
            style={{ color: 'oklch(0.95 0.01 200)' }}
            animate={{ 
              textShadow: [
                `0 0 10px ${currentColor}`,
                `0 0 20px ${currentColor}, 0 0 30px ${currentColor}`,
                `0 0 10px ${currentColor}`,
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Simulador Interactivo
          </motion.h2>
          <p className="text-lg text-pretty leading-relaxed"
            style={{ color: 'oklch(0.7 0.05 200)' }}
          >
            Visualiza modelos de crecimiento y calcula métricas basadas en ajustes por mínimos cuadrados.
          </p>
        </motion.div>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-20"
          >
            <Card className="glass neon-border">
              <CardContent className="py-12 text-center">
                <motion.div
                  className="inline-block rounded-full border-4 border-current border-t-transparent"
                  style={{ 
                    color: currentColor,
                    width: '48px',
                    height: '48px',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <motion.p 
                  className="mt-4"
                  style={{ color: 'oklch(0.7 0.05 200)' }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Cargando datos y ajustando modelos...
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Alert className="mb-6 glass border-red-500/50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription style={{ color: 'oklch(0.7 0.05 200)' }}>
                Error al cargar los datos: {error}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {!loading && !error && (
          <div className="space-y-8">
            {/* Selector de Cluster con animación */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass neon-border relative overflow-hidden"
                style={{
                  borderColor: `${currentColor} / 0.5`,
                  boxShadow: `0 0 30px ${currentColor} / 0.3`,
                }}
              >
                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${currentColor} / 0.3, transparent)`,
                  }}
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <CardHeader className="relative z-10 pb-4">
                  <CardTitle className="flex items-center gap-2"
                    style={{ color: 'oklch(0.95 0.01 200)' }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      <BarChart3 className="h-5 w-5" style={{ color: currentColor }} />
                    </motion.div>
                    Selección de Cluster
                  </CardTitle>
                  <CardDescription className="mt-2" style={{ color: 'oklch(0.7 0.05 200)' }}>
                    Elige un cluster para visualizar su modelo de crecimiento
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 pt-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Select value={selectedCluster} onValueChange={setSelectedCluster}>
                      <SelectTrigger className="glass border transition-all duration-300"
                        style={{ 
                          borderColor: `${currentColor} / 0.5`,
                          boxShadow: `0 0 15px ${currentColor} / 0.3`,
                        }}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass border"
                        style={{ borderColor: `${currentColor} / 0.5` }}
                      >
                        {CLUSTER_OPTIONS.map(option => (
                          <SelectItem 
                            key={option.id} 
                            value={option.id}
                            className="transition-all duration-200 hover:bg-opacity-20"
                            style={{
                              '--hover-bg': `${currentColor} / 0.2`,
                            } as React.CSSProperties}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {clusterData && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-6 grid md:grid-cols-3 gap-4"
                    >
                      {[
                        { label: 'Coeficiente de Determinación', value: clusterData.rSquared, unit: 'R²' },
                        { label: 'RMSE', value: clusterData.rmse, unit: '' },
                        { label: 'Puntos de Datos', value: clusterData.dataPoints.length, unit: '' },
                      ].map((metric, index) => (
                        <motion.div
                          key={index}
                          className="glass p-4 rounded-lg border relative overflow-hidden cursor-pointer"
                          style={{ 
                            borderColor: `${currentColor} / 0.3`,
                          }}
                          onHoverStart={() => setHoveredMetric(`${index}`)}
                          onHoverEnd={() => setHoveredMetric(null)}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: `0 0 20px ${currentColor} / 0.5`,
                          }}
                        >
                          <motion.div
                            className="absolute inset-0"
                            style={{
                              background: `linear-gradient(135deg, ${currentColor} / 0.1, transparent)`,
                            }}
                            animate={{
                              opacity: hoveredMetric === `${index}` ? 1 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          />
                          <div className="relative z-10">
                            <div className="text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>
                              {metric.label}
                            </div>
                            <motion.div
                              className="text-2xl font-bold neon-glow mt-1"
                              style={{ color: currentColor }}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                            >
                              {metric.value ? metric.value.toFixed(4) : 'N/A'} {metric.unit}
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Gráfico con modo 2D/3D */}
            {clusterData && clusterData.model && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="glass neon-border relative overflow-hidden"
                  style={{
                    borderColor: `${currentColor} / 0.5`,
                    boxShadow: `0 0 40px ${currentColor} / 0.3`,
                  }}
                >
                  <CardHeader className="relative z-10 pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        >
                          <TrendingUp className="h-5 w-5" style={{ color: currentColor }} />
                        </motion.div>
                        <CardTitle className="text-lg sm:text-xl" style={{ color: 'oklch(0.95 0.01 200)' }}>
                          Curva de Crecimiento Ajustada
                        </CardTitle>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setViewMode(viewMode === '3d' ? '2d' : '3d')}
                          className="glass px-3 py-1.5 rounded border transition-all text-sm font-medium"
                          style={{ 
                            borderColor: `${currentColor} / 0.5`,
                            color: currentColor,
                            background: viewMode === '3d' ? `${currentColor} / 0.1` : 'transparent',
                          }}
                        >
                          {viewMode === '3d' ? '3D' : '2D'}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={toggleFullscreen}
                          className="glass px-3 py-1.5 rounded border transition-all"
                          style={{ 
                            borderColor: `${currentColor} / 0.5`,
                            color: currentColor,
                          }}
                          title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
                        >
                          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setShowARModal(true)}
                          className="glass px-3 py-1.5 rounded border transition-all"
                          style={{ 
                            borderColor: `${currentColor} / 0.5`,
                            color: currentColor,
                            boxShadow: `0 0 15px ${currentColor} / 0.5`,
                          }}
                          title="Ver en Realidad Aumentada"
                        >
                          <Scan className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                    <CardDescription className="mt-2" style={{ color: 'oklch(0.7 0.05 200)' }}>
                      Datos experimentales y curva ajustada por mínimos cuadrados
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10 pt-4">
                    {viewMode === '3d' ? (
                      <div className="h-96 w-full">
                        <GrowthChart3D
                          data={chart3DData}
                          experimentalData={experimental3DData}
                          color={currentColor}
                          isFullscreen={isFullscreen}
                        />
                      </div>
                    ) : (
                      <div className="h-96 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart>
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
                                border: `1px solid ${currentColor} / 0.5`,
                                borderRadius: '8px',
                                color: 'oklch(0.95 0.01 200)',
                              }}
                            />
                            <Legend />
                            <Line 
                              data={chartData}
                              type="monotone" 
                              dataKey="fitted" 
                              name="Curva Ajustada" 
                              stroke={currentColor}
                              strokeWidth={3}
                              dot={false}
                              connectNulls
                              animationDuration={1000}
                            />
                            <Scatter 
                              data={experimentalData}
                              dataKey="experimental" 
                              name="Datos Experimentales"
                              fill={currentColor}
                              shape="circle"
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Cálculos con animaciones */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="glass neon-border relative overflow-hidden"
                style={{
                  borderColor: `${currentColor} / 0.5`,
                  boxShadow: `0 0 30px ${currentColor} / 0.3`,
                }}
              >
                <CardHeader className="relative z-10 pb-4">
                  <CardTitle className="flex items-center gap-2"
                    style={{ color: 'oklch(0.95 0.01 200)' }}
                  >
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Calculator className="h-5 w-5" style={{ color: currentColor }} />
                    </motion.div>
                    Cálculo de Métricas
                  </CardTitle>
                  <CardDescription className="mt-2" style={{ color: 'oklch(0.7 0.05 200)' }}>
                    Calcula tasas de crecimiento y proyecciones futuras
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10 pt-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { id: 't1', label: 'Tiempo inicial t₁ (horas)', value: t1, setValue: setT1 },
                      { id: 't2', label: 'Tiempo final t₂ (horas)', value: t2, setValue: setT2 },
                      { id: 'projection', label: 'Proyección (horas)', value: projectionTime, setValue: setProjectionTime },
                    ].map((input, index) => (
                      <motion.div
                        key={input.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="space-y-2"
                      >
                        <Label htmlFor={input.id} style={{ color: 'oklch(0.95 0.01 200)' }}>
                          {input.label}
                        </Label>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Input
                            id={input.id}
                            type="number"
                            step="0.1"
                            value={input.value}
                            onChange={(e) => input.setValue(e.target.value)}
                            className="glass border transition-all duration-300"
                            style={{ 
                              borderColor: `${currentColor} / 0.3`,
                              focusBorderColor: currentColor,
                            }}
                          />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleCalculate}
                        disabled={isCalculating}
                        className="w-full neon-border relative overflow-hidden"
                        style={{
                          background: isCalculating 
                            ? `linear-gradient(135deg, ${currentColor} / 0.5, ${colors['30-rich']} / 0.5)`
                            : `linear-gradient(135deg, ${currentColor}, ${colors['30-rich']})`,
                          color: 'oklch(0.98 0 0)',
                          boxShadow: `0 0 20px ${currentColor} / 0.5`,
                        }}
                      >
                        {isCalculating ? (
                          <motion.div
                            className="flex items-center gap-2"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                              <Zap className="h-5 w-5" />
                            </motion.div>
                            Calculando...
                          </motion.div>
                        ) : (
                          <>
                            <Calculator className="mr-2 h-5 w-5" />
                            Calcular Métricas
                          </>
                        )}
                        {isCalculating && (
                          <motion.div
                            className="absolute inset-0"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${currentColor} / 0.5, transparent)`,
                            }}
                            animate={{
                              x: ['-100%', '200%'],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                          />
                        )}
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={() => setShowARModal(true)}
                        className="w-full neon-border relative overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${colors['30-rich']}, ${currentColor})`,
                          color: 'oklch(0.98 0 0)',
                          boxShadow: `0 0 20px ${currentColor} / 0.5`,
                        }}
                      >
                        <Scan className="mr-2 h-5 w-5" />
                        Ver en Realidad Aumentada
                      </Button>
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {results && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="grid md:grid-cols-2 gap-4 mt-6"
                      >
                        <motion.div
                          className="glass p-6 rounded-lg border relative overflow-hidden"
                          style={{ borderColor: `${currentColor} / 0.3` }}
                          whileHover={{ scale: 1.02, boxShadow: `0 0 30px ${currentColor} / 0.5` }}
                        >
                          <motion.div
                            className="absolute inset-0"
                            style={{
                              background: `radial-gradient(circle at center, ${currentColor} / 0.1, transparent)`,
                            }}
                            animate={{
                              scale: [1, 1.1, 1],
                              opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <div className="relative z-10">
                            <h4 className="font-semibold mb-4 flex items-center gap-2"
                              style={{ color: 'oklch(0.95 0.01 200)' }}
                            >
                              <Sparkles className="h-4 w-4" style={{ color: currentColor }} />
                              Tasa de Crecimiento
                            </h4>
                            <div className="space-y-2">
                              {[
                                { label: 'g(t₁):', value: results.growth1 },
                                { label: 'g(t₂):', value: results.growth2 },
                              ].map((item, index) => (
                                <motion.div
                                  key={index}
                                  className="flex justify-between"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.6 + index * 0.1 }}
                                >
                                  <span style={{ color: 'oklch(0.7 0.05 200)' }}>{item.label}</span>
                                  <span className="font-mono" style={{ color: currentColor }}>
                                    {item.value.toFixed(4)}
                                  </span>
                                </motion.div>
                              ))}
                              <motion.div
                                className="pt-2 border-t"
                                style={{ borderColor: `${currentColor} / 0.3` }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                              >
                                <div className="flex justify-between items-center">
                                  <span className="font-semibold" style={{ color: 'oklch(0.95 0.01 200)' }}>
                                    Tasa:
                                  </span>
                                  <motion.span
                                    className="text-2xl font-bold neon-glow"
                                    style={{ color: currentColor }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.9, type: 'spring' }}
                                  >
                                    {results.rate.toFixed(6)}
                                  </motion.span>
                                </div>
                                <div className="text-xs mt-1" style={{ color: 'oklch(0.6 0.05 200)' }}>
                                  (g(t₂) - g(t₁)) / (t₂ - t₁)
                                </div>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          className="glass p-6 rounded-lg border relative overflow-hidden"
                          style={{ borderColor: `${currentColor} / 0.3` }}
                          whileHover={{ scale: 1.02, boxShadow: `0 0 30px ${currentColor} / 0.5` }}
                        >
                          <motion.div
                            className="absolute inset-0"
                            style={{
                              background: `radial-gradient(circle at center, ${currentColor} / 0.1, transparent)`,
                            }}
                            animate={{
                              scale: [1, 1.1, 1],
                              opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          />
                          <div className="relative z-10">
                            <h4 className="font-semibold mb-4 flex items-center gap-2"
                              style={{ color: 'oklch(0.95 0.01 200)' }}
                            >
                              <TrendingUp className="h-4 w-4" style={{ color: currentColor }} />
                              Proyección de Crecimiento
                            </h4>
                            <div className="space-y-2">
                              <motion.div
                                className="flex justify-between"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 }}
                              >
                                <span style={{ color: 'oklch(0.7 0.05 200)' }}>Tiempo:</span>
                                <span className="font-mono" style={{ color: currentColor }}>
                                  {projectionTime} horas
                                </span>
                              </motion.div>
                              <motion.div
                                className="pt-2 border-t"
                                style={{ borderColor: `${currentColor} / 0.3` }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                              >
                                <div className="flex justify-between items-center">
                                  <span className="font-semibold" style={{ color: 'oklch(0.95 0.01 200)' }}>
                                    Crecimiento Proyectado:
                                  </span>
                                  <motion.span
                                    className="text-2xl font-bold neon-glow"
                                    style={{ color: currentColor }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 1.3, type: 'spring' }}
                                  >
                                    {results.projectedGrowth.toFixed(4)}
                                  </motion.span>
                                </div>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Modal de Realidad Aumentada */}
        <ARQRModal
          isOpen={showARModal}
          onClose={() => setShowARModal(false)}
          clusterId={selectedCluster}
          t1={t1}
          t2={t2}
          projectionTime={projectionTime}
          color={currentColor}
        />
      </div>
    </section>
  )
}
