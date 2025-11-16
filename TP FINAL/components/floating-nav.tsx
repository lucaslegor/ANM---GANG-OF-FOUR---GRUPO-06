'use client'

import { FlaskConical, Database, Calculator, Play, FileText, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FloatingNavProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function FloatingNav({ activeSection, setActiveSection }: FloatingNavProps) {
  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: FlaskConical },
    { id: 'dataset', label: 'Dataset', icon: Database },
    { id: 'modelado', label: 'Modelado', icon: Calculator },
    { id: 'simulador', label: 'Simulador', icon: Play },
    { id: 'investigacion', label: 'Investigación', icon: FileText },
    { id: 'contacto', label: 'Contacto', icon: Mail },
  ]

  return (
    <>
      {/* Desktop Floating Navigation */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <div className="glass neon-border rounded-full px-6 py-3 flex items-center gap-2"
          style={{
            borderColor: 'oklch(0.75 0.25 200 / 0.4)',
            boxShadow: '0 0 30px oklch(0.75 0.25 200 / 0.3)',
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-2 transition-all duration-200 ${
                  isActive ? 'neon-glow scale-110' : 'hover:scale-105'
                }`}
                style={{
                  color: isActive ? 'oklch(0.75 0.25 200)' : 'oklch(0.7 0.05 200)',
                  background: isActive ? 'oklch(0.75 0.25 200 / 0.1)' : 'transparent',
                }}
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            )
          })}
        </div>
      </nav>

      {/* Mobile Floating Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <div className="glass neon-border rounded-full px-4 py-2 flex items-center gap-1"
          style={{
            borderColor: 'oklch(0.75 0.25 200 / 0.4)',
            boxShadow: '0 0 30px oklch(0.75 0.25 200 / 0.3)',
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="icon"
                onClick={() => setActiveSection(item.id)}
                className={`transition-all duration-200 ${
                  isActive ? 'neon-glow scale-110' : 'hover:scale-105'
                }`}
                style={{
                  color: isActive ? 'oklch(0.75 0.25 200)' : 'oklch(0.7 0.05 200)',
                  background: isActive ? 'oklch(0.75 0.25 200 / 0.1)' : 'transparent',
                }}
              >
                <Icon className="h-5 w-5" />
              </Button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
