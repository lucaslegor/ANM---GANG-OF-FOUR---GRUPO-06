'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Eye, Rocket, Users, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface TeamMember {
  name: string
  role: string
  image?: string
  linkedin?: string
  email?: string
}

const teamMembers: TeamMember[] = [
  {
    name: 'Agostina Pascucci',
    role: 'Co-Fundadora & CEO',
    image: '/team/agostina.jpg', // Ruta donde se pueden agregar las fotos
    email: 'agostina@biogrowthanalytics.com',
  },
  {
    name: 'Lucas Legorburu',
    role: 'Co-Fundador & CTO',
    image: '/team/lucas.jpg',
    email: 'lucas@biogrowthanalytics.com',
  },
  {
    name: 'Justina Smith',
    role: 'Directora de Investigación',
    image: '/team/justina.jpg',
    email: 'justina@biogrowthanalytics.com',
  },
  {
    name: 'Facundo Devida',
    role: 'Líder de Desarrollo',
    image: '/team/facundo.jpg',
    email: 'facundo@biogrowthanalytics.com',
  },
]

export function AboutSection() {
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
        {/* Historia de la Empresa */}
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
            Sobre BioGrowth Analytics
          </h2>
          <p className="text-lg text-pretty leading-relaxed"
            style={{ color: 'oklch(0.7 0.05 200)' }}
          >
            Fundada en 2025, BioGrowth Analytics nació de la visión de transformar el análisis de crecimiento bacteriano 
            mediante tecnología avanzada y soluciones innovadoras para la industria biotecnológica.
          </p>
        </motion.div>

        {/* Visión y Objetivos */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass h-full"
              style={{
                borderColor: 'oklch(0.3 0.1 200 / 0.2)',
                boxShadow: '0 4px 16px oklch(0 0 0 / 0.08)',
              }}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg"
                    style={{ background: 'oklch(0.65 0.2 200 / 0.15)' }}
                  >
                    <Eye className="h-6 w-6" style={{ color: 'oklch(0.65 0.2 200)' }} />
                  </div>
                  <CardTitle className="text-2xl font-semibold" style={{ color: 'oklch(0.98 0.01 200)' }}>
                    Nuestra Visión
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-base" style={{ color: 'oklch(0.75 0.05 200)' }}>
                  Ser líderes globales en análisis predictivo de crecimiento bacteriano, proporcionando herramientas 
                  de vanguardia que empoderen a investigadores y empresas biotecnológicas a tomar decisiones informadas 
                  y optimizar sus procesos de desarrollo e investigación.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="glass h-full"
              style={{
                borderColor: 'oklch(0.3 0.1 200 / 0.2)',
                boxShadow: '0 4px 16px oklch(0 0 0 / 0.08)',
              }}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg"
                    style={{ background: 'oklch(0.65 0.2 200 / 0.15)' }}
                  >
                    <Target className="h-6 w-6" style={{ color: 'oklch(0.65 0.2 200)' }} />
                  </div>
                  <CardTitle className="text-2xl font-semibold" style={{ color: 'oklch(0.98 0.01 200)' }}>
                    Nuestro Objetivo
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed mb-4 text-base" style={{ color: 'oklch(0.75 0.05 200)' }}>
                  Desarrollar y ofrecer soluciones de análisis y simulación de crecimiento bacteriano que:
                </p>
                <ul className="space-y-3">
                  {[
                    'Reduzcan tiempos de investigación y desarrollo',
                    'Mejoren la precisión en la toma de decisiones',
                    'Optimicen procesos de cultivo y producción',
                    'Faciliten la colaboración entre equipos de investigación',
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <Rocket className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: 'oklch(0.65 0.2 200)' }} />
                      <span className="text-sm leading-relaxed" style={{ color: 'oklch(0.75 0.05 200)' }}>
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Equipo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="h-8 w-8" style={{ color: 'oklch(0.65 0.2 200)' }} />
              <h3 className="text-3xl font-bold tracking-tight"
                style={{ 
                  color: 'oklch(0.98 0.01 200)',
                  textShadow: '0 2px 8px oklch(0 0 0 / 0.2)',
                }}
              >
                Nuestro Equipo
              </h3>
            </div>
            <p className="text-lg" style={{ color: 'oklch(0.7 0.05 200)' }}>
              Un equipo multidisciplinario de expertos apasionados por la innovación en biotecnología
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <Card className="glass h-full transition-all duration-300 hover:scale-[1.01] text-center p-6"
                  style={{
                    borderColor: 'oklch(0.3 0.1 200 / 0.2)',
                    boxShadow: '0 4px 16px oklch(0 0 0 / 0.08)',
                  }}
                >
                  <CardHeader className="pb-6">
                    <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-2"
                      style={{ 
                        borderColor: 'oklch(0.65 0.2 200 / 0.3)',
                        boxShadow: '0 4px 16px oklch(0.65 0.2 200 / 0.2)',
                      }}
                    >
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="192px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"
                          style={{ background: 'oklch(0.65 0.2 200 / 0.15)' }}
                        >
                          <span className="text-5xl font-bold" style={{ color: 'oklch(0.65 0.2 200)' }}>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-2xl mb-2" style={{ color: 'oklch(0.95 0.01 200)' }}>
                      {member.name}
                    </CardTitle>
                    <CardDescription className="text-lg font-medium" style={{ color: 'oklch(0.65 0.2 200)' }}>
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-center gap-4">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="p-3 rounded-lg glass neon-border transition-all hover:scale-110"
                          style={{
                            borderColor: 'oklch(0.75 0.25 200 / 0.5)',
                            color: 'oklch(0.75 0.25 200)',
                          }}
                          title={`Contactar a ${member.name}`}
                        >
                          <Mail className="h-5 w-5" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-lg glass neon-border transition-all hover:scale-110"
                          style={{
                            borderColor: 'oklch(0.75 0.25 200 / 0.5)',
                            color: 'oklch(0.75 0.25 200)',
                          }}
                          title={`LinkedIn de ${member.name}`}
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Nota sobre las fotos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >

        </motion.div>
      </div>
    </section>
  )
}

