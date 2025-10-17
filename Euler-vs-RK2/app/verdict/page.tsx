"use client"; // Esencial para que las librerías del navegador funcionen

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InlineMath, BlockMath } from 'react-katex';

export default function VerdictPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl">
      <h1 className="text-5xl font-bold mb-4 text-center" style={{ color: "var(--color-primary)" }}>
        Round Final: El Análisis Técnico
      </h1>
      <p className="text-xl text-center mb-12" style={{ color: "var(--color-secondary)" }}>
        Error y Estabilidad
      </p>

      <div className="space-y-12 mb-16">
        {/* Precision Section */}
        <div className="bg-muted p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6" style={{ color: "var(--color-primary)" }}>
            Precisión y Orden de Error
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border-2" style={{ borderColor: "var(--color-primary)" }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: "var(--color-primary)" }}>
                Euler: Primer Orden
              </h3>
              {/* CORRECCIÓN APLICADA AQUÍ */}
              <div className="mb-4 text-center text-lg">
                <BlockMath math={"\\text{Error} = O(h)"} />
              </div>
              <p className="text-muted-foreground mb-4">
                El error global es <strong>directamente proporcional</strong> al tamaño del paso <InlineMath math={"h"} />.
              </p>
              <div className="bg-red-50 p-4 rounded">
                <p className="text-sm">
                  ⚠️ Si quieres la mitad de error, tienes que hacer el <strong>doble de cálculos</strong>.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-2" style={{ borderColor: "var(--color-secondary)" }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: "var(--color-secondary)" }}>
                RK2: Segundo Orden
              </h3>
              {/* CORRECCIÓN APLICADA AQUÍ */}
              <div className="mb-4 text-center text-lg">
                <BlockMath math={"\\text{Error} = O(h^2)"} />
              </div>
              <p className="text-muted-foreground mb-4">
                El error es proporcional al <strong>cuadrado del paso</strong> <InlineMath math={"h^2"} />.
              </p>
              <div className="bg-green-50 p-4 rounded">
                <p className="text-sm">
                  ✓ Si reduces el paso a la mitad, ¡el error se reduce a <strong>una cuarta parte</strong>! Mucho más eficiente.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stability Section */}
        <div className="bg-muted p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6" style={{ color: "var(--color-primary)" }}>
            Estabilidad
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3" style={{ color: "var(--color-primary)" }}>
                Euler
              </h3>
              <p className="text-muted-foreground">
                En problemas con soluciones que cambian muy rápido u oscilan, Euler puede volverse{" "}
                <strong>inestable</strong>. Los pequeños errores se acumulan y la solución numérica puede "explotar" y diverger completamente de la real.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3" style={{ color: "var(--color-secondary)" }}>
                RK2
              </h3>
              <p className="text-muted-foreground">
                Es inherentemente <strong>más estable</strong>. Su mejor aproximación de la pendiente en cada paso le permite seguir la solución real con mayor fidelidad, incluso con pasos más grandes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final Verdict Table */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-lg border-2 border-gray-300 mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center">El Veredicto Final</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left p-4 font-bold">Característica</th>
                <th className="text-left p-4 font-bold" style={{ color: "var(--color-primary)" }}>Método de Euler</th>
                <th className="text-left p-4 font-bold" style={{ color: "var(--color-secondary)" }}>Runge-Kutta 2 (RK2)</th>
                <th className="text-center p-4 font-bold">Ganador</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 bg-white">
                <td className="p-4 font-semibold">Estrategia</td>
                <td className="p-4 text-sm">Simple y directa. Usa la pendiente inicial.</td>
                <td className="p-4 text-sm">Sofisticada. Usa una pendiente promedio en el punto medio.</td>
                <td className="p-4 text-center text-2xl">🏆</td>
              </tr>
              <tr className="border-b border-gray-200 bg-white">
                <td className="p-4 font-semibold">Precisión (Orden)</td>
                {/* CORRECCIÓN APLICADA AQUÍ */}
                <td className="p-4 text-sm">Baja. Primer orden, <InlineMath math={"O(h)"} /></td>
                <td className="p-4 text-sm">Alta. Segundo orden, <InlineMath math={"O(h^2)"} /></td>
                <td className="p-4 text-center text-2xl">🏆</td>
              </tr>
              <tr className="border-b border-gray-200 bg-white">
                <td className="p-4 font-semibold">Costo por Paso</td>
                <td className="p-4 text-sm">Bajo (1 evaluación de la función)</td>
                <td className="p-4 text-sm">Medio (2 evaluaciones de la función)</td>
                <td className="p-4 text-center text-2xl">⚡</td>
              </tr>
              <tr className="border-b border-gray-200 bg-white">
                <td className="p-4 font-semibold">Estabilidad</td>
                <td className="p-4 text-sm">Baja. Puede divergir fácilmente.</td>
                <td className="p-4 text-sm">Alta. Mucho más robusto.</td>
                <td className="p-4 text-center text-2xl">🏆</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-lg mb-12">
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

      <div className="text-center">
        <Link href="/source">
          <Button
            size="lg"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "white",
            }}
          >
            Ver Material de Referencia →
          </Button>
        </Link>
      </div>
    </div>
  )
}

