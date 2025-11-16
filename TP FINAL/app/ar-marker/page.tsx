'use client'

import { useEffect, useRef, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { CLUSTER_OPTIONS, predictGrowth } from '@/lib/data-processor'
import { useGrowthData } from '@/lib/use-growth-data'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, AlertCircle, CheckCircle2, Info, RotateCcw } from 'lucide-react'
import Link from 'next/link'

function ARMarkerContent() {
  const searchParams = useSearchParams()
  const sceneRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [arInitialized, setArInitialized] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [showInstructions, setShowInstructions] = useState(true)
  const [arSupported, setArSupported] = useState(true)
  const [librariesLoaded, setLibrariesLoaded] = useState(false)
  const [librariesError, setLibrariesError] = useState(false)
  const [requestingCamera, setRequestingCamera] = useState(false)

  const clusterId = searchParams.get('cluster') || '25-rich'
  const projectionTime = searchParams.get('projection') || '12'

  const { getClusterById } = useGrowthData()
  const clusterData = getClusterById(clusterId)
  const clusterOption = CLUSTER_OPTIONS.find(opt => opt.id === clusterId)

  const colors = {
    '25-rich': '#00d9ff',
    '25-limited': '#ff00ff',
    '30-rich': '#00ff88',
    '30-limited': '#0066ff',
    '37-rich': '#aa00ff',
    '37-limited': '#00ffaa',
  }

  const currentColor = colors[clusterId as keyof typeof colors] || '#00d9ff'

  // Preparar datos para el gráfico
  const chartData = clusterData?.model ? (() => {
    const { dataPoints, model } = clusterData
    const minTime = Math.min(...dataPoints.map((p: any) => p.time))
    const maxTime = Math.max(...dataPoints.map((p: any) => p.time))
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
  })() : []

  // Verificar soporte de cámara
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setArSupported(false)
      setCameraError('Tu navegador no soporta acceso a la cámara. Por favor, usa Chrome, Safari o Firefox actualizado.')
      return
    }
  }, [])

  // Inicializar AR cuando las librerías estén cargadas
  useEffect(() => {
    if (!librariesLoaded || !arSupported || cameraError || arInitialized || requestingCamera) return
    if (typeof window === 'undefined') return
    if (!window.THREE || !window.THREE.Scene) return
    
    // Esperar a que los refs estén disponibles con retry
    const checkRefs = setInterval(() => {
      if (videoRef.current && canvasRef.current) {
        clearInterval(checkRefs)
        initAR()
      }
    }, 100)

    // Timeout para esperar refs (5 segundos)
    setTimeout(() => {
      clearInterval(checkRefs)
      if (!videoRef.current || !canvasRef.current) {
        console.error('⏱️ Timeout esperando refs')
        setCameraError('Error al inicializar los componentes. Por favor, recarga la página.')
      }
    }, 5000)

    let initializationTimeout: NodeJS.Timeout
    let cleanup: (() => void) | null = null

    const initAR = async () => {
      try {
        console.log('🚀 Iniciando AR...')
        setRequestingCamera(true)
        
        // Timeout para la inicialización completa
        initializationTimeout = setTimeout(() => {
          if (!arInitialized) {
            console.error('⏱️ Timeout inicializando AR')
            setRequestingCamera(false)
            setCameraError('La inicialización está tardando demasiado. Por favor, recarga la página.')
          }
        }, 25000) // 25 segundos máximo

        // Solicitar acceso a la cámara con timeout
        console.log('📷 Solicitando acceso a la cámara...')
        const cameraPromise = navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        })

        // Timeout para getUserMedia (15 segundos - más tiempo para móviles)
        const cameraTimeout = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('TIMEOUT')), 15000)
        })

        const stream = await Promise.race([cameraPromise, cameraTimeout]) as MediaStream
        console.log('✅ Cámara accedida')
        setRequestingCamera(false)

        if (!videoRef.current || !canvasRef.current) {
          stream.getTracks().forEach(track => track.stop())
          throw new Error('Refs no disponibles')
        }

        // Configurar video
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        console.log('✅ Video iniciado')

        // Configurar canvas 3D
        console.log('🎨 Configurando escena 3D...')
        const scene = new window.THREE.Scene()
        const camera = new window.THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        )
        camera.position.set(0, 1, 3)

        const renderer = new window.THREE.WebGLRenderer({
          canvas: canvasRef.current,
          alpha: true,
          antialias: true,
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        console.log('✅ Renderer configurado')

        // Iluminación
        const ambientLight = new window.THREE.AmbientLight(0xffffff, 0.6)
        scene.add(ambientLight)
        const directionalLight = new window.THREE.DirectionalLight(0xffffff, 0.8)
        directionalLight.position.set(1, 1, 1)
        scene.add(directionalLight)

        // Crear gráfico 3D
        if (chartData.length > 0) {
          console.log('📊 Creando gráfico 3D...')
          const points: any[] = []
          const minTime = Math.min(...chartData.map(d => d.time))
          const maxTime = Math.max(...chartData.map(d => d.time))
          const timeRange = maxTime - minTime || 1

          chartData.forEach((point, index) => {
            const x = ((point.time - minTime) / timeRange) * 4 - 2
            const y = point.growth * 2
            const z = Math.sin(index * 0.1) * 0.3
            points.push(new window.THREE.Vector3(x, y, z))
          })

          const curve = new window.THREE.CatmullRomCurve3(points)
          const geometry = new window.THREE.TubeGeometry(curve, 200, 0.05, 8, false)
          
          // Convertir color hex a RGB
          const hex = currentColor.replace('#', '')
          const r = parseInt(hex.substring(0, 2), 16) / 255
          const g = parseInt(hex.substring(2, 4), 16) / 255
          const b = parseInt(hex.substring(4, 6), 16) / 255
          const color = new window.THREE.Color(r, g, b)

          const material = new window.THREE.MeshStandardMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 0.5,
            metalness: 0.8,
            roughness: 0.2,
          })

          const mesh = new window.THREE.Mesh(geometry, material)
          scene.add(mesh)

          // Rotación automática
          let rotation = 0
          const animate = () => {
            requestAnimationFrame(animate)
            rotation += 0.005
            mesh.rotation.y = rotation
            renderer.render(scene, camera)
          }
          animate()
          console.log('✅ Gráfico 3D creado')
        }

        // Manejar resize
        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener('resize', handleResize)

        cleanup = () => {
          stream.getTracks().forEach(track => track.stop())
          window.removeEventListener('resize', handleResize)
        }

        clearTimeout(initializationTimeout)
        setArInitialized(true)
        setRequestingCamera(false)
        console.log('✅ AR inicializado correctamente')
      } catch (err: any) {
        console.error('❌ Error inicializando AR:', err)
        clearTimeout(initializationTimeout)
        setRequestingCamera(false)
        
        let errorMsg = 'Error al inicializar la realidad aumentada. Por favor, recarga la página.'
        
        if (err.name === 'NotAllowedError' || err.message === 'Permission denied') {
          errorMsg = 'Acceso a la cámara denegado. Por favor, permite el acceso en la configuración de tu navegador y recarga la página.'
        } else if (err.name === 'NotFoundError' || err.message === 'No camera found') {
          errorMsg = 'No se encontró ninguna cámara. Por favor, conecta una cámara y recarga la página.'
        } else if (err.message === 'TIMEOUT') {
          errorMsg = 'La solicitud de cámara está tardando demasiado. Por favor, verifica los permisos en la configuración de tu navegador y recarga la página.'
        } else if (err.message) {
          errorMsg = `Error: ${err.message}`
        }
        
        setCameraError(errorMsg)
        if (cleanup) cleanup()
      }
    }

    return () => {
      if (cleanup) cleanup()
      clearTimeout(initializationTimeout)
    }
  }, [librariesLoaded, arSupported, chartData, currentColor, cameraError, arInitialized, requestingCamera])

  // Verificar carga de librerías con polling y timeout
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (librariesLoaded || librariesError) return

    let attempts = 0
    const maxAttempts = 100 // 10 segundos máximo
    const timeout = setTimeout(() => {
      if (!librariesLoaded) {
        console.error('⏱️ Timeout cargando Three.js')
        setLibrariesError(true)
        setCameraError('Error al cargar las librerías 3D. Por favor, verifica tu conexión a internet y recarga la página.')
      }
    }, 15000) // 15 segundos de timeout

    const checkInterval = setInterval(() => {
      attempts++
      if (typeof window !== 'undefined' && window.THREE && window.THREE.Scene) {
        console.log('✅ Three.js cargado correctamente')
        clearInterval(checkInterval)
        clearTimeout(timeout)
        setLibrariesLoaded(true)
      } else if (attempts >= maxAttempts) {
        console.error('❌ Three.js no se cargó después de múltiples intentos')
        clearInterval(checkInterval)
        clearTimeout(timeout)
        setLibrariesError(true)
        setCameraError('Error al cargar las librerías 3D. Por favor, verifica tu conexión a internet y recarga la página.')
      }
    }, 100)

    return () => {
      clearInterval(checkInterval)
      clearTimeout(timeout)
    }
  }, [librariesLoaded, librariesError])

  // Handlers para carga de librerías
  const handleThreeLoad = () => {
    console.log('📦 Script Three.js cargado, verificando disponibilidad...')
    // El polling se encargará de verificar
  }

  const handleThreeError = () => {
    console.error('❌ Error cargando Three.js desde CDN')
    setLibrariesError(true)
    setCameraError('Error al cargar las librerías 3D. Por favor, verifica tu conexión a internet y recarga la página.')
  }

  return (
    <>
      {/* Cargar Three.js desde CDN con múltiples fallbacks */}
      <Script
        src="https://cdn.jsdelivr.net/npm/three@0.150.0/build/three.min.js"
        strategy="lazyOnload"
        onLoad={handleThreeLoad}
        onError={handleThreeError}
        onReady={() => {
          console.log('✅ Script Three.js listo')
        }}
      />

      <div className="fixed inset-0 bg-black overflow-hidden">
        {/* Video de la cámara (fondo) */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: 'scaleX(-1)' }}
        />

        {/* Canvas 3D superpuesto */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10"
          style={{ pointerEvents: 'none' }}
        />

        {/* Instrucciones */}
        <AnimatePresence>
          {showInstructions && arInitialized && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="absolute bottom-0 left-0 right-0 z-20 p-6 glass border-t"
              style={{
                background: 'oklch(0.12 0.04 240 / 0.95)',
                borderTopColor: `${currentColor} / 0.5`,
              }}
            >
              <div className="max-w-md mx-auto space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold" style={{ color: 'oklch(0.95 0.01 200)' }}>
                    Gráfico 3D en Realidad Aumentada
                  </h3>
                  <button
                    onClick={() => setShowInstructions(false)}
                    className="text-sm px-3 py-1 rounded glass border"
                    style={{
                      borderColor: `${currentColor} / 0.5`,
                      color: currentColor,
                    }}
                  >
                    Ocultar
                  </button>
                </div>

                <div className="space-y-2 text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>
                  <div className="flex items-start gap-2">
                    <Camera className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: currentColor }} />
                    <div>
                      <p className="font-semibold">Gráfico 3D flotante</p>
                      <p className="text-xs mt-1" style={{ color: 'oklch(0.6 0.05 200)' }}>
                        El gráfico se muestra sobre la cámara y rota automáticamente
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: currentColor }} />
                    <div>
                      <p className="font-semibold">Sin necesidad de marcadores</p>
                      <p className="text-xs mt-1" style={{ color: 'oklch(0.6 0.05 200)' }}>
                        Funciona directamente con la cámara, sin descargar nada
                      </p>
                    </div>
                  </div>
                </div>

                {clusterOption && (
                  <p className="text-xs text-center" style={{ color: 'oklch(0.6 0.05 200)' }}>
                    Cluster: {clusterOption.label}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error de cámara o soporte */}
        {(cameraError || !arSupported || librariesError) && (
          <div className="absolute inset-0 z-30 flex items-center justify-center glass p-6"
            style={{ background: 'oklch(0.08 0.03 240 / 0.95)' }}
          >
            <div className="max-w-md space-y-4 text-center">
              <AlertCircle className="h-12 w-12 mx-auto" style={{ color: '#ff4444' }} />
              <h3 className="text-lg font-semibold" style={{ color: 'oklch(0.95 0.01 200)' }}>
                {librariesError ? 'Error al Cargar Librerías' : !arSupported ? 'Navegador No Compatible' : 'Error de Acceso a la Cámara'}
              </h3>
              <p className="text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>
                {cameraError || (librariesError ? 'Error al cargar las librerías AR. Por favor, verifica tu conexión a internet y recarga la página.' : 'Tu navegador no soporta esta funcionalidad')}
              </p>
              <div className="space-y-2 text-xs text-left glass p-4 rounded-lg"
                style={{
                  background: 'oklch(0.12 0.04 240 / 0.5)',
                  borderColor: `${currentColor} / 0.3`,
                }}
              >
                <p className="font-semibold mb-2" style={{ color: 'oklch(0.95 0.01 200)' }}>
                  Soluciones:
                </p>
                <div className="space-y-1" style={{ color: 'oklch(0.6 0.05 200)' }}>
                  <p><strong>Safari (iOS):</strong> Configuración → Safari → Cámara → Permitir</p>
                  <p><strong>Chrome (Android):</strong> Configuración → Permisos → Cámara → Permitir</p>
                  <p><strong>HTTPS:</strong> Asegúrate de usar HTTPS o localhost</p>
                  <p><strong>Actualizar:</strong> Usa la versión más reciente de tu navegador</p>
                  {librariesError && (
                    <p><strong>Internet:</strong> Verifica tu conexión y recarga la página</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 rounded glass border flex items-center gap-2"
                  style={{
                    borderColor: `${currentColor} / 0.5`,
                    color: currentColor,
                  }}
                >
                  <RotateCcw className="h-4 w-4" />
                  Recargar Página
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Indicador de carga */}
        {!arInitialized && !cameraError && arSupported && !librariesError && (
          <div className="absolute inset-0 z-30 flex items-center justify-center glass"
            style={{ background: 'oklch(0.08 0.03 240 / 0.95)' }}
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-current border-t-transparent rounded-full animate-spin mx-auto"
                style={{ color: currentColor }}
              />
              <p style={{ color: 'oklch(0.7 0.05 200)' }}>
                {!librariesLoaded 
                  ? 'Cargando librerías 3D...' 
                  : requestingCamera 
                    ? 'Solicitando acceso a la cámara...' 
                    : 'Inicializando Realidad Aumentada...'}
              </p>
              {!librariesLoaded && (
                <>
                  <p className="text-xs" style={{ color: 'oklch(0.6 0.05 200)' }}>
                    Por favor, espera mientras se cargan las librerías necesarias
                  </p>
                  <p className="text-xs mt-2" style={{ color: 'oklch(0.5 0.05 200)' }}>
                    Si tarda mucho, verifica tu conexión a internet
                  </p>
                </>
              )}
              {librariesLoaded && requestingCamera && (
                <>
                  <p className="text-xs" style={{ color: 'oklch(0.6 0.05 200)' }}>
                    Por favor, permite el acceso a la cámara cuando se solicite
                  </p>
                  <p className="text-xs mt-2" style={{ color: 'oklch(0.5 0.05 200)' }}>
                    Busca el diálogo de permisos en tu navegador
                  </p>
                </>
              )}
              {librariesLoaded && !requestingCamera && !arInitialized && (
                <p className="text-xs" style={{ color: 'oklch(0.6 0.05 200)' }}>
                  Configurando escena 3D...
                </p>
              )}
            </div>
          </div>
        )}

        {/* Botón para mostrar instrucciones */}
        {!showInstructions && arInitialized && (
          <button
            onClick={() => setShowInstructions(true)}
            className="absolute bottom-4 right-4 z-20 p-3 rounded-full glass border"
            style={{
              borderColor: `${currentColor} / 0.5`,
              color: currentColor,
            }}
          >
            <Info className="h-6 w-6" />
          </button>
        )}
      </div>
    </>
  )
}

export default function ARMarkerPage() {
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
      <ARMarkerContent />
    </Suspense>
  )
}

// Extender Window para incluir Three.js
declare global {
  interface Window {
    THREE: any
  }
}
