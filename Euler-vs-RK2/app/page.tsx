import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 text-balance" style={{ color: "var(--color-primary)" }}>
          Euler vs. RK2
        </h1>
        <p className="text-2xl md:text-3xl mb-4 font-semibold" style={{ color: "var(--color-secondary)" }}>
          El Duelo de los Métodos Numéricos
        </p>
        <p className="text-xl md:text-2xl mb-12 text-muted-foreground max-w-3xl mx-auto text-balance">
          Una comparación exhaustiva de precisión, eficiencia y estabilidad en la resolución de Problemas de Valor
          Inicial
        </p>

        <Link href="/methods">
          <Button
            size="lg"
            className="text-lg px-8 py-6 font-semibold"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "white",
            }}
          >
            Comenzar la Comparación →
          </Button>
        </Link>

        <div className="mt-16 pb-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="p-6 rounded-lg bg-muted">
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="font-bold text-lg mb-2">Precisión</h3>
            <p className="text-sm text-muted-foreground">Análisis del error y orden de convergencia</p>
          </div>
          <div className="p-6 rounded-lg bg-muted">
            <div className="text-4xl mb-2">⚡</div>
            <h3 className="font-bold text-lg mb-2">Eficiencia</h3>
            <p className="text-sm text-muted-foreground">Costo computacional por iteración</p>
          </div>
          <div className="p-6 rounded-lg bg-muted">
            <div className="text-4xl mb-2">🛡️</div>
            <h3 className="font-bold text-lg mb-2">Estabilidad</h3>
            <p className="text-sm text-muted-foreground">Comportamiento en problemas complejos</p>
          </div>
        </div>
      </div>
    </div>
  )
}
