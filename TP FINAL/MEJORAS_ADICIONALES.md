# 🚀 Mejoras Adicionales Recomendadas para BioGrowth

## 📊 Mejoras Visuales y de UX

### 1. Animaciones Mejoradas en Transiciones
**Prioridad:** Media  
**Esfuerzo:** Bajo

```typescript
// Agregar animación al cambiar de clúster
<motion.div
  key={selectedCluster}
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.3 }}
>
  {/* Contenido del gráfico */}
</motion.div>
```

### 2. Tooltips Informativos
**Prioridad:** Alta  
**Esfuerzo:** Bajo

Agregar tooltips con explicaciones científicas:

```typescript
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <span>t_crit</span>
    </TooltipTrigger>
    <TooltipContent>
      <p>Tiempo crítico: Momento en que la bacteria pasa de</p>
      <p>fase exponencial a fase estacionaria</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### 3. Modo Oscuro/Claro
**Prioridad:** Media  
**Esfuerzo:** Medio

```typescript
import { useTheme } from 'next-themes'

const { theme, setTheme } = useTheme()

// Colores adaptativos
const bgColor = theme === 'dark' 
  ? 'oklch(0.12 0.04 240)' 
  : 'oklch(0.98 0.01 240)'
```

---

## 📈 Mejoras en Análisis de Datos

### 4. Intervalos de Confianza
**Prioridad:** Alta  
**Esfuerzo:** Alto

Calcular y mostrar intervalos de confianza (IC 95%):

```typescript
interface PredictionWithConfidence {
  mean: number;
  lower: number; // IC inferior
  upper: number; // IC superior
}

function predictWithConfidence(
  model: SegmentedModel,
  time: number
): PredictionWithConfidence {
  const mean = predictGrowth(model, time);
  const std = calculateStdError(model, time); // Función a implementar
  
  return {
    mean,
    lower: mean - 1.96 * std,
    upper: mean + 1.96 * std,
  };
}
```

### 5. Estadísticas Descriptivas Expandidas
**Prioridad:** Media  
**Esfuerzo:** Bajo

Agregar:
- Mediana de crecimiento
- Cuartiles (Q1, Q3)
- Coeficiente de variación
- Asimetría (skewness)
- Curtosis

```typescript
interface DescriptiveStats {
  mean: number;
  median: number;
  q1: number;
  q3: number;
  cv: number; // Coeficiente de variación
  skewness: number;
  kurtosis: number;
}
```

### 6. Detección de Outliers
**Prioridad:** Media  
**Esfuerzo:** Medio

Implementar método de Tukey para detectar outliers:

```typescript
function detectOutliers(data: number[]): {
  outliers: number[];
  indices: number[];
} {
  const q1 = quantile(data, 0.25);
  const q3 = quantile(data, 0.75);
  const iqr = q3 - q1;
  
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;
  
  const outliers: number[] = [];
  const indices: number[] = [];
  
  data.forEach((value, index) => {
    if (value < lowerBound || value > upperBound) {
      outliers.push(value);
      indices.push(index);
    }
  });
  
  return { outliers, indices };
}
```

---

## 🔬 Mejoras en Modelado Matemático

### 7. Modelo de 3 Fases (con Fase de Latencia)
**Prioridad:** Alta  
**Esfuerzo:** Alto

```typescript
interface ThreePhaseModel {
  t_lag: number;      // Fin de fase de latencia
  t_crit: number;     // Fin de fase exponencial
  lag: { y0: number }; // Crecimiento constante inicial
  exponential: { a: number; b: number };
  stationary: { m: number; c: number };
}

