import { DataPoint, RegressionResult } from './types'
import { calculateR2, calculateAdjustedR2 } from './metrics'

export function linearRegression(data: DataPoint[]): RegressionResult {
  const n = data.length
  const sumX = data.reduce((sum, p) => sum + p.x, 0)
  const sumY = data.reduce((sum, p) => sum + p.y, 0)
  const sumXY = data.reduce((sum, p) => sum + p.x * p.y, 0)
  const sumX2 = data.reduce((sum, p) => sum + p.x * p.x, 0)

  // Los coeficientes se nombran a0 (ordenada al origen) y a1 (pendiente) para mayor claridad.
  const a1 = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
  const a0 = (sumY - a1 * sumX) / n

  const predictions = data.map((p) => a0 + a1 * p.x)
  const residuals = data.map((p, i) => p.y - predictions[i])
  const r2 = calculateR2(data.map((p) => p.y), predictions)
  const r2Adj = calculateAdjustedR2(r2, n, 1); // p=1 para un modelo lineal (una variable predictora)

  return {
    name: "Regresión Lineal",
    type: "linear",
    equation: `y = ${a0.toFixed(4)} + ${a1.toFixed(4)}x`,
    coefficients: [a0, a1],
    r2,
    r2Adj,
    predictions,
    residuals,
  }
}

export function polynomialRegression(data: DataPoint[]): RegressionResult {
  const n = data.length
  const sumX = data.reduce((sum, p) => sum + p.x, 0)
  const sumY = data.reduce((sum, p) => sum + p.y, 0)
  const sumX2 = data.reduce((sum, p) => sum + p.x ** 2, 0)
  const sumX3 = data.reduce((sum, p) => sum + p.x ** 3, 0)
  const sumX4 = data.reduce((sum, p) => sum + p.x ** 4, 0)
  const sumXY = data.reduce((sum, p) => sum + p.x * p.y, 0)
  const sumX2Y = data.reduce((sum, p) => sum + p.x ** 2 * p.y, 0)

  // Resolvemos el sistema de ecuaciones con una matriz aumentada
  const matrix = [
    [n, sumX, sumX2, sumY],
    [sumX, sumX2, sumX3, sumXY],
    [sumX2, sumX3, sumX4, sumX2Y],
  ]

  const coeffs = gaussianElimination(matrix)
  const [a0, a1, a2] = coeffs

  const predictions = data.map((p) => a0 + a1 * p.x + a2 * p.x ** 2)
  const residuals = data.map((p, i) => p.y - predictions[i])
  const r2 = calculateR2(data.map((p) => p.y), predictions)
  const r2Adj = calculateAdjustedR2(r2, n, 2); // p=2 para un modelo cuadrático (dos variables predictoras: x, x^2)

  return {
    name: "Regresión Polinómica (Grado 2)",
    type: "polynomial",
    equation: `y = ${a0.toFixed(4)} + ${a1.toFixed(4)}x + ${a2.toFixed(4)}x^2`,
    coefficients: [a0, a1, a2],
    r2,
    r2Adj,
    predictions,
    residuals,
  }
}

export function powerRegression(data: DataPoint[]): RegressionResult {
  // 1. Linealización: ln(y) = ln(a) + b*ln(x)
  const validData = data.filter((p) => p.x > 0 && p.y > 0)
  const transformedData = validData.map((p) => ({ x: Math.log(p.x), y: Math.log(p.y) }))

  const n = transformedData.length
  const sumX = transformedData.reduce((sum, p) => sum + p.x, 0)
  const sumY = transformedData.reduce((sum, p) => sum + p.y, 0)
  const sumXY = transformedData.reduce((sum, p) => sum + p.x * p.y, 0)
  const sumX2 = transformedData.reduce((sum, p) => sum + p.x * p.x, 0)

  // 2. Cálculos de regresión sobre los datos linealizados
  // Calculamos los coeficientes 'A' y 'b' de la recta Y' = A + b*X'
  const b = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
  const lnA = (sumY - b * sumX) / n

  // 3. Volvemos al modelo original: y = a*x^b
  const a = Math.exp(lnA)

  const predictions = data.map((p) => a * Math.pow(p.x, b))
  const residuals = data.map((p, i) => p.y - predictions[i])
  const r2 = calculateR2(data.map((p) => p.y), predictions)
  const r2Adj = calculateAdjustedR2(r2, n, 1); // p=1 para una variable predictora (x)

  return {
    name: "Regresión Potencial",
    type: "power",
    equation: `y = ${a.toFixed(4)}x^(${b.toFixed(4)})`,
    coefficients: [a, b],
    r2,
    r2Adj,
    predictions,
    residuals,
  }
}

export function exponentialRegression(data: DataPoint[]): RegressionResult {
  // Transform: ln(y) = ln(a) + bx
  const validData = data.filter((p) => p.y > 0)
  const transformedData = validData.map((p) => ({ x: p.x, y: Math.log(p.y) }))

  const n = transformedData.length
  const sumX = transformedData.reduce((sum, p) => sum + p.x, 0)
  const sumY = transformedData.reduce((sum, p) => sum + p.y, 0)
  const sumXY = transformedData.reduce((sum, p) => sum + p.x * p.y, 0)
  const sumX2 = transformedData.reduce((sum, p) => sum + p.x * p.x, 0)

  const b = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
  const lnA = (sumY - b * sumX) / n
  const a = Math.exp(lnA)

  const predictions = data.map((p) => a * Math.exp(b * p.x))
  const residuals = data.map((p, i) => p.y - predictions[i])
  const r2 = calculateR2(data.map((p) => p.y), predictions)
  const r2Adj = calculateAdjustedR2(r2, n, 1); // p=1 para una variable predictora (x)

  return {
    name: "Regresión Exponencial",
    type: "exponential",
    equation: `y = ${a.toFixed(4)}e^(${b.toFixed(4)}x)`,
    coefficients: [a, b],
    r2,
    r2Adj,
    predictions,
    residuals,
  }
}

function gaussianElimination(matrix: number[][]): number[] {
  const n = matrix.length

  // Forward elimination
  for (let i = 0; i < n; i++) {
    // Find pivot
    let maxRow = i
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(matrix[k][i]) > Math.abs(matrix[maxRow][i])) {
        maxRow = k
      }
    }
    // Swap rows
    ;[matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]]

    // Make all rows below this one 0 in current column
    for (let k = i + 1; k < n; k++) {
      const factor = matrix[k][i] / matrix[i][i]
      for (let j = i; j <= n; j++) {
        matrix[k][j] -= factor * matrix[i][j]
      }
    }
  }

  // Back substitution
  const solution = new Array(n).fill(0)
  for (let i = n - 1; i >= 0; i--) {
    solution[i] = matrix[i][n]
    for (let j = i + 1; j < n; j++) {
      solution[i] -= matrix[i][j] * solution[j]
    }
    solution[i] /= matrix[i][i]
  }

  return solution
}
