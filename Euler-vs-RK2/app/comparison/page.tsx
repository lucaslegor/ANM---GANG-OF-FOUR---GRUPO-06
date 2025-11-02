import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ComparisonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 tech-grid opacity-20"></div>
      <div className="container mx-auto px-4 py-24 max-w-6xl relative z-10">
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-6xl font-bold mb-4 gradient-text">
          Round 2: El Enfrentamiento
        </h1>
        <div className="h-1 w-40 mx-auto bg-gradient-to-r from-red-500 to-blue-500 rounded-full mb-6"></div>
        <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          Un Ejemplo Práctico
        </p>
      </div>

      <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-8 rounded-2xl mb-12 border border-cyan-500/30 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-3xl font-bold mb-4 text-center text-cyan-300">El Problema de Valor Inicial</h2>
        <div className="text-center space-y-4 text-gray-200">
          <div className="text-lg">$$y' = 2xy$$</div>
          <div className="text-lg">$$y(1) = 1$$</div>
          <div className="text-lg">$$h = 0.1$$</div>
          <div className="mt-6 p-4 bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 rounded-xl border-2 border-yellow-400/50 backdrop-blur-sm">
            <p className="font-semibold mb-2 text-yellow-300">Solución Analítica (Exacta):</p>
            <div>$$y(x) = e^{"{x^2 - 1}"}$$</div>
            <p className="mt-4 text-gray-300">
              Para el primer paso, el valor real de $$y(1.1) \approx 1.2337$$
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-400 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>Cálculo del Primer Paso</h2>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Euler Calculation */}
        <div className="border-2 rounded-2xl p-6 bg-gradient-to-br from-red-950/40 to-red-900/20 backdrop-blur-sm animate-slide-in-left hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-500 neon-border" style={{ borderColor: "#ea1f27" }}>
          <h3 className="text-3xl font-bold mb-4 text-red-400">
            Método de Euler
          </h3>

          <div className="space-y-4">
            <div className="bg-slate-800/60 p-4 rounded-xl border border-red-500/30">
              <p className="font-semibold mb-2 text-red-300">Fórmula:</p>
              <div className="text-center"><p className="mt-4 text-gray-300">$$y_1 = y_0 + h \cdot f(x_0, y_0)$$</p></div>
            </div>

            <div>
              <p className="font-semibold mb-2 text-red-300">Sustitución:</p>
              <div className="text-sm space-y-2 text-gray-300">
                <div>$$y_1 = 1 + 0.1 \cdot (2 \cdot 1 \cdot 1)$$</div>
                <div>$$y_1 = 1 + 0.1 \cdot 2$$</div>
                <div>$$y_1 = 1 + 0.2$$</div>
              </div>
            </div>

            <div className="bg-red-900/40 p-4 rounded-xl border-2 border-red-500 animate-glow">
              <p className="font-bold text-center text-xl text-red-200">$$y_1 = 1.20$$</p>
            </div>

            <div className="bg-red-900/30 p-4 rounded-xl border border-red-500/50">
              <p className="font-semibold text-red-300">Error:</p>
              <p className="text-2xl font-bold text-center text-red-400">
                0.0337
              </p>
              <p className="text-sm text-center text-gray-400 mt-2">|1.2337 - 1.20| = 0.0337</p>
            </div>
          </div>
        </div>

        {/* RK2 Calculation */}
        <div className="border-2 rounded-2xl p-6 bg-gradient-to-br from-blue-950/40 to-blue-900/20 backdrop-blur-sm animate-slide-in-right hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 neon-border" style={{ borderColor: "#26a7df" }}>
          <h3 className="text-3xl font-bold mb-4 text-blue-400">
            Runge-Kutta 2
          </h3>

          <div className="space-y-4">
            <div className="bg-slate-800/60 p-4 rounded-xl border border-blue-500/30">
              <p className="font-semibold mb-2 text-blue-300">Paso 1 - Predicción:</p>
              <div className="text-sm space-y-1 text-gray-300">
                <div>$$k_1 = h \cdot f(x_0, y_0)$$</div>
                <div>$$k_1 = 0.1 \cdot (2 \cdot 1 \cdot 1) = 0.2$$</div>
              </div>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-blue-500/30">
              <p className="font-semibold mb-2 text-blue-300">Paso 2 - Corrección:</p>
              <div className="text-sm space-y-2 text-gray-300">
                <div>$$y_1 = y_0 + h \cdot f(x_0 + h/2, y_0 + k_1/2)$$</div>
                <div>$$y_1 = 1 + 0.1 \cdot f(1.05, 1.1)$$</div>
                <div>$$y_1 = 1 + 0.1 \cdot (2 \cdot 1.05 \cdot 1.1)$$</div>
                <div>$$y_1 = 1 + 0.1 \cdot 2.31$$</div>
              </div>
            </div>

            <div className="bg-blue-900/40 p-4 rounded-xl border-2 border-blue-500 animate-glow-blue">
              <p className="font-bold text-center text-xl text-blue-200">$$y_1 = 1.231$$</p>
            </div>

            <div className="bg-green-900/30 p-4 rounded-xl border border-green-500/50">
              <p className="font-semibold text-green-300">Error:</p>
              <p className="text-2xl font-bold text-center text-green-400">0.0027</p>
              <p className="text-sm text-center text-gray-400 mt-2">|1.2337 - 1.231| = 0.0027</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-2 border-green-500 rounded-2xl p-8 mb-12 backdrop-blur-sm animate-fade-in-up hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-500" style={{ animationDelay: '0.6s' }}>
        <h3 className="text-3xl font-bold mb-4 text-center text-green-300">🏆 Veredicto del Round</h3>
        <p className="text-lg text-center max-w-3xl mx-auto text-gray-200">
          <strong>RK2 gana por KO técnico.</strong> Con el mismo tamaño de paso, el error de RK2 es{" "}
          <strong>más de 10 veces menor</strong> que el de Euler. La estrategia de "predecir y corregir" claramente da
          sus frutos.
        </p>
        <div className="text-center mt-6">
          <p className="text-3xl font-bold text-green-400">Error RK2 / Error Euler = 0.0027 / 0.0337 ≈ 0.08</p>
          <p className="text-gray-300 mt-2">El error de RK2 es un 8% del de Euler. RK2 es aproximadamente 12 veces más preciso</p>
        </div>
      </div>

      <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
        <Link href="/verdict">
          <Button
            size="lg"
            className="px-10 py-7 font-bold rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105 border-2 border-red-400/50"
          >
            Ver el Veredicto Final →
          </Button>
        </Link>
      </div>
    </div>
    </div>
  )
}
