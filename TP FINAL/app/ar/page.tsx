'use client'

import { useEffect, useRef, useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'
import { CLUSTER_OPTIONS, predictGrowth } from '@/lib/data-processor'
import { useGrowthData } from '@/lib/use-growth-data'

// Componente para el gráfico 3D en AR
function ARGrowthCurve({ data, color }: { data: Array<{ time: number; growth: number }>, color: string }) {
  const meshRef = useRef<THREE.Group>(null)

  // Convertir color a RGB
  const rgbColor = useMemo(() => {
    const colorMap: Record<string, string> = {
      'oklch(0.75 0.25 200)': '#00d9ff',
      'oklch(0.7 0.28 320)': '#ff00ff',
      'oklch(0.8 0.22 140)': '#00ff88',
      'oklch(0.65 0.25 240)': '#0066ff',
      'oklch(0.72 0.26 280)': '#aa00ff',
      'oklch(0.78 0.24 160)': '#00ffaa',
    }
    const hex = colorMap[color] || '#00d9ff'
    const r = parseInt(hex.substring(1, 3), 16) / 255
    const g = parseInt(hex.substring(3, 5), 16) / 255
    const b = parseInt(hex.substring(5, 7), 16) / 255
    return new THREE.Color(r, g, b)
  }, [color])

  // Crear geometría de la curva
  const curveGeometry = useMemo(() => {
    if (data.length === 0) return null

    const maxTime = Math.max(...data.map(d => d.time))
    const minTime = Math.min(...data.map(d => d.time))
    const timeRange = maxTime - minTime || 1

    const points = data.map((point, index) => {
      const x = ((point.time - minTime) / timeRange) * 4 - 2
      const y = point.growth * 2
      const z = Math.sin(index * 0.1) * 0.3
      return new THREE.Vector3(x, y, z)
    })

    const curve = new THREE.CatmullRomCurve3(points)
    const geometry = new THREE.TubeGeometry(curve, 200, 0.05, 8, false)
    return geometry
  }, [data])

  return (
    <group ref={meshRef} position={[0, 0, -2]}>
      {curveGeometry && (
        <mesh geometry={curveGeometry}>
          <meshStandardMaterial
            color={rgbColor}
            emissive={rgbColor}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      )}
      {/* Ejes de referencia */}
      <axesHelper args={[2]} />
      {/* Grid de fondo */}
      <gridHelper args={[4, 20, rgbColor, rgbColor]} />
    </group>
  )
}

function ARPageContent() {
  const searchParams = useSearchParams()
  const [isARReady, setIsARReady] = useState(false)
  const [instructionsVisible, setInstructionsVisible] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const clusterId = searchParams.get('cluster') || '25-rich'
  const projectionTime = searchParams.get('projection') || '12'

  const { getClusterById } = useGrowthData()
  const clusterData = getClusterById(clusterId)
  const clusterOption = CLUSTER_OPTIONS.find(opt => opt.id === clusterId)

  const colors = {
    '25-rich': 'oklch(0.75 0.25 200)',
    '25-limited': 'oklch(0.7 0.28 320)',
    '30-rich': 'oklch(0.8 0.22 140)',
    '30-limited': 'oklch(0.65 0.25 240)',
    '37-rich': 'oklch(0.72 0.26 280)',
    '37-limited': 'oklch(0.78 0.24 160)',
  }

  const currentColor = colors[clusterId as keyof typeof colors] || 'oklch(0.75 0.25 200)'

  // Preparar datos para el gráfico
  const chartData = useMemo(() => {
    if (!clusterData?.model) return []
    
    const { dataPoints, model } = clusterData
    const minTime = Math.min(...dataPoints.map(p => p.time))
    const maxTime = Math.max(...dataPoints.map(p => p.time))
    const projectionMaxTime = Math.max(maxTime, parseFloat(projectionTime) || maxTime)
    
    const step = (projectionMaxTime - minTime) / 200
    const data: Array<{ time: number; growth: number }> = []
    
    for (let t = minTime; t <= projectionMaxTime; t += step) {
      data.push({
        time: t,
        growth: predictGrowth(model, t),
      })
    }
    
    return data
  }, [clusterData, projectionTime])

  // Inicializar cámara para AR (simplificado - usando canvas overlay)
  useEffect(() => {
    const initAR = async () => {
      try {
        // Solicitar acceso a la cámara
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        })
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        }
        
        setIsARReady(true)
      } catch (error) {
        console.error('Error accessing camera:', error)
        // Continuar sin cámara para desarrollo
        setIsARReady(true)
      }
    }

    initAR()

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach(track => track.stop())
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Video de la cámara (fondo) */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        style={{ transform: 'scaleX(-1)' }} // Espejo para mejor UX
      />

      {/* Canvas 3D superpuesto */}
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 1, 3], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, -5, -5]} intensity={0.5} />
          
          {chartData.length > 0 && (
            <ARGrowthCurve data={chartData} color={currentColor} />
          )}
          
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={10}
          />
        </Canvas>
      </div>

      {/* Instrucciones */}
      {instructionsVisible && (
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 glass border-t"
          style={{
            background: 'oklch(0.12 0.04 240 / 0.9)',
            borderTopColor: `${currentColor} / 0.5`,
          }}
        >
          <div className="max-w-md mx-auto text-center space-y-3">
            <h3 className="text-lg font-semibold" style={{ color: 'oklch(0.95 0.01 200)' }}>
              Gráfico de Crecimiento en AR
            </h3>
            <p className="text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>
              Usa tus dedos para rotar, acercar y mover el gráfico 3D
            </p>
            {clusterOption && (
              <p className="text-xs" style={{ color: 'oklch(0.6 0.05 200)' }}>
                Cluster: {clusterOption.label}
              </p>
            )}
            <button
              onClick={() => setInstructionsVisible(false)}
              className="mt-2 px-4 py-2 rounded glass border text-sm transition-all"
              style={{
                borderColor: `${currentColor} / 0.5`,
                color: currentColor,
              }}
            >
              Ocultar instrucciones
            </button>
          </div>
        </div>
      )}

      {/* Botón para mostrar instrucciones */}
      {!instructionsVisible && (
        <button
          onClick={() => setInstructionsVisible(true)}
          className="absolute bottom-4 right-4 z-20 p-3 rounded-full glass border"
          style={{
            borderColor: `${currentColor} / 0.5`,
            color: currentColor,
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      )}

      {/* Indicador de carga */}
      {!isARReady && (
        <div className="absolute inset-0 z-30 flex items-center justify-center glass"
          style={{ background: 'oklch(0.08 0.03 240 / 0.95)' }}
        >
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-current border-t-transparent rounded-full animate-spin mx-auto"
              style={{ color: currentColor }}
            />
            <p style={{ color: 'oklch(0.7 0.05 200)' }}>
              Inicializando Realidad Aumentada...
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ARPage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-current border-t-transparent rounded-full animate-spin mx-auto"
            style={{ color: 'oklch(0.75 0.25 200)' }}
          />
          <p style={{ color: 'oklch(0.7 0.05 200)' }}>
            Cargando Realidad Aumentada...
          </p>
        </div>
      </div>
    }>
      <ARPageContent />
    </Suspense>
  )
}

