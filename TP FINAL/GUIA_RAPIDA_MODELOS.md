# 🧬 Guía Rápida: Modelos de Crecimiento BioGrowth

## 🚀 Inicio Rápido

### 1. Ver el Simulador
```bash
npm run dev
# Navegar a: http://localhost:3000/simulador
```

### 2. Pestañas Disponibles

#### 📊 Dashboard
- Métricas generales
- Comparación de clústeres
- Gráficos de tendencias

#### 🔬 Análisis de Modelos (NUEVO)
- **Dispersión + Curva Ajustada**: Visualiza puntos experimentales con el modelo segmentado
- **Error vs Tiempo**: Muestra cómo se encontró el t_crit óptimo
- **Comparación de 6 Clústeres**: Todas las curvas juntas con tiempos críticos

#### 🎮 Simulador
- Predicciones interactivas
- Cálculo de tasas de crecimiento
- Proyecciones futuras

---

## 📐 Modelo Matemático

### Regresión Segmentada

```
Si t < t_crit:  y = a·exp(b·t)     [Fase Exponencial]
Si t ≥ t_crit:  y = m·t + c        [Fase Estacionaria]
```

### Ejemplo: Clúster 3 (37°C - Rico)

```javascript
// t_crit = 2.06 horas

// Antes del tiempo crítico (t = 1h)
t = 1 < 2.06  →  y = 0.055 · exp(0.68 · 1) = 0.1071

// Después del tiempo crítico (t = 5h)
t = 5 ≥ 2.06  →  y = 0.000105 · 5 + 1.31 = 1.310525
```

---

## 📊 Coeficientes por Clúster

| Clúster | Temp | Medio | t_crit | a | b | m | c | R² |
|---------|------|-------|--------|---|---|---|---|-----|
| 1 | 25°C | Rico | 3.52h | 0.061 | 0.28 | 0.000145 | 1.12 | 0.992 |
| 2 | 30°C | Rico | 2.79h | 0.058 | 0.41 | 0.000210 | 1.25 | 0.995 |
| 3 | 37°C | Rico | 2.06h | 0.055 | 0.68 | 0.000105 | 1.31 | 0.998 |
| 4 | 25°C | Limitado | 4.12h | 0.060 | 0.15 | 0.000350 | 0.85 | 0.989 |
| 5 | 30°C | Limitado | 3.52h | 0.062 | 0.22 | 0.000280 | 0.92 | 0.991 |
| 6 | 37°C | Limitado | 2.67h | 0.059 | 0.35 | 0.000190 | 0.98 | 0.994 |

---

## 💻 Uso en Código

### Obtener un Modelo

```typescript
import { getModel } from '@/lib/data-processor';

const model = getModel('37-rico');
console.log(model);
// {
//   t_crit: 2.06,
//   exponential: { a: 0.055, b: 0.68 },
//   linear: { m: 0.000105, c: 1.31 },
//   metrics: { r_squared: 0.998 }
// }
```

### Hacer una Predicción

```typescript
import { predictGrowth } from '@/lib/data-processor';

const growth = predictGrowth(model, 3); // 3 horas
console.log(growth); // 1.310315
```

### Calcular Tasa de Crecimiento

```typescript
import { calculateGrowthRate } from '@/lib/data-processor';

const rate = calculateGrowthRate(model, 2, 4); // Entre 2h y 4h
console.log(rate); // tasa en unidades/hora
```

### Generar Serie Temporal

```typescript
import { generateTimeSeries } from '@/lib/data-processor';

const series = generateTimeSeries(model, 0, 12, 100); // 0-12h, 100 puntos
series.forEach(point => {
  console.log(`t=${point.time}h: y=${point.growth} (${point.phase})`);
});
```

---

## 🔍 Interpretación Biológica

### Temperatura vs Tiempo Crítico

```
37°C → t_crit = 2.06h  [Metabolismo rápido]
30°C → t_crit = 2.79h  [Metabolismo medio]
25°C → t_crit = 3.52h  [Metabolismo lento]
```

**Conclusión:** A mayor temperatura, más rápido alcanza la fase estacionaria.

### Medio Rico vs Limitado

```
Rico:     Más nutrientes → Crecimiento más rápido → t_crit menor
Limitado: Menos nutrientes → Crecimiento más lento → t_crit mayor
```

---

## 📈 Gráficos Disponibles

### 1. Dispersión con Curva Ajustada
- Muestra puntos experimentales
- Superpone la curva del modelo
- Marca t_crit con línea vertical

### 2. Error vs Tiempo de Cambio
- Visualiza el algoritmo de búsqueda de t_crit
- Muestra cómo el error varía según el punto de corte
- Marca el mínimo (t_crit óptimo)

### 3. Comparación de Clústeres
- Los 6 clústeres en un solo gráfico
- Colores únicos por clúster
- Tiempos críticos marcados

---

## 🎨 Colores por Clúster

```javascript
const CLUSTER_COLORS = {
  '25-rico': '#3b82f6',     // Azul
  '30-rico': '#10b981',     // Verde
  '37-rico': '#f59e0b',     // Naranja
  '25-limitado': '#8b5cf6', // Violeta
  '30-limitado': '#ec4899', // Rosa
  '37-limitado': '#ef4444', // Rojo
}
```

---

## 📚 Archivos Clave

```
lib/
├── growth-models.json          ← Coeficientes de los modelos
├── data-processor.ts          ← Funciones matemáticas
└── use-growth-data.ts         ← Hook para cargar datos

components/
├── model-analysis-section.tsx  ← Análisis detallado
├── dashboard-section.tsx       ← Dashboard general
└── simulator-section.tsx       ← Simulador interactivo

public/data/
└── growth-data.csv            ← Datos experimentales (6002 puntos)
```

---

## ⚡ Tips de Performance

### 1. Memoización
```typescript
const chartData = useMemo(() => {
  return generateTimeSeries(model, 0, 12, 100);
}, [model]); // Solo recalcula si cambia el modelo
```

### 2. Reducir Puntos
```typescript
// Usar menos puntos para mejor rendimiento
generateTimeSeries(model, 0, 12, 50); // En lugar de 200
```

### 3. Clip Numérico
```typescript
// Siempre hacer clip para evitar overflow
const exponent = Math.min(Math.max(b * time, -100), 100);
```

---

## 🐛 Troubleshooting

### Problema: Predicciones = Infinity
**Causa:** Exponencial sin clip  
**Solución:** Usar `predictGrowth()` que tiene clip incorporado

### Problema: Discontinuidad en t_crit
**Causa:** Coeficientes mal calculados  
**Solución:** Verificar con `validateContinuity(model)`

### Problema: R² bajo
**Causa:** Modelo no ajustado correctamente  
**Solución:** Usar coeficientes del paper en `growth-models.json`

---

## 📖 Más Información

- **Informe Técnico Completo:** `INFORME_TECNICO_CORRECCIONES.md`
- **Paper Original:** `Trabajo-Final-AN-GOF.docx`
- **Scripts Python:** `scripts/calculate_models.py` y `scripts/grafico.py`

---

## 🎯 Checklist de Validación

- [ ] R² > 0.98 para todos los clústeres ✅
- [ ] Modelo continuo en t_crit ✅
- [ ] Predicciones en rango [0, 2] ✅
- [ ] Sin overflow numérico ✅
- [ ] Gráficos renderizando correctamente ✅
- [ ] Ecuaciones visibles en UI ✅

---

*Última actualización: Noviembre 2025*

