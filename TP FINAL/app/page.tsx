'use client'

import { useState } from 'react'
import { FloatingNav } from '@/components/floating-nav'
import { HeroSection } from '@/components/hero-section'
import { PricingSection } from '@/components/pricing-section'
import { DashboardPreviewSection } from '@/components/dashboard-preview-section'
import { DifferentiationSection } from '@/components/differentiation-section'
import { AboutSection } from '@/components/about-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { AIAssistant } from '@/components/ai-assistant'
import { ParticleBackground } from '@/components/particle-background'

export default function Home() {
  const [activeSection, setActiveSection] = useState('inicio')

  return (
    <div className="relative overflow-x-hidden">
      <ParticleBackground />
      <FloatingNav activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="relative z-10">
        <div className="w-full animate-in fade-in duration-300">
          {activeSection === 'inicio' && <HeroSection onNavigate={setActiveSection} />}
          {activeSection === 'nosotros' && <AboutSection />}
          {activeSection === 'diferenciacion' && <DifferentiationSection />}
          {activeSection === 'dashboard' && <DashboardPreviewSection />}
          {activeSection === 'precios' && <PricingSection />}
          {activeSection === 'contacto' && <ContactSection />}
        </div>
      </main>
      
      {activeSection === 'contacto' && <Footer />}
      <AIAssistant />
    </div>
  )
}
