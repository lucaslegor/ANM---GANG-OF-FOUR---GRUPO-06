"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InlineMath, BlockMath } from 'react-katex';

export default function VerdictPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 tech-grid opacity-20"></div>
      <div className="container mx-auto px-4 py-24 max-w-6xl relative z-10">
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-6xl font-bold mb-4 gradient-text">
          Round Final: El Análisis Técnico
        </h1>
        <div className="h-1 w-40 mx-auto bg-gradient-to-r from-red-500 to-blue-500 rounded-full mb-6"></div>
        <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          Error y Estabilidad
        </p>
      </div>

      {/* Video Section - contorno rojo neón estilo pelea */}
      <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="p-4 rounded-2xl border-2 border-red-500/60 bg-gradient-to-br from-slate-900/60 to-slate-900/30 backdrop-blur-sm transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_35px] hover:shadow-red-500/40 hover:ring-4 hover:ring-red-600/50 hover:ring-offset-2 hover:ring-offset-slate-900">
          <div className="rounded-xl overflow-hidden">
            <video
              className="w-full h-auto block"
              controls
              src="/euler.mp4?v=1"
            >
              Tu navegador no soporta video HTML5.
            </video>
          </div>
        </div>
      </div>

      <div className="space-y-12 mb-16">
        {/* Precision Section */}
        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-8 rounded-2xl border border-red-500/30 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-4xl font-bold mb-6 text-red-400">
            Precisión y Orden de Error
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-red-950/40 to-red-900/20 p-6 rounded-xl border-2 border-red-500 neon-border hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-500">
              <h3 className="text-2xl font-bold mb-3 text-red-300">
                Euler: Primer Orden
              </h3>
              <div className="mb-4 text-center text-lg text-gray-200">
                <BlockMath math={"\\text{Error} = O(h)"} />
              </div>
              <p className="text-gray-300 mb-4">
                El error global es <strong>directamente proporcional</strong> al tamaño del paso <InlineMath math={"h"} />.
              </p>
              <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/40">
                <p className="text-sm text-gray-300">
                  ⚠️ Si quieres la mitad de error, tienes que hacer el <strong>doble de cálculos</strong>.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-950/40 to-blue-900/20 p-6 rounded-xl border-2 border-blue-500 neon-border hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500">
              <h3 className="text-2xl font-bold mb-3 text-blue-300">
                RK2: Segundo Orden
              </h3>
              <div className="mb-4 text-center text-lg text-gray-200">
                <BlockMath math={"\\text{Error} = O(h^2)"} />
              </div>
              <p className="text-gray-300 mb-4">
                El error es proporcional al <strong>cuadrado del paso</strong> <InlineMath math={"h^2"} />.
              </p>
              <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/40">
                <p className="text-sm text-gray-300">
                  ✓ Si reduces el paso a la mitad, ¡el error se reduce a <strong>una cuarta parte</strong>! Mucho más eficiente.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stability Section */}
        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-8 rounded-2xl border border-blue-500/30 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-4xl font-bold mb-6 text-blue-400">
            Estabilidad
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-red-950/30 to-red-900/10 p-6 rounded-xl border border-red-500/30 hover:shadow-xl hover:shadow-red-500/20 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-3 text-red-300">
                Euler
              </h3>
              <p className="text-gray-300">
                En problemas con soluciones que cambian muy rápido u oscilan, Euler puede volverse{" "}
                <strong>inestable</strong>. Los pequeños errores se acumulan y la solución numérica puede "explotar" y diverger completamente de la real.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-950/30 to-blue-900/10 p-6 rounded-xl border border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-3 text-blue-300">
                RK2
              </h3>
              <p className="text-gray-300">
                Es inherentemente <strong>más estable</strong>. Su mejor aproximación de la pendiente en cada paso le permite seguir la solución real con mayor fidelidad, incluso con pasos más grandes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final Verdict Table */}
      <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-8 rounded-2xl border-2 border-cyan-500/40 mb-12 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <h2 className="text-4xl font-bold mb-8 text-center text-cyan-300">El Veredicto Final</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-cyan-500/50">
                <th className="text-left p-4 font-bold text-cyan-300">Característica</th>
                <th className="text-left p-4 font-bold text-red-400">Método de Euler</th>
                <th className="text-left p-4 font-bold text-blue-400">Runge-Kutta 2 (RK2)</th>
                <th className="text-center p-4 font-bold text-yellow-400">Ganador</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700 bg-slate-800/40 hover:bg-slate-700/40 transition-colors">
                <td className="p-4 font-semibold text-cyan-200">Estrategia</td>
                <td className="p-4 text-sm text-gray-300">Simple y directa. Usa la pendiente inicial.</td>
                <td className="p-4 text-sm text-gray-300">Sofisticada. Usa una pendiente promedio en el punto medio.</td>
                <td className="p-4 text-center text-2xl">🏆</td>
              </tr>
              <tr className="border-b border-slate-700 bg-slate-800/40 hover:bg-slate-700/40 transition-colors">
                <td className="p-4 font-semibold text-cyan-200">Precisión (Orden)</td>
                <td className="p-4 text-sm text-gray-300">Baja. Primer orden, <InlineMath math={"O(h)"} /></td>
                <td className="p-4 text-sm text-gray-300">Alta. Segundo orden, <InlineMath math={"O(h^2)"} /></td>
                <td className="p-4 text-center text-2xl">🏆</td>
              </tr>
              <tr className="border-b border-slate-700 bg-slate-800/40 hover:bg-slate-700/40 transition-colors">
                <td className="p-4 font-semibold text-cyan-200">Costo por Paso</td>
                <td className="p-4 text-sm text-gray-300">Bajo (1 evaluación de la función)</td>
                <td className="p-4 text-sm text-gray-300">Medio (2 evaluaciones de la función)</td>
                <td className="p-4 text-center text-2xl">⚡</td>
              </tr>
              <tr className="border-b border-slate-700 bg-slate-800/40 hover:bg-slate-700/40 transition-colors">
                <td className="p-4 font-semibold text-cyan-200">Estabilidad</td>
                <td className="p-4 text-sm text-gray-300">Baja. Puede divergir fácilmente.</td>
                <td className="p-4 text-sm text-gray-300">Alta. Mucho más robusto.</td>
                <td className="p-4 text-center text-2xl">🏆</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-2xl mb-12 border-2 border-green-400/50 shadow-2xl hover:shadow-green-500/50 transition-all duration-500 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
        <h3 className="text-3xl font-bold mb-4 text-center">🏆 Veredicto Final</h3>
        <p className="text-lg text-center max-w-4xl mx-auto leading-relaxed">
          Aunque Euler gana en simplicidad y costo por paso, <strong>Runge-Kutta 2 es el vencedor indiscutible</strong>{" "}
          en la práctica por su abrumadora ventaja en precisión y estabilidad.
        </p>
        <p className="text-center mt-6 text-lg">
          El método de Euler es una fantástica herramienta educativa y útil para aproximaciones rápidas y sencillas,
          pero cuando la precisión importa,{" "}
          <strong>RK2 ofrece un equilibrio casi perfecto entre eficiencia y exactitud</strong>.
        </p>
      </div>

      <div className="text-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
        <Link href="/source">
          <Button
            size="lg"
            className="px-10 py-7 font-bold rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105 border-2 border-red-400/50"
          >
            Ver Material de Referencia →
          </Button>
        </Link>
      </div>
    </div>
    </div>
  )
}
