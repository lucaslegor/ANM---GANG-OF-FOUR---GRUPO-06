'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Line, Points, Text } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

interface GrowthChart3DProps {
  data: Array<{ time: number; growth: number }>
  experimentalData: Array<{ time: number; growth: number }>
  color: string
  isFullscreen?: boolean
}

function GrowthCurve3D({ data, experimentalData, color, hoveredPoint }: { 
  data: Array<{ time: number; growth: number }>
  experimentalData: Array<{ time: number; growth: number }>
  color: string
  hoveredPoint: number | null
}) {
  const lineRef = useRef<any>(null)
  const pointsRef = useRef<any>(null)

  // Convertir color hex a RGB para Three.js
  const rgbColor = useMemo(() => {
    const hex = color.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16) / 255
    const g = parseInt(hex.substring(2, 4), 16) / 255
    const b = parseInt(hex.substring(4, 6), 16) / 255
    return new (THREE as any).Color(r, g, b)
  }, [color])

  // Normalizar datos para el espacio 3D
  const normalizedData = useMemo(() => {
    if (data.length === 0) return []
    const maxTime = Math.max(...data.map(d => d.time))
    const minTime = Math.min(...data.map(d => d.time))
    const timeRange = maxTime - minTime || 1

    return data.map((point, index) => {
      const x = ((point.time - minTime) / timeRange) * 10 - 5
      const y = point.growth * 5
      const z = Math.sin(index * 0.1) * 0.5 // Efecto de profundidad
      return new (THREE as any).Vector3(x, y, z)
    })
  }, [data])

  const experimentalPoints = useMemo(() => {
    if (experimentalData.length === 0) return []
    const maxTime = Math.max(...data.map(d => d.time), ...experimentalData.map(d => d.time))
    const minTime = Math.min(...data.map(d => d.time), ...experimentalData.map(d => d.time))
    const timeRange = maxTime - minTime || 1

    return experimentalData.map((point, index) => {
      const x = ((point.time - minTime) / timeRange) * 10 - 5
      const y = point.growth * 5
      const z = Math.sin(index * 0.1) * 0.5
      return new (THREE as any).Vector3(x, y, z)
    })
  }, [experimentalData, data])

  // Animación de la curva (optimizada)
  useFrame(() => {
    // Reducir velocidad de rotación para mejor rendimiento
    if (lineRef.current?.rotation) {
      lineRef.current.rotation.y += 0.0005
    }
    if (pointsRef.current?.rotation) {
      pointsRef.current.rotation.y += 0.0005
    }
  })

  return (
    <group>
      {/* Curva ajustada */}
      {normalizedData.length > 0 && (
        <Line
          ref={lineRef}
          points={normalizedData}
          color={rgbColor}
          lineWidth={3}
        />
      )}

      {/* Puntos experimentales - Ocultos para cumplir con requisitos de confidencialidad */}
      {/* {experimentalPoints.length > 0 && (
        <Points ref={pointsRef} positions={experimentalPoints.map(p => [p.x, p.y, p.z]).flat()}>
          <pointsMaterial
            size={0.2}
            color={rgbColor}
            transparent
            opacity={0.9}
            sizeAttenuation
          />
        </Points>
      )} */}

      {/* Grid de fondo */}
      <primitive object={new (THREE as any).GridHelper(10, 20, rgbColor, rgbColor)} position={[0, 0, -2]} />
    </group>
  )
}

export function GrowthChart3D({ data, experimentalData, color, isFullscreen }: GrowthChart3DProps) {
  const hexColor = useMemo(() => {
    // Mapeo de colores oklch conocidos a hex
    const colorMap: Record<string, string> = {
      'oklch(0.75 0.25 200)': '#00d9ff', // cyan
      'oklch(0.7 0.28 320)': '#ff00ff',   // magenta
      'oklch(0.8 0.22 140)': '#00ff88',   // green
      'oklch(0.65 0.25 240)': '#0066ff',  // blue
      'oklch(0.72 0.26 280)': '#aa00ff',  // purple
      'oklch(0.78 0.24 160)': '#00ffaa',  // aqua
    }
    
    return colorMap[color] || '#00d9ff'
  }, [color])

  return (
    <motion.div
      className={`w-full ${isFullscreen ? 'h-screen' : 'h-96'} relative`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <primitive object={new (THREE as any).AmbientLight(0xffffff, 0.5)} />
        <primitive object={new (THREE as any).PointLight(hexColor, 1, 100)} position={[10, 10, 10]} />
        <primitive object={new (THREE as any).PointLight(hexColor, 0.5, 100)} position={[-10, -10, -10]} />
        
        <GrowthCurve3D 
          data={data} 
          experimentalData={experimentalData} 
          color={hexColor}
          hoveredPoint={null}
        />
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={20}
        />
        
        <primitive object={new (THREE as any).AxesHelper(5)} />
      </Canvas>
    </motion.div>
  )
}