function predictGrowthThreePhase(
  model: ThreePhaseModel,
  time: number
): number {
  if (time < model.t_lag) {
    return model.lag.y0; // Fase de latencia
  } else if (time < model.t_crit) {
    return model.exponential.a * Math.exp(model.exponential.b * time);
  } else {
    return model.stationary.m * time + model.stationary.c;
  }
}
```

### 8. Ajuste con Pesos (Weighted Least Squares)
**Prioridad:** Media  
**Esfuerzo:** Alto

Dar más peso a puntos cerca de t_crit:

```typescript
function calculateWeights(
  times: number[],
  t_crit: number,
  sigma: number = 0.5
): number[] {
  return times.map(t => {
    const distance = Math.abs(t - t_crit);
    return Math.exp(-distance / sigma);
  });
}
```

### 9. Modelo Logístico Alternativo
**Prioridad:** Baja  
**Esfuerzo:** Medio

Comparar con modelo logístico:

```typescript
// Modelo de Verhulst (logístico)
function logisticGrowth(
  time: number,
  K: number,  // Capacidad de carga
  r: number,  // Tasa de crecimiento
  t0: number  // Punto de inflexión
): number {
  return K / (1 + Math.exp(-r * (time - t0)));
}
```

---

## 💾 Mejoras en Gestión de Datos

### 10. Caché de Predicciones
**Prioridad:** Alta  
**Esfuerzo:** Bajo

```typescript
const predictionCache = new Map<string, number>();

function predictGrowthCached(
  model: SegmentedModel,
  time: number
): number {
  const key = `${model.cluster_id}-${time}`;
  
  if (predictionCache.has(key)) {
    return predictionCache.get(key)!;
  }
  
  const prediction = predictGrowth(model, time);
  predictionCache.set(key, prediction);
  
  return prediction;
}
```

### 11. Exportación de Datos
**Prioridad:** Alta  
**Esfuerzo:** Bajo

Permitir exportar resultados:

```typescript
function exportToCSV(data: Array<{ time: number; growth: number }>) {
  const csv = [
    'Tiempo (h),Crecimiento Normalizado',
    ...data.map(d => `${d.time},${d.growth}`)
  ].join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'predicciones.csv';
  a.click();
}

function exportToJSON(model: SegmentedModel) {
  const json = JSON.stringify(model, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  // ... similar al CSV
}
```

### 12. Importación de CSV Personalizado
**Prioridad:** Media  
**Esfuerzo:** Alto

```typescript
function handleFileUpload(file: File) {
  const reader = new FileReader();
  
  reader.onload = (e) => {
    const csvText = e.target?.result as string;
    const dataPoints = parseCSV(csvText);
    
    // Validar formato
    if (validateDataPoints(dataPoints)) {
      // Calcular modelos dinámicamente
      const clusters = groupByCluster(dataPoints);
      // ... ajustar modelos
    }
  };
  
  reader.readAsText(file);
}
```

---

## 🎨 Mejoras en Visualización

### 13. Gráfico de Heatmap
**Prioridad:** Media  
**Esfuerzo:** Medio

Visualizar temperatura vs tiempo vs crecimiento:

```typescript
<HeatMapGrid
  data={heatmapData}
  xLabels={temperatures}
  yLabels={times}
  cellRender={(x, y, value) => (
    <div style={{ background: `rgba(59, 130, 246, ${value})` }}>
      {value.toFixed(2)}
    </div>
  )}
/>
```

### 14. Gráfico de Contorno
**Prioridad:** Baja  
**Esfuerzo:** Alto

Visualizar superficie de crecimiento en 3D:

```typescript
import Plot from 'react-plotly.js';

<Plot
  data={[{
    type: 'contour',
    z: growthMatrix,
    x: temperatures,
    y: times,
    colorscale: 'Viridis',
  }]}
  layout={{
    title: 'Superficie de Crecimiento',
    xaxis: { title: 'Temperatura (°C)' },
    yaxis: { title: 'Tiempo (h)' },
  }}
/>
```

### 15. Animación Temporal
**Prioridad:** Media  
**Esfuerzo:** Medio

Animar el crecimiento en el tiempo:

```typescript
const [currentTime, setCurrentTime] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentTime(t => t < 12 ? t + 0.1 : 0);
  }, 100);
  
  return () => clearInterval(interval);
}, []);

