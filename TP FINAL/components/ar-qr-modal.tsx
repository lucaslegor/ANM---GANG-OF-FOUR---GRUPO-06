'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Smartphone, Scan, AlertCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import QRCode from 'qrcode'
import { CLUSTER_OPTIONS } from '@/lib/data-processor'

interface ARQRModalProps {
  isOpen: boolean
  onClose: () => void
  clusterId: string
  t1: string
  t2: string
  projectionTime: string
  color: string
}

export function ARQRModal({ isOpen, onClose, clusterId, t1, t2, projectionTime, color }: ARQRModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  const [isLocalhost, setIsLocalhost] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (isOpen) {
      // Generar URL única con parámetros (usar versión con marcadores)
      const params = new URLSearchParams({
        cluster: clusterId,
        t1,
        t2,
        projection: projectionTime,
      })
      
      // Detectar si estamos en localhost
      const hostname = window.location.hostname
      const isLocal = hostname === 'localhost' || hostname === '127.0.0.1'
      setIsLocalhost(isLocal)
      
      let baseUrl = window.location.origin
      const arUrl = `${baseUrl}/ar-marker?${params.toString()}`
      
      if (isLocal) {
        console.warn('⚠️ Estás usando localhost. Para acceder desde tu celular:')
        console.warn('   1. Ejecuta: pnpm get-ip para ver tu IP local')
        console.warn('   2. Ejecuta: pnpm dev:network')
        console.warn('   3. Accede desde tu celular usando: http://TU_IP:3000')
      }
      
      // Generar QR code
      QRCode.toDataURL(arUrl, {
        width: 400,
        margin: 2,
        color: {
          dark: '#00d9ff',
          light: '#000000',
        },
        errorCorrectionLevel: 'H',
      })
        .then((url) => {
          setQrDataUrl(url)
        })
        .catch((err) => {
          console.error('Error generating QR code:', err)
        })
    }
  }, [isOpen, clusterId, t1, t2, projectionTime])

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="glass neon-border max-w-md p-0 overflow-hidden"
            style={{
              borderColor: `${color} / 0.5`,
              boxShadow: `0 0 40px ${color} / 0.4`,
              background: 'oklch(0.12 0.04 240 / 0.95)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Efecto de brillo animado */}
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `linear-gradient(90deg, transparent, ${color} / 0.5, transparent)`,
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

              <DialogHeader className="relative z-10 p-6 pb-4">
                <div className="flex items-center justify-between">
                  <DialogTitle className="flex items-center gap-2 text-2xl"
                    style={{ color: 'oklch(0.95 0.01 200)' }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      <Scan className="h-6 w-6" style={{ color }} />
                    </motion.div>
                    Realidad Aumentada
                  </DialogTitle>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="glass rounded-full p-2 border transition-all"
                    style={{
                      borderColor: `${color} / 0.5`,
                      color,
                    }}
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>
                <DialogDescription className="mt-2"
                  style={{ color: 'oklch(0.7 0.05 200)' }}
                >
                  Escanea este código QR con tu dispositivo móvil para visualizar el gráfico 3D en Realidad Aumentada. Sin necesidad de descargar nada.
                </DialogDescription>
              </DialogHeader>

              <div className="relative z-10 px-6 pb-6">
                {/* QR Code */}
                <motion.div
                  className="flex flex-col items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="glass p-6 rounded-xl border relative overflow-hidden"
                    style={{
                      borderColor: `${color} / 0.5`,
                      boxShadow: `0 0 30px ${color} / 0.3`,
                    }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(circle at center, ${color} / 0.1, transparent)`,
                      }}
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    {qrDataUrl ? (
                      <motion.img
                        src={qrDataUrl}
                        alt="QR Code for AR"
                        className="relative z-10 w-64 h-64"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring' }}
                      />
                    ) : (
                      <div className="w-64 h-64 flex items-center justify-center">
                        <motion.div
                          className="w-16 h-16 border-4 border-current border-t-transparent rounded-full"
                          style={{ color }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Instrucciones */}
                  <motion.div
                    className="text-center space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center justify-center gap-2 text-sm"
                      style={{ color: 'oklch(0.7 0.05 200)' }}
                    >
                      <Smartphone className="h-4 w-4" style={{ color }} />
                      <span>Usa la cámara de tu móvil para escanear</span>
                    </div>
                    <div className="text-xs space-y-1"
                      style={{ color: 'oklch(0.6 0.05 200)' }}
                    >
                      <p>• Abre la app de cámara de tu dispositivo</p>
                      <p>• Apunta al código QR</p>
                      <p>• Toca la notificación para abrir en AR</p>
                      <p>• Permite el acceso a la cámara cuando se solicite</p>
                      <p>• El gráfico 3D aparecerá automáticamente sobre la cámara</p>
                      <p className="font-semibold mt-2" style={{ color: 'oklch(0.8 0.22 140)' }}>
                        ✅ No necesitas descargar ni imprimir nada
                      </p>
                    </div>
                  </motion.div>

                  {/* Advertencia de localhost */}
                  {isLocalhost && (
                    <motion.div
                      className="glass p-4 rounded-lg border w-full"
                      style={{
                        borderColor: '#ffaa00 / 0.5',
                        background: '#ffaa00 / 0.1',
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: '#ffaa00' }} />
                        <div className="text-xs space-y-1" style={{ color: 'oklch(0.7 0.05 200)' }}>
                          <p className="font-semibold" style={{ color: '#ffaa00' }}>
                            ⚠️ Acceso desde Móvil
                          </p>
                          <p>Estás usando localhost. Tu celular no podrá acceder.</p>
                          <p className="mt-2">
                            <strong>Solución:</strong>
                          </p>
                          <ol className="list-decimal list-inside ml-2 space-y-1">
                            <li>Ejecuta: <code className="px-1 py-0.5 rounded glass">pnpm get-ip</code></li>
                            <li>Ejecuta: <code className="px-1 py-0.5 rounded glass">pnpm dev:network</code></li>
                            <li>Accede desde tu celular usando la IP mostrada</li>
                          </ol>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Información del cluster */}
                  <motion.div
                    className="glass p-4 rounded-lg border w-full"
                    style={{
                      borderColor: `${color} / 0.3`,
                      background: `${color} / 0.05`,
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: isLocalhost ? 0.6 : 0.5 }}
                  >
                    <div className="text-xs space-y-1"
                      style={{ color: 'oklch(0.7 0.05 200)' }}
                    >
                      <p className="font-semibold" style={{ color }}>
                        Parámetros del gráfico:
                      </p>
                      <p>Cluster: {CLUSTER_OPTIONS.find(c => c.id === clusterId)?.label || clusterId}</p>
                      <p>Tiempo de proyección: {projectionTime} horas</p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

