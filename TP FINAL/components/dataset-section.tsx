'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Thermometer, Droplets, FlaskConical, BarChart3 } from 'lucide-react'
import { useState } from 'react'

export function DatasetSection() {
  const [hoveredCluster, setHoveredCluster] = useState<number | null>(null)

  const clusters = [
    '25°C - Medio Rico',
    '25°C - Medio Limitado',
    '30°C - Medio Rico',
    '30°C - Medio Limitado',
    '37°C - Medio Rico',
    '37°C - Medio Limitado',
  ]

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
          background: 'radial-gradient(circle at 50% 50%, oklch(0.7 0.28 320 / 0.2), transparent 70%)',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance neon-glow"
            style={{ color: 'oklch(0.95 0.01 200)' }}
          >
            Dataset Experimental
          </h2>
          <p className="text-lg text-pretty leading-relaxed"
            style={{ color: 'oklch(0.7 0.05 200)' }}
          >
            Mediciones reales de crecimiento normalizado de <em>E. coli K-12</em> bajo 6 condiciones ambientales diferentes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="glass neon-border transition-all duration-200 hover:scale-105"
            style={{
              borderColor: 'oklch(0.75 0.25 200 / 0.3)',
              boxShadow: '0 0 20px oklch(0.75 0.25 200 / 0.1)',
            }}
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg"
                  style={{ background: 'oklch(0.75 0.25 200 / 0.2)' }}
                >
                  <FlaskConical className="h-5 w-5 neon-glow" style={{ color: 'oklch(0.75 0.25 200)' }} />
                </div>
                <CardTitle className="text-xl" style={{ color: 'oklch(0.95 0.01 200)' }}>
                  Organismo
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'oklch(0.7 0.05 200)' }}>
                <em>Escherichia coli K-12</em>
              </p>
              <p className="text-sm mt-2" style={{ color: 'oklch(0.6 0.05 200)' }}>
                Cepa modelo para estudios microbiológicos
              </p>
            </CardContent>
          </Card>

          <Card className="glass neon-border transition-all duration-200 hover:scale-105"
            style={{
              borderColor: 'oklch(0.7 0.28 320 / 0.3)',
              boxShadow: '0 0 20px oklch(0.7 0.28 320 / 0.1)',
            }}
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg"
                  style={{ background: 'oklch(0.7 0.28 320 / 0.2)' }}
                >
                  <Thermometer className="h-5 w-5 neon-glow" style={{ color: 'oklch(0.7 0.28 320)' }} />
                </div>
                <CardTitle className="text-xl" style={{ color: 'oklch(0.95 0.01 200)' }}>
                  Temperaturas
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'oklch(0.7 0.05 200)' }}>
                25°C, 30°C, 37°C
              </p>
              <p className="text-sm mt-2" style={{ color: 'oklch(0.6 0.05 200)' }}>
                Rango de temperatura fisiológica
              </p>
            </CardContent>
          </Card>

          <Card className="glass neon-border transition-all duration-200 hover:scale-105"
            style={{
              borderColor: 'oklch(0.8 0.22 140 / 0.3)',
              boxShadow: '0 0 20px oklch(0.8 0.22 140 / 0.1)',
            }}
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg"
                  style={{ background: 'oklch(0.8 0.22 140 / 0.2)' }}
                >
                  <Droplets className="h-5 w-5 neon-glow" style={{ color: 'oklch(0.8 0.22 140)' }} />
                </div>
                <CardTitle className="text-xl" style={{ color: 'oklch(0.95 0.01 200)' }}>
                  Medios
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p style={{ color: 'oklch(0.7 0.05 200)' }}>
                Rico y Limitado
              </p>
              <p className="text-sm mt-2" style={{ color: 'oklch(0.6 0.05 200)' }}>
                Diferentes disponibilidades nutricionales
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="glass neon-border"
          style={{
            borderColor: 'oklch(0.75 0.25 200 / 0.5)',
            boxShadow: '0 0 30px oklch(0.75 0.25 200 / 0.2)',
          }}
        >
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg"
                style={{ background: 'oklch(0.75 0.25 200 / 0.2)' }}
              >
                <BarChart3 className="h-5 w-5 neon-glow" style={{ color: 'oklch(0.75 0.25 200)' }} />
              </div>
              <CardTitle className="text-xl" style={{ color: 'oklch(0.95 0.01 200)' }}>
                Estructura del Dataset
              </CardTitle>
            </div>
            <CardDescription style={{ color: 'oklch(0.7 0.05 200)' }}>
              Variables medidas en cada experimento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3" style={{ color: 'oklch(0.95 0.01 200)' }}>
                  Columnas del Dataset:
                </h4>
                <ul className="space-y-2">
                  {[
                    { name: 'time', desc: 'Tiempo en minutos' },
                    { name: 'growth_norm', desc: 'Crecimiento normalizado (0-1)' },
                    { name: 'temperature', desc: 'Temperatura (°C)' },
                    { name: 'medium', desc: 'Tipo de medio (rico/limitado)' },
                    { name: 'cluster', desc: 'Identificador de cluster' },
                  ].map((col, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-mono text-sm glass px-2 py-1 rounded border"
                        style={{
                          borderColor: 'oklch(0.75 0.25 200 / 0.3)',
                          color: 'oklch(0.75 0.25 200)',
                        }}
                      >
                        {col.name}
                      </span>
                      <span className="text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>
                        {col.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3" style={{ color: 'oklch(0.95 0.01 200)' }}>
                  6 Clusters Experimentales:
                </h4>
                <div className="space-y-2">
                  {clusters.map((cluster, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm p-2 rounded transition-all cursor-pointer"
                      style={{
                        background: hoveredCluster === i ? `${colors[i]} / 0.2` : 'transparent',
                      }}
                      onMouseEnter={() => setHoveredCluster(i)}
                      onMouseLeave={() => setHoveredCluster(null)}
                    >
                      <div className="w-2 h-2 rounded-full animate-pulse"
                        style={{ background: colors[i], boxShadow: `0 0 10px ${colors[i]}` }}
                      />
                      <span style={{ color: 'oklch(0.7 0.05 200)' }}>
                        {cluster}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 glass rounded-lg border"
              style={{ borderColor: 'oklch(0.75 0.25 200 / 0.3)' }}
            >
              <p className="text-sm" style={{ color: 'oklch(0.95 0.01 200)' }}>
                <strong style={{ color: 'oklch(0.75 0.25 200)' }}>Nota:</strong> Cada cluster representa una condición ambiental única y exhibe un patrón de crecimiento característico. 
                Los datos experimentales permiten modelar matemáticamente el comportamiento bacteriano bajo diferentes condiciones.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
