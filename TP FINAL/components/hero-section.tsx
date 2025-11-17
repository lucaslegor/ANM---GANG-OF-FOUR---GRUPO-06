'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface HeroSectionProps {
  onNavigate?: (section: string) => void
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleNavigation = (section: string) => {
    if (onNavigate) {
      onNavigate(section)
    } else {
      // Fallback: usar hash navigation si no hay callback
      window.location.hash = section
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 600
    canvas.height = 600

    let angle = 0

    function drawHelix() {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = 100
      const height = 400

      for (let i = 0; i < height; i += 10) {
        const y = i - height / 2
        const x1 = Math.cos(i * 0.05 + angle) * radius
        const x2 = Math.cos(i * 0.05 + angle + Math.PI) * radius
        
        const opacity = 1 - Math.abs(y) / (height / 2)
        
        ctx.shadowBlur = 20
        ctx.shadowColor = 'oklch(0.75 0.25 200)'
        ctx.fillStyle = `oklch(0.75 0.25 200 / ${opacity})`
        ctx.beginPath()
        ctx.arc(centerX + x1, centerY + y, 5, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.shadowColor = 'oklch(0.7 0.28 320)'
        ctx.fillStyle = `oklch(0.7 0.28 320 / ${opacity})`
        ctx.beginPath()
        ctx.arc(centerX + x2, centerY + y, 5, 0, Math.PI * 2)
        ctx.fill()
        
        if (i % 40 === 0) {
          ctx.shadowBlur = 5
          ctx.strokeStyle = `oklch(0.8 0.22 140 / ${opacity * 0.5})`
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(centerX + x1, centerY + y)
          ctx.lineTo(centerX + x2, centerY + y)
          ctx.stroke()
        }
      }
      
      ctx.shadowBlur = 0
      angle += 0.02
      requestAnimationFrame(drawHelix)
    }

    drawHelix()
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center py-20 pt-32 md:pt-40 relative">
      <div className="absolute inset-0 opacity-15"
        style={{
          background: 'radial-gradient(circle at 30% 50%, oklch(0.65 0.2 200 / 0.2), transparent 60%), radial-gradient(circle at 70% 50%, oklch(0.6 0.22 240 / 0.2), transparent 60%)',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <div className="flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium"
                style={{
                  borderColor: 'oklch(0.75 0.2 200 / 0.25)',
                  color: 'oklch(0.75 0.2 200)',
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                    style={{ background: 'oklch(0.75 0.2 200)' }}
                  />
                  <span className="relative inline-flex rounded-full h-2 w-2"
                    style={{ background: 'oklch(0.75 0.2 200)' }}
                  />
                </span>
                Soluciones Empresariales de Análisis
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight"
              style={{ 
                color: 'oklch(0.98 0.01 200)',
                textShadow: '0 2px 8px oklch(0 0 0 / 0.2)',
              }}
            >
              BioGrowth Analytics
            </h1>
            
            <p className="text-xl md:text-2xl text-pretty leading-relaxed font-light"
              style={{ color: 'oklch(0.75 0.05 200)' }}
            >
              Análisis predictivos y simulaciones de crecimiento bacteriano para optimizar sus procesos de investigación y desarrollo en biotecnología.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="text-base px-8 py-6 btn-primary group font-semibold"
                onClick={() => handleNavigation('precios')}
              >
                Ver Planes y Precios
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                className="text-base px-8 py-6 btn-secondary font-semibold"
                onClick={() => window.location.href = '/simulador'}
              >
                Acceder a Herramientas
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative aspect-square w-full max-w-xl mx-auto">
              <canvas
                ref={canvasRef}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
