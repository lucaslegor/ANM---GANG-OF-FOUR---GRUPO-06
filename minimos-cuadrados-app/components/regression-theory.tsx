interface RegressionTheoryProps {
  type: "linear" | "polynomial" | "exponential" | "power"
}

export function RegressionTheory({ type }: RegressionTheoryProps) {
  const theories = {
    linear: {
      title: "Regresión Lineal",
      description: "Ajusta una línea recta a los datos usando el método de mínimos cuadrados.",
      steps: [
        "Se busca una función de la forma: y = a₁ + a₂x",
        "Se calculan las sumas necesarias: Σx, Σy, Σxy, Σx²",
        "Se resuelven las ecuaciones normales para encontrar a₁ y a₂",
        "a₂ = (nΣxy - ΣxΣy) / (nΣx² - (Σx)²)",
        "a₁ = (Σy - a₂Σx) / n",
      ],
    },
    polynomial: {
      title: "Regresión Polinómica de Segundo Orden",
      description: "Ajusta un polinomio cuadrático a los datos.",
      steps: [
        "Se busca una función de la forma: y = a₁ + a₂x + a₃x²",
        "Se calculan las sumas: Σx, Σy, Σx², Σx³, Σx⁴, Σxy, Σx²y",
        "Se plantean tres ecuaciones normales",
        "Se resuelve el sistema de ecuaciones usando eliminación gaussiana",
        "Se obtienen los coeficientes a₁, a₂, a₃",
      ],
    },
    exponential: {
      title: "Regresión Exponencial",
      description: "Ajusta una función exponencial mediante linealización.",
      steps: [
        "Se busca una función de la forma: y = ae^(bx)",
        "Se linealiza aplicando logaritmo natural: ln(y) = ln(a) + bx",
        "Se define Y = ln(y) y A = ln(a)",
        "Se aplica regresión lineal a los datos transformados",
        "Se recuperan los parámetros originales: a = e^A",
      ],
    },
    power: {
      title: "Regresión Potencial",
      description: "Ajusta una función potencial mediante linealización.",
      steps: [
        "Se busca una función de la forma: y = ax^b",
        "Se linealiza aplicando logaritmo: ln(y) = ln(a) + b·ln(x)",
        "Se define Y = ln(y), X = ln(x), A = ln(a)",
        "Se aplica regresión lineal a los datos transformados",
        "Se recuperan los parámetros originales: a = e^A",
      ],
    },
  }

  const theory = theories[type]

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">{theory.title}</h3>
        <p className="text-muted-foreground">{theory.description}</p>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Pasos del Método:</h4>
        <ol className="list-decimal list-inside space-y-2">
          {theory.steps.map((step, index) => (
            <li key={index} className="text-sm text-muted-foreground">
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="bg-muted p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Nota:</strong> El método de mínimos cuadrados minimiza la suma de los cuadrados de las diferencias
          entre los valores observados y los valores predichos por el modelo.
        </p>
      </div>
    </div>
  )
}
