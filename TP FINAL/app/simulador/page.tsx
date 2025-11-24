'use client'

import { useState } from 'react'
import { SimulatorSection } from '@/components/simulator-section'
import { DashboardSection } from '@/components/dashboard-section'
import { ModelAnalysisSection } from '@/components/model-analysis-section'
import { ParticleBackground } from '@/components/particle-background'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Lock, BarChart3, Play, FlaskConical } from 'lucide-react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function SimulatorPage() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      <ParticleBackground />
      
      {/* Header con advertencia de acceso restringido */}
      <div className="fixed top-0 left-0 right-0 z-50 glass border-b"
        style={{
          borderColor: 'oklch(0.75 0.25 200 / 0.3)',
        }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5" style={{ color: 'oklch(0.75 0.25 200)' }} />
            <p className="text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>
              <strong style={{ color: 'oklch(0.75 0.25 200)' }}>Acceso Restringido:</strong> Estas herramientas están disponibles solo bajo solicitud.
            </p>
          </div>
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="glass neon-border"
              style={{
                borderColor: 'oklch(0.75 0.25 200 / 0.5)',
                color: 'oklch(0.75 0.25 200)',
              }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Inicio
            </Button>
          </Link>
        </div>
      </div>

      <div className="pt-20">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="glass neon-border mb-8"
              style={{
                borderColor: 'oklch(0.75 0.25 200 / 0.5)',
              }}
            >
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="analisis" className="flex items-center gap-2">
                <FlaskConical className="h-4 w-4" />
                Análisis de Modelos
              </TabsTrigger>
              <TabsTrigger value="simulador" className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Simulador
              </TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard">
              <DashboardSection />
            </TabsContent>
            <TabsContent value="analisis">
              <ModelAnalysisSection />
            </TabsContent>
            <TabsContent value="simulador">
              <SimulatorSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

