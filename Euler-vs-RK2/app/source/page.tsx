import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SourcePage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl">
      <div className="mb-8">
        <Link href="/">
          <Button variant="outline" size="sm">
            ← Volver
          </Button>
        </Link>
      </div>

      <h1 className="text-5xl font-bold mb-16 text-center" style={{ color: "var(--color-primary)" }}>
        Acerca de este Proyecto
      </h1>

      {/* Section 1: Inteligencias Artificiales Utilizadas */}
      <div
        className="mb-16 border-4 rounded-lg p-8"
        style={{ borderColor: "var(--color-secondary)", backgroundColor: "#E3F2FD" }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#26A7DF] rounded flex items-center justify-center text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold" style={{ color: "var(--color-secondary)" }}>
            Inteligencias Artificiales Utilizadas
          </h2>
        </div>

        <p className="text-lg mb-8 text-gray-700">
          Esta presentación educativa fue desarrollada con la asistencia de las siguientes herramientas de inteligencia
          artificial:
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* ChatGPT Card */}
          <div
            className="bg-white p-6 rounded-lg border-2"
            style={{ backgroundColor: "#FFE5E5", borderColor: "#EA1F27" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">ChatGPT</h3>
            </div>
            <p className="text-sm font-semibold mb-2">Desarrollado por: OpenAI</p>
            <p className="text-sm mb-3">
              <strong>Función:</strong> Asistencia en la estructuración del contenido educativo, revisión de conceptos
              matemáticos y generación de explicaciones claras sobre cifras significativas y teoría de errores.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Contribución:</strong> Organización pedagógica del material y verificación de la precisión
              matemática de los ejercicios.
            </p>
          </div>

          {/* V0 Card */}
          <div
            className="bg-white p-6 rounded-lg border-2"
            style={{ backgroundColor: "#FFFACD", borderColor: "#FAEC1D" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-black font-bold text-xl"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                V0
              </div>
              <h3 className="text-xl font-bold">V0</h3>
            </div>
            <p className="text-sm font-semibold mb-2">Desarrollado por: Vercel</p>
            <p className="text-sm mb-3">
              <strong>Función:</strong> Generación del código de la interfaz web interactiva, implementación de
              componentes React y diseño responsivo de la presentación.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Contribución:</strong> Desarrollo completo de la aplicación web, incluyendo navegación,
              interactividad y diseño visual moderno.
            </p>
          </div>

          {/* Gemini Card */}
          <div
            className="bg-white p-6 rounded-lg border-2"
            style={{ backgroundColor: "#E3F2FD", borderColor: "#26A7DF" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Gemini</h3>
            </div>
            <p className="text-sm font-semibold mb-2">Desarrollado por: Google</p>
            <p className="text-sm mb-3">
              <strong>Función:</strong> Asistencia en la generación de contenido estructurado, refinamiento de la
              experiencia de usuario y creación de prompts detallados y precisos.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Contribución:</strong> Estructuración de la presentación comparativa, autoría del contenido
              textual del sitio web y generación del prompt final para implementar las revisiones.
            </p>
          </div>
        </div>

        <div className="bg-white/50 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">Metodología de Desarrollo</h3>
          <p className="text-gray-700 leading-relaxed">
            El proyecto fue desarrollado mediante una colaboración entre ambas IAs. ChatGPT proporcionó la base
            conceptual y pedagógica del contenido matemático, mientras que V0 se encargó de la implementación técnica y
            el diseño de la interfaz de usuario. Esta sinergia permitió crear una herramienta educativa que combina
            rigor académico con una experiencia de usuario moderna e intuitiva.
          </p>
        </div>
      </div>

      <div className="border-4 rounded-lg p-8" style={{ borderColor: "var(--color-primary)" }}>
        <h2 className="text-3xl font-bold mb-8" style={{ color: "var(--color-primary)" }}>
          Información del Proyecto
        </h2>

        <div className="grid md:grid-cols-[1fr,1fr] gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: "var(--color-secondary)" }}>
                Objetivo Educativo
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Facilitar el aprendizaje de conceptos fundamentales sobre cifras significativas exactas y su relación
                con las cotas de error en el análisis numérico.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: "var(--color-secondary)" }}>
                Tecnologías Utilizadas
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Next.js 14 (React Framework)</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Shadcn/ui Components</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Boxed Section */}
          <div
            className="p-6 rounded-lg border-2 h-fit"
            style={{ backgroundColor: "#E3F2FD", borderColor: "var(--color-secondary)" }}
          >
            <h3 className="text-xl font-bold mb-4" style={{ color: "var(--color-secondary)" }}>
              Características Principales
            </h3>
            <ul className="space-y-2 text-gray-700">
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
  )
}
