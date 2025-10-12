import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"


export default function TheoryPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-balance">Análisis Numérico</h1>
        <p className="text-xl text-muted-foreground">Ingeniería en Sistemas de Información</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Mínimos Cuadrados</CardTitle>
          <CardDescription>Fundamentos teóricos del método</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-3">Regresión</h3>
            <p className="text-muted-foreground leading-relaxed">
              Se refiere a la obtención de la ecuación matemática que permite relacionar a la variable dependiente "y"
              con otra/s variable/s "x" (variable/s independiente/s) que son conocidas y por lo tanto permiten estimar
              valores de "y" a partir de los de "x".
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3">Correlación</h3>
            <p className="text-muted-foreground leading-relaxed">
              La correlación mide o cuantifica el grado de dependencia o asociación entre la variable dependiente "y" y
              las variables independientes "x". Se representa numéricamente por el llamado coeficiente de correlación.
            </p>
          </section>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Diagrama de Dispersión y Modelos de Regresión</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Un diagrama de dispersión es una gráfica en el plano cartesiano "xy" en la que se muestran los valores
            experimentales del fenómeno en estudio. En base a ese diagrama, se puede detectar si los valores siguen un
            modelo de regresión de tipo Lineal o No Lineal.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Un diagrama de dispersión permite identificar también aquellos valores más dispersos que por lo general se
            pueden deber a errores en la muestra.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Método de Mínimos Cuadrados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Supongamos tener un conjunto de datos experimentales y además suponemos conocida la forma de una función
            empírica:
          </p>
          <div className="bg-muted p-4 rounded-lg my-4">
            <p className="text-center font-mono">y = f(x; a1, a2, ..., an)</p>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Donde a1, a2, ..., an son coeficientes que deseamos determinar.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Las desviaciones, o el error, entre la ordenada de la fórmula empírica y el valor de la tabla se indica
            como:
          </p>
          <div className="bg-muted p-4 rounded-lg my-4">
            <p className="text-center font-mono">ei = yi - f(xi)</p>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Aplicando el método de los mínimos cuadrados, definimos los coeficientes a1, a2, ..., an de manera tal que
            la suma del cuadrado de las desviaciones sea mínimo:
          </p>
          <div className="bg-muted p-4 rounded-lg my-4">
            <p className="text-center font-mono">S = Σ(ei^2) = Σ[(yi - f(xi))^2] = mínimo</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Regresión Lineal</CardTitle>
          <CardDescription>La función empírica es una recta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            La idea es que queremos ajustar una recta a un conjunto de puntos (xi, yi). La recta tiene la forma:
          </p>
          <div className="bg-muted p-4 rounded-lg my-4">
            <p className="text-center font-mono">y = a1 + a2x</p>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            donde: a1 = valor de y cuando x=0 y a2 = pendiente de la recta.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Tenemos las siguientes dos ecuaciones llamadas ecuaciones normales:
          </p>
          <div className="bg-muted p-4 rounded-lg my-4 space-y-2">
            <p className="text-center font-mono">Σy = n*a1 + a2*Σx</p>
            <p className="text-center font-mono">Σxy = a1*Σx + a2*Σx^2</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Ajuste Polinómico de Segundo Orden</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">Para un polinomio de segundo orden:</p>
          <div className="bg-muted p-4 rounded-lg my-4">
            <p className="text-center font-mono">y = a1 + a2x + a3x^2</p>
          </div>
          <p className="text-muted-foreground leading-relaxed">Mínimos cuadrados: elegir a1, a2, a3 que minimicen:</p>
          <div className="bg-muted p-4 rounded-lg my-4">
            <p className="text-center font-mono">S = Σ(yi - a1 - a2xi - a3xi^2)^2</p>
          </div>
          <p className="text-muted-foreground leading-relaxed">Las ecuaciones normales son:</p>
          <div className="bg-muted p-4 rounded-lg my-4 space-y-2">
            <p className="text-center font-mono">Σy = n*a1 + a2*Σx + a3*Σx^2</p>
            <p className="text-center font-mono">Σxy = a1*Σx + a2*Σx^2 + a3*Σx^3</p>
            <p className="text-center font-mono">Σx^2y = a1*Σx^2 + a2*Σx^3 + a3*Σx^4</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Ajuste Exponencial</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">En este caso la función empírica no es lineal:</p>
          <div className="bg-muted p-4 rounded-lg my-4">
            <p className="text-center font-mono">y = a * e^(bx)</p>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Por lo que debemos linealizarla aplicando ln a ambos lados de la ecuación:
          </p>
          <div className="bg-muted p-4 rounded-lg my-4">
            <p className="text-center font-mono">ln(y) = ln(a) + bx</p>
          </div>
          <p className="text-muted-foreground leading-relaxed">Si definimos Y = ln(y) y A = ln(a), obtenemos:</p>
          <div className="bg-muted p-4 rounded-lg my-4">
            <p className="text-center font-mono">Y = A + bx</p>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Que es una ecuación lineal que podemos resolver con el método de mínimos cuadrados.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Ajuste Potencial</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">Para la función potencial:</p>
          <div className="bg-muted p-4 rounded-lg my-4">
            <p className="text-center font-mono">y = a * x^b</p>
          </div>
          <p className="text-muted-foreground leading-relaxed">Tomamos el ln de ambos lados:</p>
          <div className="bg-muted p-4 rounded-lg my-4">
            <p className="text-center font-mono">ln(y) = ln(a) + b * ln(x)</p>
          </div>
          <p className="text-muted-foreground leading-relaxed">Definimos Y = ln(y), X = ln(x) y A = ln(a):</p>
          <div className="bg-muted p-4 rounded-lg my-4">
            <p className="text-center font-mono">Y = A + bX</p>
          </div>
          <p className="text-sm text-muted-foreground italic mt-2">
            Nota: Porque al linealizar, los ln de negativos no existen
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Bondad del Ajuste</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            El coeficiente de determinación R^2 mide qué tan bien el modelo se ajusta a los datos:
          </p>
          <div className="bg-muted p-4 rounded-lg my-4">
            <p className="text-center font-mono">R^2 = 1 - (Σ(yi - ŷi)^2) / (Σ(yi - ȳ)^2)</p>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            El coeficiente de determinación ajustado Radj^2 es extra útil para comparar modelos:
          </p>
          <div className="bg-muted p-4 rounded-lg my-4">
            <p className="text-center font-mono">Radj^2 = 1 - ((1-R^2)*(n-1)) / (n-p)</p>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            donde p es el número de parámetros del modelo (p.ej., p=2 en lineal, exponencial y potencial; p=3 en
            cuadrático).
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Supuestos Clave del Método</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold">Relación lineal</h4>
              <p className="text-sm text-muted-foreground">
                La relación entre Y y X se aproxima con una línea recta (o plano).
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Exogeneidad</h4>
              <p className="text-sm text-muted-foreground">
                Los errores no deben correlacionarse con las variables explicativas.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Varianza constante</h4>
              <p className="text-sm text-muted-foreground">
                La dispersión de los errores debe ser similar en todos los niveles de X.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">No autocorrelación</h4>
              <p className="text-sm text-muted-foreground">
                Los errores son independientes entre sí (no hay dependencia temporal/espacial).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Problemas Comunes en la Práctica</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm">Variables omitidas</h4>
              <p className="text-sm text-muted-foreground">Factores no medidos sesgan los coeficientes.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold text-sm">Causalidad invertida</h4>
              <p className="text-sm text-muted-foreground">X y Y se determinan simultáneamente.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold text-sm">Relación no lineal</h4>
              <p className="text-sm text-muted-foreground">La relación puede ser curva o umbral.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold text-sm">Varianza no constante</h4>
              <p className="text-sm text-muted-foreground">Los errores crecen con el nivel de X.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold text-sm">Dependencias</h4>
              <p className="text-sm text-muted-foreground">Errores correlacionados en el tiempo o espacio.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
