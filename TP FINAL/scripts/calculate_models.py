"""
Script para calcular los modelos de regresión segmentada siguiendo la metodología exacta del paper.

Para cada clúster:
1. Encuentra el tiempo crítico t_crit que minimiza el error total
2. Ajusta modelo exponencial y = a·exp(b·t) para t < t_crit
3. Ajusta modelo lineal y = m·t + c para t >= t_crit
4. Calcula R² para validar el ajuste
"""

import pandas as pd
import numpy as np
from scipy.optimize import curve_fit
import json

# Cargar datos
df = pd.read_csv('../public/data/growth-data.csv', sep=';', decimal=',')
df.columns = df.columns.str.strip()
df['medio'] = df['medio'].str.strip().str.title()

# Definición de modelos matemáticos
def model_exp(t, a, b):
    """Modelo exponencial: y = a·exp(b·t)"""
    return a * np.exp(np.clip(b * t, -100, 100))  # Clip para seguridad numérica

def model_linear(t, m, c):
    """Modelo lineal: y = m·t + c"""
    return m * t + c

# Definición de clústeres
clusters_def = [
    (1, 25, 'Rico'),
    (2, 30, 'Rico'),
    (3, 37, 'Rico'),
    (4, 25, 'Limitado'),
    (5, 30, 'Limitado'),
    (6, 37, 'Limitado')
]

# Almacenar resultados
results = {}

print("=" * 80)
print("CÁLCULO DE MODELOS DE REGRESIÓN SEGMENTADA")
print("Metodología: Mínimos Cuadrados con ajuste Exponencial + Lineal")
print("=" * 80)
print()

