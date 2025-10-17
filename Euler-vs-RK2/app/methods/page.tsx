import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function MethodsPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl">
      <h1 className="text-5xl font-bold mb-4 text-center" style={{ color: "var(--color-primary)" }}>
        Round 1: La Estrategia de Cálculo
      </h1>
      <p className="text-xl text-center mb-12" style={{ color: "var(--color-secondary)" }}>
        Simplicidad vs. Inteligencia
      </p>

      <div className="prose prose-lg max-w-none mb-12">
        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
          La diferencia fundamental entre ambos métodos radica en <strong>cómo estiman la pendiente</strong> para dar el
          siguiente paso.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Euler Method */}
        <div className="border-2 rounded-lg p-8" style={{ borderColor: "var(--color-primary)" }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--color-primary)" }}>
            Método de Euler
          </h2>
          <p className="text-sm uppercase tracking-wide mb-6" style={{ color: "var(--color-primary)" }}>
            El Veterano: Simple y Directo
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg mb-2">Estrategia:</h3>
              <p className="text-muted-foreground">
                Calcula la pendiente <strong>una sola vez</strong>, al inicio del intervalo, y asume que se mantendrá
                constante durante todo el paso.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Fórmula:</h4>
              <div className="text-center py-2">$$y_{"{n+1}"} = y_n + h \cdot f(x_n, y_n)$$</div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2 text-green-600">✓ Ventaja:</h3>
              <p className="text-muted-foreground">
                Muy rápido y fácil de implementar. Solo requiere <strong>una evaluación</strong> de la función por paso.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 p-4 rounded" style={{ borderColor: "var(--color-accent)" }}>
              <h4 className="font-semibold mb-2">💡 Analogía:</h4>
              <p className="text-sm">
                Es como intentar seguir una carretera curva mirando únicamente la dirección en la que apuntas al empezar
                la curva. En curvas cerradas, te saldrás del camino rápidamente.
              </p>
            </div>
          </div>
        </div>

        {/* RK2 Method */}
        <div className="border-2 rounded-lg p-8" style={{ borderColor: "var(--color-secondary)" }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--color-secondary)" }}>
            Runge-Kutta 2
          </h2>
          <p className="text-sm uppercase tracking-wide mb-6" style={{ color: "var(--color-secondary)" }}>
            El Retador: Sofisticado y Preciso
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg mb-2">Estrategia (Predictor-Corrector):</h3>
              <p className="text-muted-foreground">
                Sabe que la pendiente cambia, así que utiliza un enfoque de <strong>dos pasos</strong> para obtener una
                mejor estimación.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Fórmulas:</h4>
              <div className="text-center py-2 space-y-2">
                <div>$$k_1 = h \cdot f(x_n, y_n)$$</div>
                <div>
                  $$y_{"{n+1}"} = y_n + h \cdot f\left(x_n + \frac{"{h}"}
                  {"{2}"}, y_n + \frac{"{k_1}"}
                  {"{2}"}\right)$$
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2 text-orange-600">⚠ Desventaja:</h3>
              <p className="text-muted-foreground">
                Requiere el <strong>doble de trabajo</strong> por paso (dos evaluaciones de la función).
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <h4 className="font-semibold mb-2">💡 Analogía:</h4>
              <p className="text-sm">
                En lugar de mirar solo al inicio de la curva, miras hacia la mitad para ajustar el volante. Tu
                trayectoria será mucho más fiel a la carretera.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link href="/comparison">
          <Button
            size="lg"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "white",
            }}
          >
            Ver la Comparación Práctica →
          </Button>
        </Link>
      </div>
    </div>
  )
}
