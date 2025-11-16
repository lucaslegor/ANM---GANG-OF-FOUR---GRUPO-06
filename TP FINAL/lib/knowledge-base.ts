// Base de conocimiento teórica para el chatbot

export interface KnowledgeEntry {
  keywords: string[]
  title: string
  definition: string
  formula?: string
  explanation: string
  examples?: string[]
  relatedTopics?: string[]
}

export const knowledgeBase: Record<string, KnowledgeEntry> = {
  regression_lineal: {
    keywords: ['regresión lineal', 'regresion lineal', 'linear regression', 'regresión', 'regresion'],
    title: 'Regresión Lineal',
    definition: 'La regresión lineal es un método estadístico utilizado para modelar la relación entre una variable dependiente (y) y una o más variables independientes (x) mediante una línea recta.',
    formula: 'y = mx + b',
    explanation: `Donde:
- **y** es la variable dependiente (crecimiento bacteriano)
- **x** es la variable independiente (tiempo)
- **m** es la pendiente de la recta
- **b** es la intersección con el eje y

La regresión lineal encuentra la mejor línea recta que pasa por los puntos de datos, minimizando la suma de los cuadrados de las diferencias entre los valores observados y los valores predichos.`,
    examples: [
      'En nuestro caso, modelamos el crecimiento bacteriano (y) en función del tiempo (x)',
      'La pendiente (m) representa la tasa de crecimiento',
      'La intersección (b) representa el crecimiento inicial'
    ],
    relatedTopics: ['minimos_cuadrados', 'coeficiente_r2', 'rmse']
  },

  minimos_cuadrados: {
    keywords: ['mínimos cuadrados', 'minimos cuadrados', 'least squares', 'ajuste', 'fitting'],
    title: 'Método de Mínimos Cuadrados',
    definition: 'El método de mínimos cuadrados es una técnica de optimización utilizada para encontrar la mejor curva que se ajusta a un conjunto de datos, minimizando la suma de los cuadrados de las diferencias entre los valores observados y los valores predichos por el modelo.',
    formula: 'SSE = Σ(yᵢ - ŷᵢ)²',
    explanation: `Donde:
- **SSE** (Suma de Errores al Cuadrado) es la cantidad que queremos minimizar
- **yᵢ** son los valores observados reales
- **ŷᵢ** son los valores predichos por el modelo

Este método es ampliamente utilizado porque:
1. Es matemáticamente sólido y bien establecido
2. Proporciona estimadores insesgados cuando se cumplen ciertos supuestos
3. Es computacionalmente eficiente
4. Funciona bien con datos experimentales como los de crecimiento bacteriano`,
    examples: [
      'En nuestro simulador, usamos mínimos cuadrados para ajustar curvas polinómicas a los datos de crecimiento',
      'El método encuentra automáticamente los coeficientes que mejor se ajustan a tus datos'
    ],
    relatedTopics: ['regression_lineal', 'rmse', 'coeficiente_r2']
  },

  coeficiente_r2: {
    keywords: ['r²', 'r2', 'r cuadrado', 'coeficiente de determinación', 'coeficiente determinacion', 'r-squared'],
    title: 'Coeficiente de Determinación (R²)',
    definition: 'El coeficiente de determinación (R²) es una medida estadística que indica qué tan bien se ajusta el modelo a los datos observados. Varía entre 0 y 1, donde 1 indica un ajuste perfecto.',
    formula: 'R² = 1 - (SSE / SST)',
    explanation: `Donde:
- **SSE** (Suma de Errores al Cuadrado) es la suma de las diferencias al cuadrado entre valores observados y predichos
- **SST** (Suma Total de Cuadrados) es la suma de las diferencias al cuadrado entre valores observados y la media

**Interpretación:**
- **R² = 1**: El modelo explica el 100% de la variabilidad (ajuste perfecto)
- **R² > 0.9**: Excelente ajuste
- **R² > 0.7**: Buen ajuste
- **R² < 0.5**: Ajuste pobre

En nuestro simulador, un R² alto indica que el modelo de regresión describe bien el crecimiento bacteriano observado.`,
    examples: [
      'Si R² = 0.95, significa que el modelo explica el 95% de la variabilidad en los datos',
      'Un R² bajo puede indicar que necesitas un modelo más complejo o que hay mucho ruido en los datos'
    ],
    relatedTopics: ['rmse', 'regression_lineal', 'minimos_cuadrados']
  },

  rmse: {
    keywords: ['rmse', 'error cuadrático medio', 'root mean square error', 'raiz error cuadratico medio'],
    title: 'Error Cuadrático Medio (RMSE)',
    definition: 'El RMSE (Root Mean Square Error) es una medida del error promedio entre los valores predichos por el modelo y los valores observados. Se expresa en las mismas unidades que la variable dependiente.',
    formula: 'RMSE = √(Σ(yᵢ - ŷᵢ)² / n)',
    explanation: `Donde:
- **yᵢ** son los valores observados reales
- **ŷᵢ** son los valores predichos por el modelo
- **n** es el número de observaciones

**Interpretación:**
- Un RMSE **bajo** indica que el modelo predice bien los valores
- Un RMSE **alto** indica que hay grandes discrepancias entre predicciones y observaciones
- El RMSE se mide en las mismas unidades que la variable dependiente (en nuestro caso, crecimiento normalizado)

**Ventajas del RMSE:**
- Penaliza más los errores grandes (por el cuadrado)
- Es fácil de interpretar (mismas unidades que los datos)
- Útil para comparar diferentes modelos`,
    examples: [
      'Si RMSE = 0.05, significa que en promedio, las predicciones se desvían 0.05 unidades del valor real',
      'Un RMSE de 0.1 en crecimiento normalizado indica un error del 10%'
    ],
    relatedTopics: ['coeficiente_r2', 'minimos_cuadrados', 'regression_lineal']
  },

  tasa_crecimiento: {
    keywords: ['tasa de crecimiento', 'tasa crecimiento', 'growth rate', 'velocidad crecimiento', 'ritmo crecimiento'],
    title: 'Tasa de Crecimiento',
    definition: 'La tasa de crecimiento mide qué tan rápido está creciendo una población bacteriana entre dos puntos de tiempo específicos. Se calcula como el cambio en el crecimiento dividido por el cambio en el tiempo.',
    formula: 'Tasa de Crecimiento = (g(t₂) - g(t₁)) / (t₂ - t₁)',
    explanation: `Donde:
- **g(t₁)** es el crecimiento en el tiempo inicial t₁
- **g(t₂)** es el crecimiento en el tiempo final t₂
- **t₂ - t₁** es el intervalo de tiempo

**Interpretación:**
- Una tasa **positiva** indica crecimiento
- Una tasa **alta** indica crecimiento rápido
- Una tasa **baja** indica crecimiento lento
- Una tasa **negativa** indicaría decrecimiento (raro en bacterias)

**Factores que afectan la tasa:**
- Temperatura: temperaturas óptimas aumentan la tasa
- Medio de cultivo: medios ricos permiten mayor tasa de crecimiento
- Fase de crecimiento: la tasa varía según la fase (lag, exponencial, estacionaria)`,
    examples: [
      'Si entre 2 y 4 horas el crecimiento pasa de 0.3 a 0.6, la tasa es (0.6-0.3)/(4-2) = 0.15 unidades/hora',
      'Una tasa alta indica que las bacterias están en fase exponencial de crecimiento'
    ],
    relatedTopics: ['regression_lineal', 'crecimiento_bacteriano']
  },

  crecimiento_bacteriano: {
    keywords: ['crecimiento bacteriano', 'crecimiento bacteria', 'bacterial growth', 'modelo crecimiento', 'fases crecimiento'],
    title: 'Modelos de Crecimiento Bacteriano',
    definition: 'El crecimiento bacteriano es el proceso por el cual las bacterias aumentan en número o biomasa. Se puede modelar matemáticamente usando diferentes funciones que describen las fases del crecimiento.',
    formula: 'g(t) = f(t, parámetros)',
    explanation: `**Fases del Crecimiento:**
1. **Fase Lag**: Ajuste inicial, crecimiento lento
2. **Fase Exponencial**: Crecimiento rápido y constante
3. **Fase Estacionaria**: El crecimiento se estabiliza
4. **Fase de Muerte**: Disminución de la población

**Factores que Afectan el Crecimiento:**
- **Temperatura**: Cada bacteria tiene una temperatura óptima (E. coli: ~37°C)
- **Medio de cultivo**: Medios ricos vs limitados afectan la velocidad
- **pH**: Las bacterias tienen rangos óptimos de pH
- **Oxígeno**: Aerobias vs anaerobias

**En nuestro dataset:**
- 3 temperaturas: 25°C, 30°C, 37°C
- 2 tipos de medio: Rico y Limitado
- 6 clústeres diferentes con patrones únicos`,
    examples: [
      'E. coli K-12 crece mejor a 37°C en medio rico',
      'A 25°C el crecimiento es más lento pero más estable',
      'Los medios limitados reducen la tasa máxima de crecimiento'
    ],
    relatedTopics: ['tasa_crecimiento', 'regression_lineal', 'minimos_cuadrados']
  },

  e_coli: {
    keywords: ['e. coli', 'e coli', 'escherichia coli', 'k-12', 'cepa'],
    title: 'Escherichia coli K-12',
    definition: 'E. coli K-12 es una cepa de laboratorio de Escherichia coli ampliamente utilizada en investigación científica. Es una cepa no patógena y bien caracterizada.',
    explanation: `**Características:**
- Cepa de laboratorio segura para trabajar
- Bien documentada y estudiada
- Utilizada en investigación de crecimiento bacteriano
- Genoma completamente secuenciado

**En nuestro proyecto:**
- Utilizamos datos experimentales de E. coli K-12
- 6 condiciones diferentes (3 temperaturas × 2 medios)
- Datos de crecimiento normalizado (0 a 1)
- Modelados mediante regresión polinómica`,
    examples: [
      'E. coli K-12 es la cepa más utilizada en laboratorios de microbiología',
      'Nuestro dataset incluye mediciones de crecimiento en diferentes condiciones'
    ],
    relatedTopics: ['crecimiento_bacteriano', 'regression_lineal']
  }
}

// Función para buscar en la base de conocimiento
export function searchKnowledge(query: string): KnowledgeEntry | null {
  const lowerQuery = query.toLowerCase()
  
  // Buscar por keywords
  for (const [key, entry] of Object.entries(knowledgeBase)) {
    for (const keyword of entry.keywords) {
      if (lowerQuery.includes(keyword.toLowerCase())) {
        return entry
      }
    }
  }
  
  return null
}

// Función para obtener todas las entradas relacionadas
export function getRelatedTopics(topicKey: string): KnowledgeEntry[] {
  const topic = knowledgeBase[topicKey]
  if (!topic || !topic.relatedTopics) return []
  
  return topic.relatedTopics
    .map(key => knowledgeBase[key])
    .filter(Boolean) as KnowledgeEntry[]
}