for cluster_id, temp, medio in clusters_def:
    print(f"{'='*80}")
    print(f"CLÚSTER {cluster_id}: {temp}°C - Medio {medio}")
    print(f"{'='*80}")
    
    # Filtrar y ordenar datos del clúster
    subset = df[(df['temperatura_°C'] == temp) & (df['medio'] == medio)].sort_values('tiempo_h')
    t = subset['tiempo_h'].values
    y = subset['Crecimiento normalizado'].values
    
    print(f"Puntos de datos: {len(t)}")
    print(f"Rango de tiempo: {t.min():.2f}h - {t.max():.2f}h")
    print(f"Rango de crecimiento: {y.min():.4f} - {y.max():.4f}")
    print()
    
    best_t = None
    min_error = float('inf')
    best_params_exp = None
    best_params_lin = None
    best_idx = None
    
    # Iterar buscando el punto de corte óptimo
    # Se deja un margen de 4 puntos al inicio y final para poder ajustar
    n = len(t)
    errors = []  # Para graficar después
    
    print("Buscando tiempo crítico óptimo...")
    for i in range(4, n - 4):
        t_exp, y_exp = t[:i], y[:i]  # Parte Exponencial
        t_lin, y_lin = t[i:], y[i:]  # Parte Lineal
        
        try:
            # Ajuste Exponencial
            popt_e, _ = curve_fit(model_exp, t_exp, y_exp, maxfev=5000)
            y_pred_e = model_exp(t_exp, *popt_e)
            error_e = np.sum((y_exp - y_pred_e)**2)
            
            # Ajuste Lineal
            popt_l, _ = curve_fit(model_linear, t_lin, y_lin, maxfev=5000)
            y_pred_l = model_linear(t_lin, *popt_l)
            error_l = np.sum((y_lin - y_pred_l)**2)
            
            total_error = error_e + error_l
            errors.append((t[i], total_error))
            
            if total_error < min_error:
                min_error = total_error
                best_t = t[i]
                best_params_exp = popt_e
                best_params_lin = popt_l
                best_idx = i
        except Exception as e:
            continue
    
    print(f"✓ Tiempo crítico encontrado: t_crit = {best_t:.4f} horas")
    print()
    
    # Calcular R² para el modelo completo
    # Separar datos en dos fases
    t_exp_final = t[:best_idx]
    y_exp_final = y[:best_idx]
    t_lin_final = t[best_idx:]
    y_lin_final = y[best_idx:]
    
    # Predicciones
    y_pred_exp_final = model_exp(t_exp_final, *best_params_exp)
    y_pred_lin_final = model_linear(t_lin_final, *best_params_lin)
    
    # Concatenar predicciones
    y_pred_all = np.concatenate([y_pred_exp_final, y_pred_lin_final])
    y_all = np.concatenate([y_exp_final, y_lin_final])
    
    # Calcular R² global
    ss_res = np.sum((y_all - y_pred_all)**2)
    ss_tot = np.sum((y_all - np.mean(y_all))**2)
    r_squared = 1 - (ss_res / ss_tot)
    
    # Calcular R² ajustado
    n_params = 4  # 2 parámetros exponenciales + 2 parámetros lineales
    n_samples = len(y_all)
    r_squared_adj = 1 - (ss_res / (n_samples - n_params)) / (ss_tot / (n_samples - 1))
    
    # RMSE
    rmse = np.sqrt(np.mean((y_all - y_pred_all)**2))
    
    print("FASE EXPONENCIAL (t < t_crit):")
    print(f"  Modelo: y = {best_params_exp[0]:.6f} · exp({best_params_exp[1]:.6f} · t)")
    print(f"  Coeficientes: a = {best_params_exp[0]:.6f}, b = {best_params_exp[1]:.6f}")
    print(f"  Puntos ajustados: {len(t_exp_final)}")
    print()
    
    print("FASE ESTACIONARIA (t >= t_crit):")
    print(f"  Modelo: y = {best_params_lin[0]:.6f} · t + {best_params_lin[1]:.6f}")
    print(f"  Coeficientes: m = {best_params_lin[0]:.6f}, c = {best_params_lin[1]:.6f}")
    print(f"  Puntos ajustados: {len(t_lin_final)}")
    print()
    
    print("MÉTRICAS DE CALIDAD:")
    print(f"  R² = {r_squared:.6f}")
    print(f"  R² ajustado = {r_squared_adj:.6f}")
    print(f"  RMSE = {rmse:.6f}")
    print(f"  Error total (SSE) = {min_error:.6f}")
    print()
    
    # Guardar resultados
    cluster_key = f"{temp}-{'rico' if medio == 'Rico' else 'limitado'}"
    results[cluster_key] = {
        'cluster_id': cluster_id,
        'temperature': int(temp),
        'medium': 'rico' if medio == 'Rico' else 'limitado',
        'medium_label': medio,
        't_crit': float(best_t),
        'exponential': {
            'a': float(best_params_exp[0]),
            'b': float(best_params_exp[1])
        },
        'linear': {
            'm': float(best_params_lin[0]),
            'c': float(best_params_lin[1])
        },
        'metrics': {
            'r_squared': float(r_squared),
            'r_squared_adj': float(r_squared_adj),
            'rmse': float(rmse),
            'sse': float(min_error)
        },
        'data_points': {
            'total': int(n),
            'exponential_phase': int(len(t_exp_final)),
            'stationary_phase': int(len(t_lin_final))
        },
        'error_curve': [(float(t_val), float(err)) for t_val, err in errors]
    }

print("=" * 80)
print("RESUMEN DE TIEMPOS CRÍTICOS")
print("=" * 80)
print(f"{'Clúster':<10} {'Temp':<8} {'Medio':<12} {'t_crit (h)':<12} {'R²':<10}")
print("-" * 80)
for cluster_key, data in results.items():
    print(f"{data['cluster_id']:<10} {data['temperature']:<8} {data['medium_label']:<12} "
          f"{data['t_crit']:<12.4f} {data['metrics']['r_squared']:<10.6f}")
print()

# Guardar resultados en JSON
output_file = '../lib/growth-models.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print(f"✓ Modelos guardados en: {output_file}")
print()

print("=" * 80)
print("ANÁLISIS COMPLETO FINALIZADO")
print("=" * 80)

