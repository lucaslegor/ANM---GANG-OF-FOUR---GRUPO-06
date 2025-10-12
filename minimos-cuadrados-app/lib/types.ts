export interface DataPoint {
  x: number
  y: number
}

export interface RegressionResult {
  name: string
  type: "linear" | "polynomial" | "exponential" | "power"
  equation: string
  coefficients: number[]
  r2: number
  r2Adj: number
  predictions: number[]
  residuals: number[]
}
