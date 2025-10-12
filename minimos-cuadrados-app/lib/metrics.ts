export function calculateR2(actual: number[], predicted: number[]): number {
  const mean = actual.reduce((sum, val) => sum + val, 0) / actual.length
  const ssTotal = actual.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0)
  const ssResidual = actual.reduce((sum, val, i) => sum + Math.pow(val - predicted[i], 2), 0)
  return ssTotal !== 0 ? 1 - ssResidual / ssTotal : 0
}

export function calculateAdjustedR2(r2: number, n: number, p: number): number {
  if (n - p - 1 <= 0) return NaN;
  return 1 - ((1 - r2) * (n - 1)) / (n - p - 1)
}
