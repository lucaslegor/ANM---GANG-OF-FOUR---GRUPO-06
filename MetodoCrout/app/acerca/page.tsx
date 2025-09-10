"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Bot, Sparkles } from "lucide-react"

export default function AcercaPage() {
  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
            className="flex items-center gap-2 border-[#ea1f27] text-[#ea1f27] hover:bg-[#ea1f27] hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
          <h1 className="text-4xl font-bold text-[#ea1f27] text-balance">Acerca de este Proyecto</h1>
        </div>

        {/* AI Information Card */}
        <Card className="shadow-lg border-[#26a7df] border-2">
          <CardHeader className="bg-[#26a7df] text-white">
            <CardTitle className="text-2xl flex items-center gap-3">
              <Bot className="w-8 h-8" />
              Inteligencias Artificiales Utilizadas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 mt-4">
            <p className="text-gray-700 leading-relaxed">
              Esta presentación educativa fue desarrollada con la asistencia de las siguientes herramientas de
              inteligencia artificial:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* ChatGPT Card */}
              <div className="bg-[#ea1f27]/10 p-6 rounded-lg border border-[#ea1f27]">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-[#ea1f27]" />
                  <h3 className="text-xl font-bold text-[#ea1f27]">ChatGPT</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-700">
                  <p>
                    <strong>Desarrollado por:</strong> OpenAI
                  </p>
                  <p>
                    <strong>Función:</strong> Asistencia en la estructuración del contenido educativo, revisión de
                    conceptos matemáticos y generación de explicaciones claras sobre cifras significativas y teoría de
                    errores.
                  </p>
                  <p>
                    <strong>Contribución:</strong> Organización pedagógica del material y verificación de la precisión
                    matemática de los ejercicios.
                  </p>
                </div>
              </div>

              {/* V0 Card */}
              <div className="bg-[#faec1d]/20 p-6 rounded-lg border border-[#faec1d]">
                <div className="flex items-center gap-3 mb-4">
                  <Bot className="w-6 h-6 text-gray-700" />
                  <h3 className="text-xl font-bold text-gray-700">V0</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-700">
                  <p>
                    <strong>Desarrollado por:</strong> Vercel
                  </p>
                  <p>
                    <strong>Función:</strong> Generación del código de la interfaz web interactiva, implementación de
                    componentes React y diseño responsivo de la presentación.
                  </p>
                  <p>
                    <strong>Contribución:</strong> Desarrollo completo de la aplicación web, incluyendo navegación,
                    interactividad y diseño visual moderno.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
              <h4 className="font-semibold text-gray-800 mb-2">Metodología de Desarrollo</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                El proyecto fue desarrollado mediante una colaboración entre ambas IAs: ChatGPT proporcionó la base
                conceptual y pedagógica del contenido matemático, mientras que V0 se encargó de la implementación
                técnica y el diseño de la interfaz de usuario. Esta sinergia permitió crear una herramienta educativa
                que combina rigor académico con una experiencia de usuario moderna e intuitiva.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Project Information Card */}
        <Card className="shadow-lg border-[#ea1f27] border-2">
          <CardHeader className="bg-[#ea1f27] text-white">
            <CardTitle className="text-2xl">Información del Proyecto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 mt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-[#26a7df]">Objetivo Educativo</h4>
                <p className="text-sm text-gray-700">
                  Facilitar el aprendizaje de conceptos fundamentales sobre cifras significativas exactas y su relación
                  con las cotas de error en el análisis numérico.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-[#26a7df]">Tecnologías Utilizadas</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Next.js 14 (React Framework)</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• Shadcn/ui Components</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#26a7df]/10 p-4 rounded-lg border border-[#26a7df]">
              <h4 className="font-semibold text-[#26a7df] mb-2">Características Principales</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Presentación interactiva con elementos desplegables</li>
                <li>• Ejercicios prácticos con soluciones paso a paso</li>
                <li>• Diseño responsivo para diferentes dispositivos</li>
                <li>• Navegación intuitiva entre secciones</li>
                <li>• Fórmulas matemáticas claramente presentadas</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-gray-600">Gang Of Four - Presentación Educativa 2024</p>
        </div>
      </div>
    </div>
  )
}
