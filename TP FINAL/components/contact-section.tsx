'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Mail, Send } from 'lucide-react'
import { useState } from 'react'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log('Form submitted:', formData)
  }

  return (
    <section className="min-h-screen flex items-center justify-center py-20 pt-32 md:pt-40 relative border-t"
      style={{ 
        borderColor: 'oklch(0.75 0.25 200 / 0.2)',
        borderTopWidth: '1px',
      }}
    >
      <div className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 30%, oklch(0.7 0.28 320 / 0.2), transparent 70%)',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance tracking-tight"
            style={{ 
              color: 'oklch(0.98 0.01 200)',
              textShadow: '0 2px 8px oklch(0 0 0 / 0.2)',
            }}
          >
            Contacto Empresarial
          </h2>
          <p className="text-lg text-pretty leading-relaxed"
            style={{ color: 'oklch(0.7 0.05 200)' }}
          >
            ¿Listo para transformar su investigación con nuestras soluciones? Contáctenos para solicitar una demo, conocer nuestros planes o resolver cualquier consulta.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="glass"
            style={{
              borderColor: 'oklch(0.3 0.1 200 / 0.2)',
              boxShadow: '0 8px 32px oklch(0 0 0 / 0.12)',
            }}
          >
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-4"
                style={{ background: 'oklch(0.65 0.2 200 / 0.15)' }}
              >
                <Mail className="h-6 w-6" style={{ color: 'oklch(0.65 0.2 200)' }} />
              </div>
              <CardTitle className="text-2xl font-semibold" style={{ color: 'oklch(0.98 0.01 200)' }}>
                Envíanos un Mensaje
              </CardTitle>
              <CardDescription className="text-base leading-relaxed" style={{ color: 'oklch(0.7 0.05 200)' }}>
                Responderemos a tu consulta a la brevedad posible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" style={{ color: 'oklch(0.95 0.01 200)' }}>
                    Nombre Completo
                  </Label>
                  <Input 
                    id="name"
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="glass border"
                    style={{ borderColor: 'oklch(0.75 0.25 200 / 0.3)' }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" style={{ color: 'oklch(0.95 0.01 200)' }}>
                    Correo Electrónico
                  </Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="correo@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="glass border"
                    style={{ borderColor: 'oklch(0.75 0.25 200 / 0.3)' }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization" style={{ color: 'oklch(0.95 0.01 200)' }}>
                    Organización / Universidad
                  </Label>
                  <Input 
                    id="organization"
                    placeholder="Nombre de su organización"
                    value={formData.organization}
                    onChange={(e) => setFormData({...formData, organization: e.target.value})}
                    className="glass border"
                    style={{ borderColor: 'oklch(0.75 0.25 200 / 0.3)' }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" style={{ color: 'oklch(0.95 0.01 200)' }}>
                    Mensaje
                  </Label>
                  <Textarea 
                    id="message"
                    placeholder="Cuéntanos sobre sus necesidades o solicite una demo personalizada..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    className="glass border"
                    style={{ borderColor: 'oklch(0.75 0.25 200 / 0.3)' }}
                  />
                </div>
                <Button type="submit" className="w-full btn-primary font-semibold" size="lg">
                  <Send className="mr-2 h-5 w-5" />
                  Enviar Mensaje
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>
              También puedes contactarnos directamente en:{' '}
              <a href="mailto:contacto@biogrowthanalytics.com" className="hover:underline font-semibold transition-colors cursor-pointer"
                style={{ color: 'oklch(0.65 0.2 200)' }}
              >
                contacto@biogrowthanalytics.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
