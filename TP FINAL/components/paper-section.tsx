import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Microscope, FlaskConical, TrendingUp, MessageSquare } from 'lucide-react'

export function PaperSection() {
  return (
    <section id="investigacion" className="py-20 pt-32 md:pt-40 md:py-32 border-t border-b"
      style={{ 
        borderColor: 'oklch(0.75 0.25 200 / 0.2)',
        borderTopWidth: '1px',
        borderBottomWidth: '1px',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Publicación Científica</h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Análisis detallado del crecimiento bacteriano de <em>E. coli K-12</em> bajo múltiples condiciones ambientales.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Introducción</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                El estudio del crecimiento bacteriano es fundamental para comprender los procesos microbiológicos y su aplicación 
                en biotecnología, medicina y ciencias ambientales. <em>Escherichia coli K-12</em> representa un organismo modelo 
                ampliamente estudiado debido a su comportamiento predecible y su relevancia en investigación básica y aplicada.
              </p>
              <p>
                Este trabajo presenta un análisis cuantitativo del crecimiento de <em>E. coli K-12</em> bajo seis condiciones 
                ambientales distintas, combinando tres temperaturas (25°C, 30°C y 37°C) con dos tipos de medios de cultivo 
                (rico y limitado). El objetivo es desarrollar modelos matemáticos predictivos mediante el método de mínimos 
                cuadrados que permitan estimar el crecimiento bacteriano en función del tiempo.
              </p>
            </CardContent>
          </Card>

          {/* Materials and Methods */}
          <Card className="border-l-4 border-l-secondary">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Microscope className="h-6 w-6 text-secondary" />
                <CardTitle className="text-2xl">Materiales y Métodos</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Dataset Experimental</h4>
                <p>
                  Se recolectaron mediciones experimentales de crecimiento normalizado de <em>E. coli K-12</em> a lo largo del tiempo. 
                  El dataset contiene cinco variables principales: tiempo (minutos), crecimiento normalizado (0-1), temperatura (°C), 
                  tipo de medio (rico/limitado) y cluster identificador.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Condiciones Experimentales</h4>
                <p>
                  Se establecieron 6 clusters experimentales combinando tres temperaturas de incubación con dos condiciones nutricionales:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li><strong>Temperaturas:</strong> 25°C (subóptima), 30°C (intermedia), 37°C (óptima)</li>
                  <li><strong>Medios:</strong> Rico (alta disponibilidad de nutrientes) y Limitado (restricción nutricional)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Método de Ajuste</h4>
                <p>
                  {'Para cada cluster, se aplicó el método de '}
                  <strong>mínimos cuadrados</strong>
                  {' para ajustar una función matemática continua $$g(t)$$ que minimiza la suma de los errores cuadráticos entre los valores observados y predichos. Este enfoque permite obtener modelos predictivos robustos del crecimiento bacteriano en función del tiempo.'}
                </p>
                <div className="bg-muted p-4 rounded-lg border border-border mt-3">
                  <p className="text-center font-mono text-sm">
                    {'$$\\min \\sum_{i=1}^{n} (y_i - g(t_i))^2$$'}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Validación Estadística</h4>
                <p>
                  {'Se calculó el coeficiente de determinación $$R^2$$ para cada modelo ajustado, obteniendo valores superiores a 0.95 en todos los clusters, lo que indica un excelente ajuste entre los datos experimentales y las predicciones del modelo.'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="border-l-4 border-l-accent">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-6 w-6 text-accent" />
                <CardTitle className="text-2xl">Resultados</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Los modelos ajustados revelaron patrones de crecimiento distintivos para cada cluster, reflejando el impacto 
                de las condiciones ambientales en la cinética de crecimiento bacteriano:
              </p>
              <div className="grid md:grid-cols-2 gap-4 my-4">
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <h5 className="font-semibold text-foreground mb-2">Efecto de la Temperatura</h5>
                  <p className="text-sm">
                    El crecimiento fue significativamente más rápido a 37°C (temperatura óptima) en comparación con 25°C y 30°C. 
                    Las tasas de crecimiento disminuyeron progresivamente a medida que la temperatura se alejaba del óptimo.
                  </p>
                </div>
                <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/20">
                  <h5 className="font-semibold text-foreground mb-2">Efecto del Medio</h5>
                  <p className="text-sm">
                    Los medios ricos promovieron tasas de crecimiento superiores y alcanzaron valores de saturación más altos 
                    comparados con medios limitados, independientemente de la temperatura.
                  </p>
                </div>
              </div>
              <p>
                Los modelos matemáticos ajustados permiten calcular métricas clave como la tasa de crecimiento promedio entre 
                dos puntos temporales y proyectar el estado de crecimiento para tiempos futuros con alta precisión.
              </p>
            </CardContent>
          </Card>

          {/* Discussion */}
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Discusión</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Los resultados obtenidos confirman que tanto la temperatura como la disponibilidad de nutrientes son factores 
                críticos que determinan la cinética de crecimiento de <em>E. coli K-12</em>. La temperatura de 37°C representa 
                el óptimo fisiológico para esta cepa, donde las enzimas metabólicas operan con máxima eficiencia.
              </p>
              <p>
                La diferencia observada entre medios ricos y limitados ilustra el impacto directo de la disponibilidad nutricional 
                en la capacidad de división celular. En condiciones de restricción, las bacterias experimentan tasas de crecimiento 
                reducidas y alcanzan densidades poblacionales menores debido a la limitación de recursos esenciales.
              </p>
              <p>
                Los modelos de mínimos cuadrados desarrollados en este estudio proporcionan herramientas predictivas valiosas 
                para aplicaciones en biotecnología, permitiendo optimizar condiciones de cultivo y estimar tiempos de crecimiento 
                en procesos industriales. La alta precisión de los ajustes {'($$R^2 > 0.95$$)'} valida la robustez del enfoque metodológico.
              </p>
              <div className="bg-accent/5 p-4 rounded-lg border border-accent/20 mt-4">
                <h5 className="font-semibold text-foreground mb-2">Aplicaciones Futuras</h5>
                <p className="text-sm">
                  Estos modelos pueden extenderse para predecir el comportamiento de otras cepas bacterianas, optimizar 
                  procesos de fermentación industrial, y diseñar estrategias de control microbiológico en diferentes contextos aplicados.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Conclusions */}
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <FlaskConical className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Conclusiones</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground leading-relaxed">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">1.</span>
                  <span>
                    Se desarrollaron exitosamente modelos matemáticos predictivos para el crecimiento de <em>E. coli K-12</em> 
                    bajo seis condiciones ambientales distintas mediante ajustes por mínimos cuadrados.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <span>
                    La temperatura y el tipo de medio ejercen efectos significativos en la cinética de crecimiento bacteriano, 
                    con 37°C y medios ricos promoviendo las tasas de crecimiento más elevadas.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <span>
                    {'Los modelos obtenidos presentan alta precisión estadística ($$R^2 > 0.95$$) y constituyen herramientas valiosas para aplicaciones en biotecnología y microbiología aplicada.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">4.</span>
                  <span>
                    La plataforma de simulación desarrollada permite a investigadores y estudiantes explorar interactivamente 
                    el comportamiento del crecimiento bacteriano bajo diferentes condiciones ambientales.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