// Mostrar solo puntos hasta currentTime
const visibleData = data.filter(d => d.time <= currentTime);
```

---

## 🧪 Mejoras Científicas

### 16. Comparación con Otros Modelos
**Prioridad:** Alta  
**Esfuerzo:** Alto

Implementar y comparar:
- Modelo de Gompertz
- Modelo de Richards
- Modelo de Baranyi

```typescript
interface ModelComparison {
  name: string;
  rSquared: number;
  rmse: number;
  aic: number; // Criterio de Información de Akaike
  bic: number; // Criterio de Información Bayesiano
}

function compareModels(): ModelComparison[] {
  // Implementar ajuste y comparación
}
```

### 17. Análisis de Sensibilidad
**Prioridad:** Media  
**Esfuerzo:** Alto

Estudiar cómo varían las predicciones al modificar parámetros:

```typescript
function sensitivityAnalysis(
  model: SegmentedModel,
  parameter: 'a' | 'b' | 'm' | 'c',
  range: number = 0.1 // ±10%
) {
  const variations: Array<{ delta: number; prediction: number }> = [];
  
  for (let delta = -range; delta <= range; delta += range / 10) {
    const modifiedModel = { ...model };
    modifiedModel.exponential[parameter] *= (1 + delta);
    
    const prediction = predictGrowth(modifiedModel, 5); // Ejemplo: t=5h
    variations.push({ delta, prediction });
  }
  
  return variations;
}
```

### 18. Predicción de Fase de Muerte
**Prioridad:** Baja  
**Esfuerzo:** Alto

Modelar la fase de muerte (decline):

```typescript
interface FourPhaseModel extends ThreePhaseModel {
  t_death: number; // Inicio de fase de muerte
  death: {
    d: number; // Tasa de muerte
  };
}

function predictWithDeath(model: FourPhaseModel, time: number): number {
  if (time >= model.t_death) {
    const y_death = predictGrowthThreePhase(model, model.t_death);
    return y_death * Math.exp(-model.death.d * (time - model.t_death));
  }
  return predictGrowthThreePhase(model, time);
}
```

---

## 🔐 Mejoras de Seguridad y Validación

### 19. Validación de Entrada
**Prioridad:** Alta  
**Esfuerzo:** Bajo

```typescript
import { z } from 'zod';

const PredictionInputSchema = z.object({
  clusterId: z.enum(['25-rico', '25-limitado', '30-rico', '30-limitado', '37-rico', '37-limitado']),
  time: z.number().min(0).max(48),
  t1: z.number().min(0),
  t2: z.number().min(0),
}).refine(data => data.t2 > data.t1, {
  message: 't2 debe ser mayor que t1',
});

function validateInput(input: unknown) {
  return PredictionInputSchema.parse(input);
}
```

### 20. Límites de Rate Limiting
**Prioridad:** Media  
**Esfuerzo:** Medio

```typescript
import { ratelimit } from '@upstash/ratelimit';

const limiter = ratelimit({
  redis: /* configuración */,
  limiter: ratelimit.slidingWindow(10, '10 s'),
});

async function handlePrediction(req: Request) {
  const { success } = await limiter.limit(req.ip);
  
  if (!success) {
    return new Response('Too many requests', { status: 429 });
  }
  
  // ... procesar predicción
}
```

---

## 📱 Mejoras de Accesibilidad

### 21. Soporte para Lectores de Pantalla
**Prioridad:** Alta  
**Esfuerzo:** Bajo

```typescript
<div role="region" aria-label="Gráfico de crecimiento bacteriano">
  <ResponsiveContainer>
    <LineChart aria-label="Curva de crecimiento en el tiempo">
      {/* ... */}
    </LineChart>
  </ResponsiveContainer>
  <div className="sr-only">
    <p>El gráfico muestra el crecimiento normalizado de E. coli K-12</p>
    <p>en función del tiempo, con valores entre 0 y 1.5</p>
  </div>
