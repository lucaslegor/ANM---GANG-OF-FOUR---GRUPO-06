/**
 * Data Processor con Regresión Segmentada
 * * Implementa la metodología exacta del paper:
 * - Fase exponencial: y = a·exp(b·t) para t < t_crit
 * - Fase estacionaria: y = m·t + c para t >= t_crit
 * * Los coeficientes fueron calculados usando mínimos cuadrados
 * y están almacenados en growth-model.json
 */

// CORRECCIÓN 1: Nombre del archivo en singular
import growthModelsData from './growth-models.json';

export interface DataPoint {
  time: number; // tiempo en horas
  growth: number; // crecimiento normalizado
  temperature: number;
  medium: string;
  cluster: string;
}

export interface SegmentedModel {
  cluster_id: number;
  temperature: number;
  medium: string;
  medium_label: string;
  t_crit: number;
  exponential: {
    a: number;
    b: number;
  };
  linear: {
    m: number;
    c: number;
  };
  metrics: {
    r_squared: number;
    r_squared_adj: number;
    rmse: number;
    sse: number;
  };
  data_points: {
    total: number;
    exponential_phase: number;
    stationary_phase: number;
  };
}

export interface ClusterData {
  cluster: string;
  temperature: number;
  medium: string;
  dataPoints: DataPoint[];
  model: SegmentedModel;
  rSquared: number;
  rmse: number;
}

export interface ClusterOption {
  id: string;
  label: string;
  temperature: number;
  medium: string;
}

export const CLUSTER_OPTIONS: ClusterOption[] = [
  { id: '25-rich', label: '25°C - Medio Rico', temperature: 25, medium: 'rico' },
  { id: '25-limited', label: '25°C - Medio Limitado', temperature: 25, medium: 'limitado' },
  { id: '30-rich', label: '30°C - Medio Rico', temperature: 30, medium: 'rico' },
  { id: '30-limited', label: '30°C - Medio Limitado', temperature: 30, medium: 'limitado' },
  { id: '37-rich', label: '37°C - Medio Rico', temperature: 37, medium: 'rico' },
  { id: '37-limited', label: '37°C - Medio Limitado', temperature: 37, medium: 'limitado' },
];

// Cargar modelos pre-calculados
const GROWTH_MODELS = growthModelsData as unknown as Record<string, SegmentedModel>;

/**
 * Función para parsear el CSV (CORRECCIÓN 2: Soporte para comas y puntos)
 */
export function parseCSV(csvText: string): DataPoint[] {
  const lines = csvText.trim().split('\n');
  const data: DataPoint[] = [];
  
  // Empezamos desde 1 para saltar el encabezado
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Detectamos si usa ; o , para separar columnas
    const separator = line.indexOf(';') !== -1 ? ';' : ',';
    const values = line.split(separator).map(v => v.trim());

    if (values.length < 6) continue;
    
    try {
      const temperature = parseFloat(values[1]);
      const medium = values[2].toLowerCase().trim();
      
      // Reemplaza la coma decimal por punto antes de convertir
      const timeVal = values[4].replace(',', '.').trim();
      const growthVal = values[5].replace(',', '.').trim();
      
      const timeHours = parseFloat(timeVal);
      const growth = parseFloat(growthVal);
      
      if (isNaN(temperature) || isNaN(timeHours) || isNaN(growth)) {
        continue;
      }
      
      const normalizedMedium = medium === 'rico' || medium === 'rich' ? 'rico' : 'limitado';
      
      // Crear identificador de cluster que coincida con el JSON (ej: "25-rico")
      const cluster = `${temperature}-${normalizedMedium}`;
      
      data.push({
        time: timeHours,
        growth: growth,
        temperature,
        medium: normalizedMedium,
        cluster,
      });
    } catch (error) {
      console.warn(`Error parsing line ${i}:`, error, line);
    }
  }
  
  return data;
}

/**
 * Agrupar datos por cluster y asignar modelo segmentado
 */
