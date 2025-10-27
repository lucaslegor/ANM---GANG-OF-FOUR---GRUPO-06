import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated tech grid background */}
      <div className="absolute inset-0 tech-grid opacity-30"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-red-500/10 rounded-full blur-3xl top-20 left-20 animate-pulse-slow"></div>
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl bottom-20 right-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Animated lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-red-500 to-transparent top-1/4 animate-pulse-slow"></div>
        <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent top-3/4 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="animate-fade-in-up">
          <h1 className="text-7xl md:text-8xl font-bold mb-6 text-balance gradient-text drop-shadow-2xl">
            Euler vs. RK2
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-full mb-8 animate-pulse-slow"></div>
        </div>

        <p className="text-3xl md:text-4xl mb-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          El Duelo de los Métodos Numéricos
        </p>
        <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto text-balance animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Una comparación exhaustiva de precisión, eficiencia y estabilidad en la resolución de Problemas de Valor
          Inicial
        </p>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Link href="/methods">
            <Button
              size="lg"
              className="text-lg px-10 py-7 font-bold rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105 border-2 border-red-400/50"
            >
              Comenzar la Comparación →
            </Button>
          </Link>
        </div>

        <div className="mt-20 pb-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-red-500/30 hover:border-red-500/60 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="text-5xl mb-4 animate-float">🎯</div>
            <h3 className="font-bold text-xl mb-3 text-red-400">Precisión</h3>
            <p className="text-sm text-gray-400">Análisis del error y orden de convergencia</p>
          </div>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <div className="text-5xl mb-4 animate-float" style={{ animationDelay: '0.5s' }}>⚡</div>
            <h3 className="font-bold text-xl mb-3 text-yellow-400">Eficiencia</h3>
            <p className="text-sm text-gray-400">Costo computacional por iteración</p>
          </div>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            <div className="text-5xl mb-4 animate-float" style={{ animationDelay: '1s' }}>🛡️</div>
            <h3 className="font-bold text-xl mb-3 text-blue-400">Estabilidad</h3>
            <p className="text-sm text-gray-400">Comportamiento en problemas complejos</p>
          </div>
        </div>
      </div>
    </div>
  )
}
