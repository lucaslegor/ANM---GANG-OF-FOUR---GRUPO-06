'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export function ParticleBackgroundSimulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string
    }> = []

    const colors = [
      'oklch(0.75 0.25 200)', // cyan
      'oklch(0.7 0.28 320)',  // magenta
      'oklch(0.8 0.22 140)',  // green
    ]

    // Crear partículas
    // Reducir número de partículas para mejor rendimiento
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    function draw() {
      if (!ctx || !canvas) return

      ctx.fillStyle = 'oklch(0.08 0.03 240 / 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Dibujar conexiones (optimizado - solo verificar partículas cercanas)
      for (let i = 0; i < particles.length; i++) {
        // Solo verificar las siguientes 5 partículas para reducir complejidad
        for (let j = i + 1; j < Math.min(i + 6, particles.length); j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.strokeStyle = `oklch(0.75 0.25 200 / ${1 - distance / 150})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Dibujar y actualizar partículas
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
        
        // Glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = particle.color
        ctx.fill()
        ctx.shadowBlur = 0
      })

      requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.3 }}
    />
  )
}

