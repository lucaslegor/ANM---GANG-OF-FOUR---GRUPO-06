'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Zap, Users, TrendingUp, Lock, HeadphonesIcon, Target, Award, Boxes, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export function DifferentiationSection() {
  const differentiators = [
    {
      icon: Zap,
      title: 'Nuestra Tecnología',
      description: 'Desarrollamos soluciones personalizadas de análisis de crecimiento bacteriano que se adaptan a las necesidades específicas de cada cliente. Nuestra tecnología avanzada permite obtener insights precisos sin revelar los detalles técnicos internos.',
      color: 'oklch(0.75 0.25 200)',
      details: [
        'Modelos predictivos de alta precisión',
        'Análisis adaptativo según condiciones específicas',
        'Tecnología propietaria optimizada',
        'Actualizaciones continuas y mejoras',
      ],
    },
    {
      icon: Users,
      title: 'Soporte Especializado',
      description: 'Ofrecemos soporte personalizado y consultoría experta para ayudarte a maximizar el valor de nuestros análisis. Nuestro equipo de especialistas está disponible para guiarte en cada paso.',
      color: 'oklch(0.7 0.28 320)',
      details: [
        'Consultoría de expertos en microbiología',
        'Soporte técnico prioritario',
        'Capacitación personalizada',
        'Asesoramiento estratégico continuo',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Resultados Reales',
      description: 'Nuestros análisis y simulaciones aportan valor real a la toma de decisiones estratégicas en investigación y desarrollo de biotecnología. Ayudamos a optimizar procesos y reducir tiempos de desarrollo.',
      color: 'oklch(0.8 0.22 140)',
      details: [
        'Optimización de procesos de cultivo',
        'Reducción de tiempos de experimentación',
        'Mejora en la toma de decisiones',
        'ROI medible en proyectos de investigación',
      ],
    },
    {
      icon: Shield,
      title: 'Seguridad y Privacidad',
      description: 'Garantizamos que tu información y datos son tratados con la máxima confidencialidad y seguridad. Implementamos los más altos estándares de protección de datos empresariales.',
      color: 'oklch(0.65 0.25 240)',
      details: [
        'Cumplimiento con estándares de seguridad',
        'Encriptación de datos en tránsito y reposo',
        'Acceso controlado y auditorías regulares',
        'Políticas de privacidad estrictas',
      ],
    },
    {
      icon: Boxes,
      title: 'Realidad Aumentada',
      description: 'Pioneros en la integración de realidad aumentada para visualización de datos de crecimiento bacteriano. Visualiza tus análisis en 3D directamente en tu entorno físico, facilitando la comprensión y presentación de resultados.',
      color: 'oklch(0.75 0.25 280)',
      details: [
        'Visualización 3D interactiva en tiempo real',
        'Acceso mediante marcadores AR desde dispositivos móviles',
        'Presentaciones inmersivas para equipos y stakeholders',
        'Tecnología de vanguardia única en el mercado',
      ],
    },
    {
      icon: Sparkles,
      title: 'Innovación Continua',
      description: 'Nos comprometemos a mantenernos a la vanguardia de la tecnología. Nuestro equipo de I+D trabaja constantemente en nuevas funcionalidades y mejoras para ofrecerte siempre las soluciones más avanzadas del mercado.',
      color: 'oklch(0.8 0.25 60)',
      details: [
        'Actualizaciones regulares con nuevas funcionalidades',
        'Investigación y desarrollo continuo',
        'Adopción de tecnologías emergentes',
        'Roadmap de producto transparente y colaborativo',
      ],
    },
  ]

  const advantages = [
    {
      icon: Target,
      title: 'Precisión Superior',
      description: 'Nuestros modelos ofrecen una precisión excepcional en las predicciones de crecimiento bacteriano, permitiendo planificar con confianza.',
      color: 'oklch(0.72 0.26 280)',
    },
    {
      icon: Award,
      title: 'Experiencia Comprobada',
      description: 'Años de experiencia en análisis microbiológico y desarrollo de soluciones para la industria biotecnológica.',
      color: 'oklch(0.78 0.24 160)',
    },
    {
      icon: HeadphonesIcon,
      title: 'Atención Personalizada',
      description: 'Cada cliente recibe atención personalizada con un equipo dedicado que comprende sus necesidades específicas.',
      color: 'oklch(0.75 0.25 200)',
    },
    {
      icon: Lock,
      title: 'Confidencialidad Total',
      description: 'Protegemos la información sensible de nuestros clientes con protocolos de seguridad de nivel empresarial.',
      color: 'oklch(0.7 0.28 320)',
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
            ¿Por Qué Elegir BioGrowth Analytics?
          </h2>
          <p className="text-lg text-pretty leading-relaxed"
            style={{ color: 'oklch(0.7 0.05 200)' }}
          >
            Somos líderes en análisis y simulación de crecimiento bacteriano. Descubre qué nos diferencia de la competencia y cómo podemos ayudarte a alcanzar tus objetivos.
          </p>
        </motion.div>

        {/* Principales Diferenciadores */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {differentiators.map((item, index) => {
            const Icon = item.icon
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
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg"
                        style={{ background: 'oklch(0.65 0.2 200 / 0.15)' }}
                      >
                        <Icon className="h-6 w-6" style={{ color: 'oklch(0.65 0.2 200)' }} />
                      </div>
                      <CardTitle className="text-xl" style={{ color: 'oklch(0.95 0.01 200)' }}>
                        {item.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-base leading-relaxed"
                      style={{ color: 'oklch(0.7 0.05 200)' }}
                    >
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {item.details.map((detail, detailIndex) => (
                        <motion.li
                          key={detailIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + detailIndex * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                            style={{ background: item.color }}
                          />
                          <span className="text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>
                            {detail}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Ventajas Adicionales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-center mb-8 neon-glow"
            style={{ color: 'oklch(0.95 0.01 200)' }}
          >
            Ventajas Adicionales
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <Card className="glass h-full text-center transition-all duration-300 hover:scale-[1.01]"
                    style={{
                      borderColor: 'oklch(0.3 0.1 200 / 0.2)',
                      boxShadow: '0 4px 16px oklch(0 0 0 / 0.08)',
                    }}
                  >
                    <CardContent className="py-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-4"
                        style={{ background: 'oklch(0.65 0.2 200 / 0.15)' }}
                      >
                        <Icon className="h-8 w-8" style={{ color: 'oklch(0.65 0.2 200)' }} />
                      </div>
                      <h4 className="font-semibold mb-2" style={{ color: 'oklch(0.95 0.01 200)' }}>
                        {advantage.title}
                      </h4>
                      <p className="text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>
                        {advantage.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="glass max-w-4xl mx-auto"
            style={{
              borderColor: 'oklch(0.3 0.1 200 / 0.2)',
              boxShadow: '0 8px 32px oklch(0 0 0 / 0.12)',
            }}
          >
            <CardContent className="py-12 text-center">
              <h3 className="text-3xl font-bold mb-4 tracking-tight"
                style={{ 
                  color: 'oklch(0.98 0.01 200)',
                  textShadow: '0 2px 8px oklch(0 0 0 / 0.2)',
                }}
              >
                ¿Listo para Transformar tu Investigación?
              </h3>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: 'oklch(0.75 0.05 200)' }}>
                Descubre cómo BioGrowth Analytics puede ayudarte a optimizar tus procesos y alcanzar resultados superiores.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="px-8 py-6 btn-primary font-semibold"
                >
                  Solicitar Demo
                </Button>
                <Button
                  className="px-8 py-6 btn-secondary font-semibold"
                >
                  Ver Planes
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

