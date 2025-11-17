'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, ArrowRight, Zap, Briefcase, Building2 } from 'lucide-react'
import { motion } from 'framer-motion'

export function PricingSection() {
  const plans = [
    {
      id: 'basico',
      name: 'Plan Básico',
      icon: Zap,
      price: '$99',
      period: '/mes',
      description: 'Ideal para investigadores individuales y pequeños equipos',
      color: 'oklch(0.75 0.25 200)',
      features: [
        'Acceso a simulaciones básicas',
        'Métricas de crecimiento estándar',
        'Hasta 5 proyectos simultáneos',
        'Soporte por email',
        'Dashboard básico de estadísticas',
        'Exportación de datos en CSV',
      ],
      cta: 'Comenzar Prueba Gratuita',
      popular: false,
    },
    {
      id: 'profesional',
      name: 'Plan Profesional',
      icon: Briefcase,
      price: '$299',
      period: '/mes',
      description: 'Para laboratorios y equipos de investigación avanzada',
      color: 'oklch(0.7 0.28 320)',
      features: [
        'Acceso completo a todas las simulaciones',
        'Métricas avanzadas y análisis comparativos',
        'Proyectos ilimitados',
        'Soporte prioritario personalizado',
        'Dashboard avanzado con filtros interactivos',
        'Exportación en múltiples formatos',
        'Análisis de tendencias históricas',
        'API de acceso para integraciones',
      ],
      cta: 'Solicitar Demo',
      popular: true,
    },
    {
      id: 'empresarial',
      name: 'Plan Empresarial',
      icon: Building2,
      price: 'Personalizado',
      period: '',
      description: 'Soluciones a medida para grandes organizaciones',
      color: 'oklch(0.8 0.22 140)',
      features: [
        'Todas las características del Plan Profesional',
        'Soluciones personalizadas según necesidades',
        'Integración con sistemas empresariales',
        'Consultoría de expertos incluida',
        'SLA garantizado y soporte 24/7',
        'Capacitación personalizada del equipo',
        'Dedicated account manager',
        'Análisis y reportes personalizados',
        'Seguridad y cumplimiento empresarial',
      ],
      cta: 'Contactar Ventas',
      popular: false,
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
          background: 'radial-gradient(circle at 50% 50%, oklch(0.7 0.28 320 / 0.2), transparent 70%)',
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
            Planes y Precios
          </h2>
          <p className="text-lg text-pretty leading-relaxed"
            style={{ color: 'oklch(0.7 0.05 200)' }}
          >
            Elige el plan que mejor se adapte a tus necesidades. Todos los planes incluyen acceso a nuestras herramientas de análisis y simulación de crecimiento bacteriano.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="glass px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide"
                      style={{
                        borderColor: 'oklch(0.65 0.2 200 / 0.3)',
                        color: 'oklch(0.65 0.2 200)',
                        background: 'oklch(0.65 0.2 200 / 0.1)',
                      }}
                    >
                      Más Popular
                    </span>
                  </div>
                )}
                <Card className={`glass h-full flex flex-col transition-all duration-300 ${
                  plan.popular ? 'border-2 scale-[1.02]' : 'hover:scale-[1.01]'
                }`}
                  style={{
                    borderColor: plan.popular 
                      ? `oklch(0.65 0.2 200 / 0.4)` 
                      : `oklch(0.3 0.1 200 / 0.2)`,
                    boxShadow: plan.popular 
                      ? `0 8px 32px oklch(0.65 0.2 200 / 0.25), 0 2px 8px oklch(0 0 0 / 0.1)` 
                      : `0 4px 16px oklch(0 0 0 / 0.08)`,
                  }}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-4"
                      style={{ background: `oklch(0.65 0.2 200 / 0.15)` }}
                    >
                      <Icon className="h-8 w-8" style={{ color: 'oklch(0.65 0.2 200)' }} />
                    </div>
                    <CardTitle className="text-2xl mb-2 font-semibold" style={{ color: 'oklch(0.98 0.01 200)' }}>
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed" style={{ color: 'oklch(0.7 0.05 200)' }}>
                      {plan.description}
                    </CardDescription>
                    <div className="mt-6">
                      <span className="text-4xl font-bold" style={{ color: 'oklch(0.65 0.2 200)' }}>
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-lg ml-2 font-light" style={{ color: 'oklch(0.6 0.05 200)' }}>
                          {plan.period}
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-4 mb-8 flex-1">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + featureIndex * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <Check className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: 'oklch(0.65 0.2 200)' }} />
                          <span className="text-sm leading-relaxed" style={{ color: 'oklch(0.75 0.05 200)' }}>
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full group font-semibold ${
                        plan.popular ? 'btn-primary' : 'btn-secondary'
                      }`}
                      size="lg"
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Card className="glass max-w-2xl mx-auto"
            style={{
              borderColor: 'oklch(0.3 0.1 200 / 0.2)',
              boxShadow: '0 8px 32px oklch(0 0 0 / 0.12)',
            }}
          >
            <CardContent className="py-8">
              <p className="text-base mb-4" style={{ color: 'oklch(0.7 0.05 200)' }}>
                ¿Necesitas más información o tienes preguntas sobre nuestros planes?
              </p>
              <Button
                variant="outline"
                className="btn-secondary font-semibold"
              >
                Contactar con Ventas
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

