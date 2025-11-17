'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, TrendingUp, Activity, Zap, ArrowRight, Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function DashboardPreviewSection() {
  const features = [
    {
      icon: TrendingUp,
      title: 'Tasas de Crecimiento',
      description: 'Visualiza métricas clave de crecimiento bacteriano en tiempo real',
      color: 'oklch(0.75 0.25 200)',
    },
    {
      icon: Filter,
      title: 'Filtros Avanzados',
      description: 'Filtra por temperatura y medio para análisis comparativos precisos',
      color: 'oklch(0.7 0.28 320)',
    },
    {
      icon: Activity,
      title: 'Métricas en Tiempo Real',
      description: 'Monitorea el crecimiento en diferentes periodos de tiempo',
      color: 'oklch(0.8 0.22 140)',
    },
    {
      icon: BarChart3,
      title: 'Comparaciones Visuales',
      description: 'Compara patrones de crecimiento entre diferentes condiciones ambientales',
      color: 'oklch(0.65 0.25 240)',
    },
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
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance tracking-tight"
            style={{ 
              color: 'oklch(0.98 0.01 200)',
              textShadow: '0 2px 8px oklch(0 0 0 / 0.2)',
            }}
          >
            Dashboard de Estadísticas y Métricas
          </h2>
          <p className="text-lg text-pretty leading-relaxed mb-8"
            style={{ color: 'oklch(0.7 0.05 200)' }}
          >
            Accede a métricas clave del crecimiento bacteriano con visualizaciones interactivas y filtros avanzados. Analiza tendencias, compara clusters y toma decisiones basadas en datos precisos.
          </p>
        </motion.div>

        {/* Características principales */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass h-full transition-all duration-300 hover:scale-[1.01]"
                  style={{
                    borderColor: 'oklch(0.3 0.1 200 / 0.2)',
                    boxShadow: '0 4px 16px oklch(0 0 0 / 0.08)',
                  }}
                >
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4"
                      style={{ background: 'oklch(0.65 0.2 200 / 0.15)' }}
                    >
                      <Icon className="h-6 w-6" style={{ color: 'oklch(0.65 0.2 200)' }} />
                    </div>
                    <CardTitle className="text-lg" style={{ color: 'oklch(0.95 0.01 200)' }}>
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed"
                      style={{ color: 'oklch(0.7 0.05 200)' }}
                    >
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Vista previa de métricas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <Card className="glass"
            style={{
              borderColor: 'oklch(0.3 0.1 200 / 0.2)',
              boxShadow: '0 4px 16px oklch(0 0 0 / 0.08)',
            }}
          >
            <CardContent className="py-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-4" style={{ color: 'oklch(0.65 0.2 200)' }} />
              <div className="text-2xl font-bold mb-2" style={{ color: 'oklch(0.98 0.01 200)' }}>
                Tasa de Crecimiento
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'oklch(0.7 0.05 200)' }}>
                Métricas precisas calculadas en tiempo real
              </p>
            </CardContent>
          </Card>

          <Card className="glass"
            style={{
              borderColor: 'oklch(0.3 0.1 200 / 0.2)',
              boxShadow: '0 4px 16px oklch(0 0 0 / 0.08)',
            }}
          >
            <CardContent className="py-6 text-center">
              <Activity className="h-8 w-8 mx-auto mb-4" style={{ color: 'oklch(0.65 0.2 200)' }} />
              <div className="text-2xl font-bold mb-2" style={{ color: 'oklch(0.98 0.01 200)' }}>
                Crecimiento 24h
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'oklch(0.7 0.05 200)' }}>
                Porcentaje de crecimiento en diferentes periodos
              </p>
            </CardContent>
          </Card>

          <Card className="glass"
            style={{
              borderColor: 'oklch(0.3 0.1 200 / 0.2)',
              boxShadow: '0 4px 16px oklch(0 0 0 / 0.08)',
            }}
          >
            <CardContent className="py-6 text-center">
              <Zap className="h-8 w-8 mx-auto mb-4" style={{ color: 'oklch(0.65 0.2 200)' }} />
              <div className="text-2xl font-bold mb-2" style={{ color: 'oklch(0.98 0.01 200)' }}>
                Clusters Analizados
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'oklch(0.7 0.05 200)' }}>
                Análisis comparativo entre condiciones
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA para acceder al dashboard completo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Card className="glass max-w-2xl mx-auto"
            style={{
              borderColor: 'oklch(0.3 0.1 200 / 0.2)',
              boxShadow: '0 8px 32px oklch(0 0 0 / 0.12)',
            }}
          >
            <CardContent className="py-8">
              <h3 className="text-3xl font-bold mb-4 tracking-tight"
                style={{ 
                  color: 'oklch(0.98 0.01 200)',
                  textShadow: '0 2px 8px oklch(0 0 0 / 0.2)',
                }}
              >
                Accede al Dashboard Completo
              </h3>
              <p className="text-base mb-6" style={{ color: 'oklch(0.7 0.05 200)' }}>
                El dashboard completo está disponible junto con nuestras herramientas de simulación avanzada. 
                Accede para ver métricas detalladas, gráficos interactivos y análisis comparativos.
              </p>
              <Link href="/simulador">
                <Button
                  size="lg"
                  className="btn-primary group font-semibold"
                >
                  Acceder al Dashboard y Simulador
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

