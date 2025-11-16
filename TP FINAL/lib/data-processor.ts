import { PolynomialRegression } from 'ml-regression';

export interface DataPoint {
  time: number; // tiempo en horas
  growth: number; // crecimiento normalizado
  temperature: number;
  medium: string;
  cluster: string;
}

export interface ClusterData {
  cluster: string;
  temperature: number;
  medium: string;
  dataPoints: DataPoint[];
  model?: PolynomialRegression;
  rSquared?: number;
  rmse?: number;
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

// Función para parsear el CSV
export function parseCSV(csvText: string): DataPoint[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(';').map(h => h.trim());
  
  const data: DataPoint[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const values = line.split(';').map(v => v.trim());
    if (values.length < 6) continue;
    
    try {
      const temperature = parseFloat(values[1]);
      const medium = values[2].toLowerCase().trim();
      const timeHours = parseFloat(values[4].replace(',', '.').trim());
      const growthStr = values[5].replace(',', '.').trim();
      const growth = parseFloat(growthStr);
      
      // Validar que los valores sean números válidos
      if (isNaN(temperature) || isNaN(timeHours) || isNaN(growth)) {
        continue;
      }
      
      // Normalizar nombres de medio
      const normalizedMedium = medium === 'rico' || medium === 'rich' ? 'rico' : 'limitado';
      
      // Crear identificador de cluster
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

// Agrupar datos por cluster
export function groupByCluster(data: DataPoint[]): Map<string, ClusterData> {
  const clusters = new Map<string, ClusterData>();
  
  for (const point of data) {
    if (!clusters.has(point.cluster)) {
      clusters.set(point.cluster, {
        cluster: point.cluster,
        temperature: point.temperature,
        medium: point.medium,
        dataPoints: [],
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

// Calcular R²
function calculateRSquared(actual: number[], predicted: number[]): number {
  const n = actual.length;
  const meanActual = actual.reduce((a, b) => a + b, 0) / n;
  
  const ssRes = actual.reduce((sum, val, i) => {
    return sum + Math.pow(val - predicted[i], 2);
  }, 0);
  
  const ssTot = actual.reduce((sum, val) => {
    return sum + Math.pow(val - meanActual, 2);
  }, 0);
  
  return 1 - (ssRes / ssTot);
}

// Calcular RMSE
function calculateRMSE(actual: number[], predicted: number[]): number {
  const n = actual.length;
  const mse = actual.reduce((sum, val, i) => {
    return sum + Math.pow(val - predicted[i], 2);
  }, 0) / n;
  
  return Math.sqrt(mse);
}

// Ajustar modelo por mínimos cuadrados usando regresión polinomial
export function fitModel(clusterData: ClusterData, degree: number = 5): ClusterData {
  const { dataPoints } = clusterData;
  
  if (dataPoints.length < degree + 1) {
    console.warn(`Not enough data points for degree ${degree} polynomial`);
    return clusterData;
  }
  
  // Preparar datos para regresión
  const x = dataPoints.map(p => p.time);
  const y = dataPoints.map(p => p.growth);
  
  // Crear modelo polinomial
  const regression = new PolynomialRegression(x, y, degree);
  
  // Calcular predicciones
  const predicted = x.map(t => regression.predict(t));
  
  // Calcular métricas
  const rSquared = calculateRSquared(y, predicted);
  const rmse = calculateRMSE(y, predicted);
  
  return {
    ...clusterData,
    model: regression,
    rSquared,
    rmse,
  };
}

// Predecir crecimiento para un tiempo dado
export function predictGrowth(model: PolynomialRegression, time: number): number {
  return Math.max(0, Math.min(1, model.predict(time))); // Asegurar que esté entre 0 y 1
}

// Calcular tasa de crecimiento entre dos tiempos
export function calculateGrowthRate(
  model: PolynomialRegression,
  t1: number,
  t2: number
): number {
  if (t2 <= t1) return 0;
  
  const growth1 = predictGrowth(model, t1);
  const growth2 = predictGrowth(model, t2);
  
  return (growth2 - growth1) / (t2 - t1);
}