</div>
```

### 22. Navegación por Teclado
**Prioridad:** Media  
**Esfuerzo:** Bajo

```typescript
<button
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleCalculate();
    }
  }}
  tabIndex={0}
>
  Calcular
</button>
```

---

## 🧑‍💻 Mejoras para Desarrolladores

### 23. Tests Unitarios
**Prioridad:** Alta  
**Esfuerzo:** Medio

```typescript
// __tests__/data-processor.test.ts
import { predictGrowth, getModel } from '@/lib/data-processor';

describe('predictGrowth', () => {
  it('should predict exponential growth before t_crit', () => {
    const model = getModel('37-rico')!;
    const prediction = predictGrowth(model, 1); // t=1 < t_crit=2.06
    
    expect(prediction).toBeCloseTo(0.1071, 4);
  });
  
  it('should predict linear growth after t_crit', () => {
    const model = getModel('37-rico')!;
    const prediction = predictGrowth(model, 5); // t=5 > t_crit=2.06
    
    expect(prediction).toBeCloseTo(1.310525, 4);
  });
  
  it('should be continuous at t_crit', () => {
    const model = getModel('37-rico')!;
    const predBefore = predictGrowth(model, model.t_crit - 0.001);
    const predAfter = predictGrowth(model, model.t_crit + 0.001);
    
    expect(Math.abs(predBefore - predAfter)).toBeLessThan(0.01);
  });
});
```

### 24. Logging y Monitoreo
**Prioridad:** Media  
**Esfuerzo:** Bajo

```typescript
import { logger } from '@/lib/logger';

function predictGrowth(model: SegmentedModel, time: number): number {
  logger.info('Prediction requested', {
    cluster: model.cluster_id,
    time,
    phase: time < model.t_crit ? 'exponential' : 'stationary',
  });
  
  // ... cálculo
  
  logger.info('Prediction completed', { result: prediction });
  
  return prediction;
}
```

### 25. Documentación API
**Prioridad:** Alta  
**Esfuerzo:** Bajo

Usar JSDoc para documentar:

```typescript
/**
 * Predice el crecimiento bacteriano en un tiempo dado
 * 
 * @param model - Modelo segmentado del clúster
 * @param time - Tiempo en horas (debe ser >= 0)
 * @returns Crecimiento normalizado entre 0 y 2
 * 
 * @example
 * ```typescript
 * const model = getModel('37-rico');
 * const growth = predictGrowth(model, 3);
 * console.log(growth); // 1.310315
 * ```
 * 
 * @throws {Error} Si time es negativo
 */
export function predictGrowth(
  model: SegmentedModel,
  time: number
): number {
  // ...
}
```

---

## 📊 Priorización Sugerida

### Sprint 1 (Semana 1)
- [ ] Tooltips informativos
- [ ] Validación de entrada
- [ ] Exportación a CSV/JSON
- [ ] Tests unitarios básicos

### Sprint 2 (Semana 2)
- [ ] Intervalos de confianza
- [ ] Caché de predicciones
- [ ] Detección de outliers
- [ ] Mejoras de accesibilidad

### Sprint 3 (Semana 3)
- [ ] Modelo de 3 fases
- [ ] Gráfico de heatmap
- [ ] Análisis de sensibilidad
- [ ] Comparación de modelos

### Sprint 4 (Semana 4)
- [ ] Importación de CSV personalizado
- [ ] Animación temporal
- [ ] Modo oscuro/claro
- [ ] Documentación completa

---

## 💡 Ideas Futuras

- **Machine Learning:** Usar redes neuronales para predecir coeficientes
- **Simulación Estocástica:** Incorporar variabilidad aleatoria
- **API REST:** Exponer modelos como servicio
- **Aplicación Móvil:** Versión nativa iOS/Android
- **Integración con Laboratorios:** API para recibir datos en tiempo real
- **Colaboración:** Múltiples usuarios trabajando en el mismo análisis

---

*Este documento será actualizado conforme se implementen las mejoras*

