'use client'

import { motion } from 'framer-motion'
import { Download, Printer, QrCode, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function MarkerDownloadPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4"
      style={{ background: 'oklch(0.08 0.03 240)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full space-y-6"
      >
        <Card className="glass neon-border"
          style={{
            borderColor: 'oklch(0.75 0.25 200 / 0.5)',
            boxShadow: '0 0 30px oklch(0.75 0.25 200 / 0.3)',
          }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl"
              style={{ color: 'oklch(0.95 0.01 200)' }}
            >
              <QrCode className="h-6 w-6" style={{ color: 'oklch(0.75 0.25 200)' }} />
              Marcador de Realidad Aumentada
            </CardTitle>
            <CardDescription style={{ color: 'oklch(0.7 0.05 200)' }}>
              Descarga e imprime el marcador para usar la funcionalidad de AR
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Instrucciones */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold" style={{ color: 'oklch(0.95 0.01 200)' }}>
                Instrucciones de Uso:
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass p-4 rounded-lg border"
                  style={{ borderColor: 'oklch(0.75 0.25 200 / 0.3)' }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg"
                      style={{ background: 'oklch(0.75 0.25 200 / 0.2)' }}
                    >
                      <Download className="h-5 w-5" style={{ color: 'oklch(0.75 0.25 200)' }} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: 'oklch(0.95 0.01 200)' }}>
                        1. Descargar
                      </h4>
                      <p className="text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>
                        Descarga el archivo PDF del marcador
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass p-4 rounded-lg border"
                  style={{ borderColor: 'oklch(0.75 0.25 200 / 0.3)' }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg"
                      style={{ background: 'oklch(0.75 0.25 200 / 0.2)' }}
                    >
                      <Printer className="h-5 w-5" style={{ color: 'oklch(0.75 0.25 200)' }} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: 'oklch(0.95 0.01 200)' }}>
                        2. Imprimir
                      </h4>
                      <p className="text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>
                        Imprime el marcador en papel blanco, tamaño A4
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass p-4 rounded-lg border"
                  style={{ borderColor: 'oklch(0.75 0.25 200 / 0.3)' }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg"
                      style={{ background: 'oklch(0.75 0.25 200 / 0.2)' }}
                    >
                      <Camera className="h-5 w-5" style={{ color: 'oklch(0.75 0.25 200)' }} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: 'oklch(0.95 0.01 200)' }}>
                        3. Escanear QR
                      </h4>
                      <p className="text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>
                        Escanea el código QR desde el simulador
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass p-4 rounded-lg border"
                  style={{ borderColor: 'oklch(0.75 0.25 200 / 0.3)' }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg"
                      style={{ background: 'oklch(0.75 0.25 200 / 0.2)' }}
                    >
                      <QrCode className="h-5 w-5" style={{ color: 'oklch(0.75 0.25 200)' }} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: 'oklch(0.95 0.01 200)' }}>
                        4. Apuntar Cámara
                      </h4>
                      <p className="text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>
                        Apunta la cámara al marcador impreso
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de descarga */}
            <div className="flex flex-col items-center gap-4 pt-4">
              <a
                href="/ar-data/marker.pdf"
                download
                className="w-full md:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full neon-border"
                  style={{
                    background: 'linear-gradient(135deg, oklch(0.75 0.25 200), oklch(0.7 0.28 320))',
                    color: 'oklch(0.98 0 0)',
                    boxShadow: '0 0 20px oklch(0.75 0.25 200 / 0.5)',
                  }}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Descargar Marcador PDF
                </Button>
              </a>
              <p className="text-xs text-center" style={{ color: 'oklch(0.6 0.05 200)' }}>
                El marcador debe imprimirse en papel blanco, tamaño A4, sin escalado
              </p>
            </div>

            {/* Notas importantes */}
            <div className="glass p-4 rounded-lg border"
              style={{
                borderColor: 'oklch(0.75 0.25 200 / 0.3)',
                background: 'oklch(0.75 0.25 200 / 0.05)',
              }}
            >
              <h4 className="font-semibold mb-2" style={{ color: 'oklch(0.95 0.01 200)' }}>
                Notas Importantes:
              </h4>
              <ul className="text-sm space-y-1" style={{ color: 'oklch(0.7 0.05 200)' }}>
                <li>• Asegúrate de tener buena iluminación al usar el marcador</li>
                <li>• Mantén el marcador plano y sin arrugas</li>
                <li>• Permite el acceso a la cámara cuando se solicite</li>
                <li>• Usa HTTPS o localhost para evitar problemas de seguridad</li>
                <li>• En Safari, verifica los permisos de cámara en Configuración</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

