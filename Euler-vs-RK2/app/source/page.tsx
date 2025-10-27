import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SourcePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 tech-grid opacity-20"></div>
      <div className="container mx-auto px-4 py-24 max-w-6xl relative z-10">
      <div className="mb-8 animate-fade-in-up">
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all duration-300"
          >
            ← Volver
          </Button>
        </Link>
      </div>

      <div className="text-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <h1 className="text-6xl font-bold mb-4 gradient-text">
          Acerca de este Proyecto
        </h1>
        <div className="h-1 w-32 mx-auto bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-full"></div>
      </div>

      {/* Section 1: Inteligencias Artificiales Utilizadas */}
      <div className="mb-16 border-2 rounded-2xl p-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-cyan-500/40 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-cyan-500/50">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-cyan-400">
            Inteligencias Artificiales Utilizadas
          </h2>
        </div>

        <p className="text-lg mb-8 text-gray-300">
          Esta presentación educativa fue desarrollada con la asistencia de las siguientes herramientas de inteligencia
          artificial:
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* ChatGPT Card */}
          <div className="bg-gradient-to-br from-red-950/40 to-red-900/20 p-6 rounded-xl border-2 border-red-500/50 hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-500 transform hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl bg-gradient-to-br from-red-600 to-red-800 shadow-lg shadow-red-500/50">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-red-300">ChatGPT</h3>
            </div>
            <p className="text-sm font-semibold mb-2 text-red-400">Desarrollado por: OpenAI</p>
            <p className="text-sm mb-3 text-gray-300">
              <strong>Función:</strong> Asistencia en la estructuración del contenido educativo, revisión de conceptos
              matemáticos y generación de explicaciones claras sobre cifras significativas y teoría de errores.
            </p>
            <p className="text-sm text-gray-400">
              <strong>Contribución:</strong> Organización pedagógica del material y verificación de la precisión
              matemática de los ejercicios.
            </p>
          </div>

          {/* V0 Card */}
          <div className="bg-gradient-to-br from-yellow-950/40 to-yellow-900/20 p-6 rounded-xl border-2 border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/30 transition-all duration-500 transform hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-slate-900 font-bold text-xl bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/50">
                V0
              </div>
              <h3 className="text-xl font-bold text-yellow-300">V0</h3>
            </div>
            <p className="text-sm font-semibold mb-2 text-yellow-400">Desarrollado por: Vercel</p>
            <p className="text-sm mb-3 text-gray-300">
              <strong>Función:</strong> Generación del código de la interfaz web interactiva, implementación de
              componentes React y diseño responsivo de la presentación.
            </p>
            <p className="text-sm text-gray-400">
              <strong>Contribución:</strong> Desarrollo completo de la aplicación web, incluyendo navegación,
              interactividad y diseño visual moderno.
            </p>
          </div>

          {/* Gemini Card */}
          <div className="bg-gradient-to-br from-blue-950/40 to-blue-900/20 p-6 rounded-xl border-2 border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 transform hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg shadow-blue-500/50">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-300">Gemini</h3>
            </div>
            <p className="text-sm font-semibold mb-2 text-blue-400">Desarrollado por: Google</p>
            <p className="text-sm mb-3 text-gray-300">
              <strong>Función:</strong> Asistencia en la generación de contenido estructurado, refinamiento de la
              experiencia de usuario y creación de prompts detallados y precisos.
            </p>
            <p className="text-sm text-gray-400">
              <strong>Contribución:</strong> Estructuración de la presentación comparativa, autoría del contenido
              textual del sitio web y generación del prompt final para implementar las revisiones.
            </p>
          </div>
        </div>

        <div className="bg-slate-700/40 p-6 rounded-xl border border-cyan-500/30">
          <h3 className="text-xl font-bold mb-3 text-cyan-300">Metodología de Desarrollo</h3>
          <p className="text-gray-300 leading-relaxed">
            El proyecto fue desarrollado mediante una colaboración entre ambas IAs. ChatGPT proporcionó la base
            conceptual y pedagógica del contenido matemático, mientras que V0 se encargó de la implementación técnica y
            el diseño de la interfaz de usuario. Esta sinergia permitió crear una herramienta educativa que combina
            rigor académico con una experiencia de usuario moderna e intuitiva.
          </p>
        </div>
      </div>

      <div className="border-2 rounded-2xl p-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-red-500/40 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-4xl font-bold mb-8 text-red-400">
          Información del Proyecto
        </h2>

        <div className="grid md:grid-cols-[1fr,1fr] gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-cyan-400">
                Objetivo Educativo
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Facilitar el aprendizaje de conceptos fundamentales sobre cifras significativas exactas y su relación
                con las cotas de error en el análisis numérico.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-cyan-400">
                Tecnologías Utilizadas
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Next.js 14 (React Framework)</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Shadcn/ui Components</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Boxed Section */}
          <div className="p-6 rounded-xl border-2 h-fit bg-gradient-to-br from-cyan-950/40 to-cyan-900/20 border-cyan-500/50">
            <h3 className="text-xl font-bold mb-4 text-cyan-300">
              Características Principales
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Navegación intuitiva en múltiples páginas.</li>
              <li>• Presentación de contenido en tarjetas comparativas.</li>
              <li>• Renderizado profesional de fórmulas matemáticas con LaTeX.</li>
              <li>• Diseño limpio y moderno con una paleta de colores definida.</li>
              <li>• Diseño responsivo para visualización en diferentes dispositivos.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
