'use client'

import { useState } from 'react'
import { FloatingNav } from '@/components/floating-nav'
import { HeroSection } from '@/components/hero-section'
import { DatasetSection } from '@/components/dataset-section'
import { ModelingSection } from '@/components/modeling-section'
import { SimulatorSection } from '@/components/simulator-section'
import { PaperSection } from '@/components/paper-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { AIAssistant } from '@/components/ai-assistant'
import { ParticleBackground } from '@/components/particle-background'

export default function Home() {
  const [activeSection, setActiveSection] = useState('inicio')

  const sections = {
    inicio: <HeroSection />,
    dataset: <DatasetSection />,
    modelado: <ModelingSection />,
    simulador: <SimulatorSection />,
    investigacion: <PaperSection />,
    contacto: <ContactSection />,
  }

  return (
    <div className="relative overflow-x-hidden">
      <ParticleBackground />
      <FloatingNav activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="relative z-10">
        <div className="w-full animate-in fade-in duration-300">
          {activeSection === 'inicio' && <HeroSection onNavigate={setActiveSection} />}
          {activeSection === 'dataset' && <DatasetSection />}
          {activeSection === 'modelado' && <ModelingSection />}
          {activeSection === 'simulador' && <SimulatorSection />}
          {activeSection === 'investigacion' && <PaperSection />}
          {activeSection === 'contacto' && <ContactSection />}
        </div>
      </main>
      
      {activeSection === 'contacto' && <Footer />}
      <AIAssistant />
    </div>
  )
}
