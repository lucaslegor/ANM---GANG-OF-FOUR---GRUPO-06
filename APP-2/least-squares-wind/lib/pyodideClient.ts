let _pyodide: any = null

export async function runPyodideFit(payload: { x: number[]; y: number[]; models: string[] }) {
  if (!_pyodide) {
    // @ts-ignore
    const { loadPyodide } = await import("https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.mjs")
    _pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/" })
    await _pyodide.loadPackage(["numpy"]).catch(() => {})
  }

  const code = `
import json, math
import numpy as np

def r2(y, yhat):
    ybar = y.mean()
    ss_res = ((y - yhat)**2).sum()
    ss_tot = ((y - ybar)**2).sum()
    return float(1 - ss_res/ss_tot) if ss_tot != 0 else 0.0

def r2_adj(y, yhat, k):
    n = len(y)
    R2 = r2(y, yhat)
    return float('nan') if (n - k - 1) <= 0 else float(1 - (1-R2)*(n-1)/(n-k-1))

def fit_linear(x, y):
    X = np.column_stack([np.ones_like(x), x])
    beta, *_ = np.linalg.lstsq(X, y, rcond=None)
    yhat = X @ beta
    k=2
    return {
      'coef':[float(beta[0]), float(beta[1])],
      'yhat': yhat.tolist(),
      'residuals': (y-yhat).tolist(),
      'r2': r2(y,yhat),
      'r2Adj': r2_adj(y,yhat,k),
      'latex': f"y = {beta[0]:.3f} + {beta[1]:.3f} x",
      'k': k,
    }

def fit_quadratic(x, y):
    X = np.column_stack([np.ones_like(x), x, x**2])
    beta, *_ = np.linalg.lstsq(X, y, rcond=None)
    yhat = X @ beta
    k=3
    return {
      'coef':[float(beta[0]), float(beta[1]), float(beta[2])],
      'yhat': yhat.tolist(),
      'residuals': (y-yhat).tolist(),
      'r2': r2(y,yhat),
      'r2Adj': r2_adj(y,yhat,k),
      'latex': f"y = {beta[0]:.3f} + {beta[1]:.3f} x + {beta[2]:.3f} x^2",
      'k': k,
    }

def fit_power(x, y):
    mask = (x>0) & (y>0)
    if not mask.any():
        return { 'error': 'No positive x,y pairs for power model' }
    lx = np.log(x[mask]); ly = np.log(y[mask])
    X = np.column_stack([np.ones_like(lx), lx])
    beta, *_ = np.linalg.lstsq(X, ly, rcond=None)
    a = math.exp(beta[0]); b = beta[1]
    yhat = a*(x**b)
    k=2
    return {
      'coef':[float(a), float(b)],
      'yhat': yhat.tolist(),
      'residuals': (y-yhat).tolist(),
      'r2': r2(y,yhat),
      'r2Adj': r2_adj(y,yhat,k),
      'latex': f"y = {a:.3f}\\\\, x^{{{b:.3f}}}",
      'k': k,
    }

def run(payload):
    x = np.array(payload['x'], dtype=float)
    y = np.array(payload['y'], dtype=float)
    models = payload.get('models', ['linear','quadratic','power'])
    out = {}
    if 'linear' in models: out['linear'] = fit_linear(x,y)
    if 'quadratic' in models: out['quadratic'] = fit_quadratic(x,y)
    if 'power' in models: out['power'] = fit_power(x,y)
    return { 'models': out }
`

  _pyodide.globals.set("payload", payload)
  await _pyodide.runPythonAsync(code)
  const result = await _pyodide.runPythonAsync("run(payload)")
  return result
}