export function groupByCluster(data: DataPoint[]): Map<string, ClusterData> {
  const clusters = new Map<string, ClusterData>();
  
  for (const point of data) {
    if (!clusters.has(point.cluster)) {
      const model = GROWTH_MODELS[point.cluster];
      
      if (!model) {
        // Silenciamos el warning si no es crítico, o revisa si los nombres en JSON coinciden
        // console.warn(`No model found for cluster: ${point.cluster}`);
        continue;
      }
      
      clusters.set(point.cluster, {
        cluster: point.cluster,
        temperature: point.temperature,
        medium: point.medium,
        dataPoints: [],
        model: model,
        rSquared: model.metrics.r_squared,
        rmse: model.metrics.rmse,
      });
    }
    
    clusters.get(point.cluster)!.dataPoints.push(point);
  }
  
  // Ordenar puntos por tiempo
  for (const cluster of clusters.values()) {
    cluster.dataPoints.sort((a, b) => a.time - b.time);
  }
  
  return clusters;
}

export function predictGrowth(model: SegmentedModel, time: number): number {
  if (time < 0) return 0;
  
  let prediction: number;
  
  if (time < model.t_crit) {
    // Fase exponencial
    const { a, b } = model.exponential;
    const exponent = Math.min(Math.max(b * time, -100), 100);
    prediction = a * Math.exp(exponent);
  } else {
    // Fase estacionaria
    const { m, c } = model.linear;
    prediction = m * time + c;
  }
  
  return Math.max(0, Math.min(2, prediction));
}

export function calculateGrowthRate(
  model: SegmentedModel,
  t1: number,
  t2: number
): number {
  if (t2 <= t1) return 0;
  const growth1 = predictGrowth(model, t1);
  const growth2 = predictGrowth(model, t2);
  return (growth2 - growth1) / (t2 - t1);
}

export function calculateDerivative(model: SegmentedModel, time: number): number {
  if (time < model.t_crit) {
    const { a, b } = model.exponential;
    const exponent = Math.min(Math.max(b * time, -100), 100);
    return a * b * Math.exp(exponent);
  } else {
    return model.linear.m;
  }
}

export function generateTimeSeries(
  model: SegmentedModel,
  tStart: number,
  tEnd: number,
  numPoints: number = 200
): Array<{ time: number; growth: number; phase: 'exponential' | 'stationary' }> {
  const points: Array<{ time: number; growth: number; phase: 'exponential' | 'stationary' }> = [];
  const step = (tEnd - tStart) / (numPoints - 1);
  
  for (let i = 0; i < numPoints; i++) {
    const time = tStart + i * step;
    const growth = predictGrowth(model, time);
    const phase = time < model.t_crit ? 'exponential' : 'stationary';
    points.push({ time, growth, phase });
  }
  
  return points;
}

export function getModel(clusterId: string): SegmentedModel | null {
  const option = CLUSTER_OPTIONS.find(opt => opt.id === clusterId);
  if (!option) return null;
  const clusterKey = `${option.temperature}-${option.medium}`;
  return GROWTH_MODELS[clusterKey] || null;
}

export function getModelDescription(model: SegmentedModel): {
  exponentialEquation: string;
  linearEquation: string;
  criticalTime: string;
  rSquared: string;
} {
  const { exponential, linear, t_crit, metrics } = model;
  
  return {
    exponentialEquation: `y = ${exponential.a.toFixed(6)} · exp(${exponential.b.toFixed(6)} · t)`,
    linearEquation: `y = ${linear.m.toExponential(3)} · t + ${linear.c.toFixed(4)}`,
    criticalTime: `${t_crit.toFixed(2)} horas`,
    rSquared: metrics.r_squared.toFixed(6),
  };
}

export function validateContinuity(model: SegmentedModel): {
  continuous: boolean;
  gap: number;
  valueExp: number;
  valueLin: number;
} {
  const t = model.t_crit;
  const { a, b } = model.exponential;
  const exponent = Math.min(Math.max(b * t, -100), 100);
  const valueExp = a * Math.exp(exponent);
  
  const { m, c } = model.linear;
  const valueLin = m * t + c;
  
  const gap = Math.abs(valueExp - valueLin);
  const continuous = gap < 0.01;
  
  return { continuous, gap, valueExp, valueLin };
}