import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Calculator, LineChart, CheckCircle2 } from 'lucide-react'

export function ModelingSection() {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 pt-32 md:pt-40 relative border-t border-b"
      style={{ 
        borderColor: 'oklch(0.75 0.25 200 / 0.2)',
        borderTopWidth: '1px',
        borderBottomWidth: '1px',
      }}
    >
      <div className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 40% 50%, oklch(0.75 0.25 200 / 0.2), transparent 70%)',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance neon-glow"
            style={{ color: 'oklch(0.95 0.01 200)' }}
          >
            Modelado Matemático
          </h2>
          <p className="text-lg text-pretty leading-relaxed"
            style={{ color: 'oklch(0.7 0.05 200)' }}
          >
            Aplicamos el método de <strong>mínimos cuadrados</strong> para ajustar funciones continuas que representen el crecimiento bacteriano en cada cluster.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="glass neon-border transition-all duration-200 hover:scale-105"
            style={{
              borderColor: 'oklch(0.75 0.25 200 / 0.3)',
              boxShadow: '0 0 20px oklch(0.75 0.25 200 / 0.1)',
            }}
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg"
                  style={{ background: 'oklch(0.75 0.25 200 / 0.2)' }}
                >
                  <Calculator className="h-6 w-6 neon-glow" style={{ color: 'oklch(0.75 0.25 200)' }} />
                </div>
                <CardTitle className="text-xl" style={{ color: 'oklch(0.95 0.01 200)' }}>
                  Ajuste por Mínimos Cuadrados
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-relaxed" style={{ color: 'oklch(0.7 0.05 200)' }}>
                Para cada uno de los 6 clusters, se ajusta una función matemática {'$$g(t)$$'} que minimiza la suma de los errores cuadráticos entre los valores observados y predichos:
              </p>
              <div className="glass p-4 rounded-lg border"
                style={{ borderColor: 'oklch(0.75 0.25 200 / 0.3)' }}
              >
                <p className="text-center font-mono text-sm">
                  {'$$\\min \\sum_{i=1}^{n} (y_i - g(t_i))^2$$'}
                </p>
              </div>
              <p className="text-sm" style={{ color: 'oklch(0.6 0.05 200)' }}>
                {'Donde $$y_i$$ representa el crecimiento normalizado medido experimentalmente y $$g(t_i)$$ es el valor predicho por el modelo.'}
              </p>
            </CardContent>
          </Card>

          <Card className="glass neon-border transition-all duration-200 hover:scale-105"
            style={{
              borderColor: 'oklch(0.7 0.28 320 / 0.3)',
              boxShadow: '0 0 20px oklch(0.7 0.28 320 / 0.1)',
            }}
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg"
                  style={{ background: 'oklch(0.7 0.28 320 / 0.2)' }}
                >
                  <TrendingUp className="h-6 w-6 neon-glow" style={{ color: 'oklch(0.7 0.28 320)' }} />
                </div>
                <CardTitle className="text-xl" style={{ color: 'oklch(0.95 0.01 200)' }}>
                  Curvas de Crecimiento
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-relaxed" style={{ color: 'oklch(0.7 0.05 200)' }}>
                Las funciones ajustadas representan la relación <strong>growth_norm vs. time</strong> y permiten:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0 neon-glow" style={{ color: 'oklch(0.75 0.25 200)' }} />
                  <span className="text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>Proyectar el crecimiento para tiempos futuros</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0 neon-glow" style={{ color: 'oklch(0.75 0.25 200)' }} />
                  <span className="text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>Comparar patrones entre condiciones ambientales</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0 neon-glow" style={{ color: 'oklch(0.75 0.25 200)' }} />
                  <span className="text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>Calcular tasas de crecimiento instantáneas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0 neon-glow" style={{ color: 'oklch(0.75 0.25 200)' }} />
                  <span className="text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>Obtener modelos continuos de datos discretos</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="glass neon-border"
          style={{
            borderColor: 'oklch(0.8 0.22 140 / 0.5)',
            boxShadow: '0 0 30px oklch(0.8 0.22 140 / 0.2)',
          }}
        >
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg"
                style={{ background: 'oklch(0.8 0.22 140 / 0.2)' }}
              >
                <LineChart className="h-6 w-6 neon-glow" style={{ color: 'oklch(0.8 0.22 140)' }} />
              </div>
              <CardTitle className="text-xl" style={{ color: 'oklch(0.95 0.01 200)' }}>
                Métricas Calculables
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2" style={{ color: 'oklch(0.95 0.01 200)' }}>
                  Tasa de Crecimiento entre Dos Tiempos
                </h4>
                <p className="text-sm mb-3" style={{ color: 'oklch(0.7 0.05 200)' }}>
                  {'Dados dos puntos temporales $$t_1$$ y $$t_2$$, la tasa de crecimiento promedio se calcula como:'}
                </p>
                <div className="glass p-4 rounded-lg border"
                  style={{ borderColor: 'oklch(0.75 0.25 200 / 0.3)' }}
                >
                  <p className="text-center font-mono">
                    {'$$\\text{Tasa} = \\frac{g(t_2) - g(t_1)}{t_2 - t_1}$$'}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2" style={{ color: 'oklch(0.95 0.01 200)' }}>
                  Proyección de Crecimiento
                </h4>
                <p className="text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>
                  {'Para cualquier tiempo $$t$$, el modelo ajustado proporciona una estimación del crecimiento normalizado $$g(t)$$, permitiendo predecir el estado de la población bacteriana.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
