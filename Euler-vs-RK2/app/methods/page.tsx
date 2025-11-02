import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function MethodsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 tech-grid opacity-20"></div>
      <div className="container mx-auto px-4 py-24 max-w-6xl relative z-10">
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-6xl font-bold mb-4 gradient-text">
          Round 1: La Estrategia de Cálculo
        </h1>
        <div className="h-1 w-40 mx-auto bg-gradient-to-r from-red-500 to-blue-500 rounded-full mb-6"></div>
        <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          Simplicidad vs. Inteligencia
        </p>
      </div>

      <div className="prose prose-lg max-w-none mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto">
          La diferencia fundamental entre ambos métodos radica en <strong className="text-cyan-400">cómo estiman la pendiente</strong> para dar el
          siguiente paso.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Euler Method */}
        <div className="border-2 rounded-2xl p-8 bg-gradient-to-br from-red-950/40 to-red-900/20 backdrop-blur-sm animate-slide-in-left hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-500 neon-border" style={{ borderColor: "#ea1f27" }}>
          <h2 className="text-4xl font-bold mb-4 text-red-400">
            Método de Euler
          </h2>
          <p className="text-sm uppercase tracking-wide mb-6 text-red-300">
            El Veterano: Simple y Directo
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg mb-2 text-red-300">Estrategia:</h3>
              <p className="text-gray-300">
                Calcula la pendiente <strong>una sola vez</strong>, al inicio del intervalo, y asume que se mantendrá
                constante durante todo el paso.
              </p>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-lg border border-red-500/30">
              <h4 className="font-semibold mb-2 text-red-300">Fórmula:</h4>
              <div className="text-center py-2 text-gray-300">$$y_{"{n+1}"} = y_n + h \cdot f(x_n, y_n)$$</div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2 text-green-400">✓ Ventaja:</h3>
              <p className="text-gray-300">
                Muy rápido y fácil de implementar. Solo requiere <strong>una evaluación</strong> de la función por paso.
              </p>
            </div>

            <div className="bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded">
              <h4 className="font-semibold mb-2 text-yellow-300">💡 Analogía:</h4>
              <p className="text-sm text-gray-300">
                Es como intentar seguir una carretera curva mirando únicamente la dirección en la que apuntas al empezar
                la curva. En curvas cerradas, te saldrás del camino rápidamente.
              </p>
            </div>
          </div>
        </div>

        {/* RK2 Method */}
        <div className="border-2 rounded-2xl p-8 bg-gradient-to-br from-blue-950/40 to-blue-900/20 backdrop-blur-sm animate-slide-in-right hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 neon-border" style={{ borderColor: "#26a7df" }}>
          <h2 className="text-4xl font-bold mb-4 text-blue-400">
            Runge-Kutta 2
          </h2>
          <p className="text-sm uppercase tracking-wide mb-6 text-blue-300">
            El Retador: Sofisticado y Preciso
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg mb-2 text-blue-300">Estrategia (Predictor-Corrector):</h3>
              <p className="text-gray-300">
                Sabe que la pendiente cambia, así que utiliza un enfoque de <strong>dos pasos</strong> para obtener una
                mejor estimación.
              </p>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-lg border border-blue-500/30">
              <h4 className="font-semibold mb-2 text-blue-300">Fórmulas:</h4>
              <div className="text-center py-2 space-y-2 text-gray-300">
                <div>$$k_1 = h \cdot f(x_n, y_n)$$</div>
                <div>
                  $$y_{"{n+1}"} = y_n + h \cdot f\left(x_n + \frac{"{h}"}
                  {"{2}"}, y_n + \frac{"{k_1}"}
                  {"{2}"}\right)$$
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2 text-orange-400">⚠ Desventaja:</h3>
              <p className="text-gray-300">
                Requiere el <strong>doble de trabajo</strong> por paso (dos evaluaciones de la función).
              </p>
            </div>

            <div className="bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
              <h4 className="font-semibold mb-2 text-blue-300">💡 Analogía:</h4>
              <p className="text-sm text-gray-300">
                En lugar de mirar solo al inicio de la curva, miras hacia la mitad para ajustar el volante. Tu
                trayectoria será mucho más fiel a la carretera.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
        <Link href="/comparison">
          <Button
            size="lg"
            className="px-10 py-7 font-bold rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105 border-2 border-red-400/50"
          >
            Ver la Comparación Práctica →
          </Button>
        </Link>
      </div>
    </div>
    </div>
  )
}
