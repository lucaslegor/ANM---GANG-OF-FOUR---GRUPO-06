export function mean(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length
}

export function variance(arr: number[]): number {
  const m = mean(arr)
  return arr.reduce((sum, val) => sum + (val - m) ** 2, 0) / arr.length
}

export function rSquared(y: number[], yhat: number[]): number {
  const yMean = mean(y)
  const ssTot = y.reduce((sum, val) => sum + (val - yMean) ** 2, 0)
  const ssRes = y.reduce((sum, val, i) => sum + (val - yhat[i]) ** 2, 0)
  return 1 - ssRes / ssTot
}

export function rSquaredAdj(y: number[], yhat: number[], kParams: number): number {
  const n = y.length
  const r2 = rSquared(y, yhat)
  return 1 - ((1 - r2) * (n - 1)) / (n - kParams - 1)
}

export function solveNormal(X: number[][], y: number[]): number[] {
  // Solve X^T X β = X^T y using Gaussian elimination
  const n = X.length
  const m = X[0].length

  // Compute X^T X
  const XTX: number[][] = Array(m)
    .fill(0)
    .map(() => Array(m).fill(0))
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < m; j++) {
      for (let k = 0; k < n; k++) {
        XTX[i][j] += X[k][i] * X[k][j]
      }
    }
  }

  // Compute X^T y
  const XTy: number[] = Array(m).fill(0)
  for (let i = 0; i < m; i++) {
    for (let k = 0; k < n; k++) {
      XTy[i] += X[k][i] * y[k]
    }
  }

  // Gaussian elimination
  const A = XTX.map((row, i) => [...row, XTy[i]])

  for (let i = 0; i < m; i++) {
    // Partial pivoting
    let maxRow = i
    for (let k = i + 1; k < m; k++) {
      if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) {
        maxRow = k
      }
    }
    ;[A[i], A[maxRow]] = [A[maxRow], A[i]]

    // Make all rows below this one 0 in current column
    for (let k = i + 1; k < m; k++) {
      const factor = A[k][i] / A[i][i]
      for (let j = i; j <= m; j++) {
        A[k][j] -= factor * A[i][j]
      }
    }
  }

  // Back substitution
  const beta: number[] = Array(m).fill(0)
  for (let i = m - 1; i >= 0; i--) {
    beta[i] = A[i][m]
    for (let j = i + 1; j < m; j++) {
      beta[i] -= A[i][j] * beta[j]
    }
    beta[i] /= A[i][i]
  }

  return beta
}

export function calculateSST(y: number[]): number {
  const yMean = mean(y)
  return y.reduce((sum, val) => sum + (val - yMean) ** 2, 0)
}

export function calculateSSE(y: number[], yhat: number[]): number {
  return y.reduce((sum, val, i) => sum + (val - yhat[i]) ** 2, 0)
}

export function fitLinear(x: number[], y: number[]) {
  const n = x.length
  const X = x.map((xi) => [1, xi])
  const beta = solveNormal(X, y)

  const yhat = x.map((xi) => beta[0] + beta[1] * xi)
  const resid = y.map((yi, i) => yi - yhat[i])

  return {
    a0: beta[0],
    a1: beta[1],
    r2: rSquared(y, yhat),
    r2Adj: rSquaredAdj(y, yhat, 1),
    yhat,
    resid,
    sst: calculateSST(y),
    sse: calculateSSE(y, yhat),
    equation: `y = ${beta[0].toFixed(3)} + ${beta[1].toFixed(3)}x`,
  }
}

export function fitQuadratic(x: number[], y: number[]) {
  const n = x.length
  const X = x.map((xi) => [1, xi, xi ** 2])
  const beta = solveNormal(X, y)

  const yhat = x.map((xi) => beta[0] + beta[1] * xi + beta[2] * xi ** 2)
  const resid = y.map((yi, i) => yi - yhat[i])

  return {
    a0: beta[0],
    a1: beta[1],
    a2: beta[2],
    r2: rSquared(y, yhat),
    r2Adj: rSquaredAdj(y, yhat, 2),
    yhat,
    resid,
    sst: calculateSST(y),
    sse: calculateSSE(y, yhat),
    equation: `y = ${beta[0].toFixed(3)} + ${beta[1].toFixed(3)}x + ${beta[2].toFixed(3)}x^2`,
  }
}

export function fitPower(x: number[], y: number[]) {
  // Filter out non-positive values
  const validIndices = x.map((xi, i) => (xi > 0 && y[i] > 0 ? i : -1)).filter((i) => i >= 0)

  if (validIndices.length < 3) {
    throw new Error("Power model requires positive x and y values")
  }

  const xValid = validIndices.map((i) => x[i])
  const yValid = validIndices.map((i) => y[i])

  // Transform to log-log
  const lnX = xValid.map(Math.log)
  const lnY = yValid.map(Math.log)

  // Fit linear model in log space
  const logFit = fitLinear(lnX, lnY)

  // Transform back
  const a = Math.exp(logFit.a0)
  const b = logFit.a1

  // Compute predictions in original scale
  const yhat = x.map((xi) => (xi > 0 ? a * xi ** b : 0))
  const resid = y.map((yi, i) => yi - yhat[i])

  return {
    a,
    b,
    r2: rSquared(y, yhat),
    r2Adj: rSquaredAdj(y, yhat, 1),
    yhat,
    resid,
    sst: calculateSST(y),
    sse: calculateSSE(y, yhat),
    equation: `y = ${a.toFixed(3)}x^{${b.toFixed(3)}}`,
  }
}

export function fitExponential(x: number[], y: number[]) {
  // Filter out non-positive y values
  const validIndices = x.map((xi, i) => (y[i] > 0 ? i : -1)).filter((i) => i >= 0)

  if (validIndices.length < 3) {
    throw new Error("Exponential model requires positive y values")
  }

  const xValid = validIndices.map((i) => x[i])
  const yValid = validIndices.map((i) => y[i])

  // Transform to semi-log: ln(y) = ln(a) + b*x
  const lnY = yValid.map(Math.log)

  // Fit linear model in log space
  const logFit = fitLinear(xValid, lnY)

  // Transform back
  const a = Math.exp(logFit.a0)
  const b = logFit.a1

  // Compute predictions in original scale
  const yhat = x.map((xi) => a * Math.exp(b * xi))
  const resid = y.map((yi, i) => yi - yhat[i])

  return {
    a,
    b,
    r2: rSquared(y, yhat),
    r2Adj: rSquaredAdj(y, yhat, 1),
    yhat,
    resid,
    sst: calculateSST(y),
    sse: calculateSSE(y, yhat),
    equation: `y = ${a.toFixed(3)}e^{${b.toFixed(3)}x}`,
  }
}
