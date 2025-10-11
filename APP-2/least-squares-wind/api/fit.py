# Vercel Python Serverless Function — Least Squares with NumPy
import json
import math

try:
    import numpy as np
except Exception:
    np = None


def _r2(y, yhat):
    ybar = y.mean()
    ss_res = ((y - yhat) ** 2).sum()
    ss_tot = ((y - ybar) ** 2).sum()
    return float(1 - ss_res / ss_tot) if ss_tot != 0 else 0.0


def _r2_adj(y, yhat, k):
    n = len(y)
    r2 = _r2(y, yhat)
    if n - k - 1 <= 0:
        return float("nan")
    return float(1 - (1 - r2) * (n - 1) / (n - k - 1))


def fit_linear(x, y):
    X = np.column_stack([np.ones_like(x), x])
    beta, *_ = np.linalg.lstsq(X, y, rcond=None)
    yhat = X @ beta
    k = 2
    return {
        "coef": [float(beta[0]), float(beta[1])],
        "yhat": yhat.tolist(),
        "residuals": (y - yhat).tolist(),
        "r2": _r2(y, yhat),
        "r2Adj": _r2_adj(y, yhat, k),
        "latex": f"y = {beta[0]:.3f} + {beta[1]:.3f} x",
        "k": k,
    }


def fit_quadratic(x, y):
    X = np.column_stack([np.ones_like(x), x, x**2])
    beta, *_ = np.linalg.lstsq(X, y, rcond=None)
    yhat = X @ beta
    k = 3
    return {
        "coef": [float(beta[0]), float(beta[1]), float(beta[2])],
        "yhat": yhat.tolist(),
        "residuals": (y - yhat).tolist(),
        "r2": _r2(y, yhat),
        "r2Adj": _r2_adj(y, yhat, k),
        "latex": f"y = {beta[0]:.3f} + {beta[1]:.3f} x + {beta[2]:.3f} x^2",
        "k": k,
    }


def fit_power(x, y):
    mask = (x > 0) & (y > 0)
    if not mask.any():
        return {"error": "No positive x,y pairs for power model"}
    lx = np.log(x[mask])
    ly = np.log(y[mask])
    X = np.column_stack([np.ones_like(lx), lx])
    beta, *_ = np.linalg.lstsq(X, ly, rcond=None)
    a = math.exp(beta[0])
    b = beta[1]
    yhat = a * (x**b)
    k = 2
    return {
        "coef": [float(a), float(b)],
        "yhat": yhat.tolist(),
        "residuals": (y - yhat).tolist(),
        "r2": _r2(y, yhat),
        "r2Adj": _r2_adj(y, yhat, k),
        "latex": f"y = {a:.3f}\\, x^{{{b:.3f}}}",
        "k": k,
    }


def handler(request):
    """Vercel Python handler"""
    if request.method != "POST":
        return {"statusCode": 405, "body": json.dumps({"error": "Use POST"})}

    try:
        data = request.json
        x = np.array(data.get("x", []), dtype=float)
        y = np.array(data.get("y", []), dtype=float)
        models = data.get("models", ["linear", "quadratic", "power"])

        if len(x) != len(y) or len(x) == 0:
            return {"statusCode": 400, "body": json.dumps({"error": "Invalid x/y lengths"})}

        out = {}
        if "linear" in models:
            out["linear"] = fit_linear(x, y)
        if "quadratic" in models:
            out["quadratic"] = fit_quadratic(x, y)
        if "power" in models:
            out["power"] = fit_power(x, y)

        return {"statusCode": 200, "body": json.dumps({"models": out})}
    except Exception as e:
        return {"statusCode": 500, "body": json.dumps({"error": str(e)})}
