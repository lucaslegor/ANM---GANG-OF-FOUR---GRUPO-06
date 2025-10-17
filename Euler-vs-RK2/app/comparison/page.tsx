import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ComparisonPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl">
      <h1 className="text-5xl font-bold mb-4 text-center" style={{ color: "var(--color-primary)" }}>
        Round 2: El Enfrentamiento
      </h1>
      <p className="text-xl text-center mb-12" style={{ color: "var(--color-secondary)" }}>
        Un Ejemplo Práctico
      </p>

      <div className="bg-muted p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center">El Problema de Valor Inicial</h2>
        <div className="text-center space-y-4">
          <div className="text-lg">$$y' = 2xy$$</div>
          <div className="text-lg">$$y(1) = 1$$</div>
          <div className="text-lg">$$h = 0.1$$</div>
          <div className="mt-6 p-4 bg-white rounded border-2" style={{ borderColor: "var(--color-accent)" }}>
            <p className="font-semibold mb-2">Solución Analítica (Exacta):</p>
            <div>$$y(x) = e^{"{x^2 - 1}"}$$</div>
            <p className="mt-4 text-muted-foreground">
              Para el primer paso, el valor real de $$y(1.1) \approx 1.2337$$
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center">Cálculo del Primer Paso</h2>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Euler Calculation */}
        <div className="border-2 rounded-lg p-6" style={{ borderColor: "var(--color-primary)" }}>
          <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--color-primary)" }}>
            Método de Euler
          </h3>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded">
              <p className="font-semibold mb-2">Fórmula:</p>
              <div className="text-center">$$y_1 = y_0 + h \cdot f(x_0, y_0)$$</div>
            </div>

            <div>
              <p className="font-semibold mb-2">Sustitución:</p>
              <div className="text-sm space-y-2">
                <div>$$y_1 = 1 + 0.1 \cdot (2 \cdot 1 \cdot 1)$$</div>
                <div>$$y_1 = 1 + 0.1 \cdot 2$$</div>
                <div>$$y_1 = 1 + 0.2$$</div>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded border-2" style={{ borderColor: "var(--color-primary)" }}>
              <p className="font-bold text-center text-xl">$$y_1 = 1.20$$</p>
            </div>

            <div className="bg-red-100 p-4 rounded">
              <p className="font-semibold">Error:</p>
              <p className="text-2xl font-bold text-center" style={{ color: "var(--color-primary)" }}>
                0.0337
              </p>
              <p className="text-sm text-center text-muted-foreground mt-2">|1.2337 - 1.20| = 0.0337</p>
            </div>
          </div>
        </div>

        {/* RK2 Calculation */}
        <div className="border-2 rounded-lg p-6" style={{ borderColor: "var(--color-secondary)" }}>
          <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--color-secondary)" }}>
            Runge-Kutta 2
          </h3>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded">
              <p className="font-semibold mb-2">Paso 1 - Predicción:</p>
              <div className="text-sm space-y-1">
                <div>$$k_1 = h \cdot f(x_0, y_0)$$</div>
                <div>$$k_1 = 0.1 \cdot (2 \cdot 1 \cdot 1) = 0.2$$</div>
              </div>
            </div>

            <div className="bg-muted p-4 rounded">
              <p className="font-semibold mb-2">Paso 2 - Corrección:</p>
              <div className="text-sm space-y-2">
                <div>$$y_1 = y_0 + h \cdot f(x_0 + h/2, y_0 + k_1/2)$$</div>
                <div>$$y_1 = 1 + 0.1 \cdot f(1.05, 1.1)$$</div>
                <div>$$y_1 = 1 + 0.1 \cdot (2 \cdot 1.05 \cdot 1.1)$$</div>
                <div>$$y_1 = 1 + 0.1 \cdot 2.31$$</div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded border-2 border-blue-400">
              <p className="font-bold text-center text-xl">$$y_1 = 1.231$$</p>
            </div>

            <div className="bg-green-100 p-4 rounded">
              <p className="font-semibold">Error:</p>
              <p className="text-2xl font-bold text-center text-green-700">0.0027</p>
              <p className="text-sm text-center text-muted-foreground mt-2">|1.2337 - 1.231| = 0.0027</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-500 rounded-lg p-8 mb-12">
        <h3 className="text-2xl font-bold mb-4 text-center text-green-800">🏆 Veredicto del Round</h3>
        <p className="text-lg text-center max-w-3xl mx-auto">
          <strong>RK2 gana por KO técnico.</strong> Con el mismo tamaño de paso, el error de RK2 es{" "}
          <strong>más de 10 veces menor</strong> que el de Euler. La estrategia de "predecir y corregir" claramente da
          sus frutos.
        </p>
        <div className="text-center mt-6">
          <p className="text-3xl font-bold text-green-700">Error RK2 / Error Euler = 0.0027 / 0.0337 ≈ 0.08</p>
          <p className="text-muted-foreground mt-2">RK2 es aproximadamente 12 veces más preciso</p>
        </div>
      </div>

      <div className="text-center">
        <Link href="/verdict">
          <Button
            size="lg"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "white",
            }}
          >
            Ver el Veredicto Final →
          </Button>
        </Link>
      </div>
    </div>
  )
}
