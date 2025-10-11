import { SectionTitle } from "@/components/section-title"
import { Card } from "@/components/card"
import styles from "./theory.module.css"

export default function TheoryPage() {
  return (
    <div className={styles.page}>
      <SectionTitle>Teoría de Mínimos Cuadrados</SectionTitle>

      <div className={styles.container}>
        <Card>
          <h3 className={styles.cardTitle}>¿Qué es el método de Mínimos Cuadrados?</h3>
          <p className={styles.text}>
            El método de mínimos cuadrados es una técnica matemática para encontrar la mejor función que se ajusta a un
            conjunto de datos. Minimiza la suma de los cuadrados de las diferencias entre los valores observados y los
            valores predichos por el modelo.
          </p>
        </Card>

        <Card>
          <h3 className={styles.cardTitle}>Modelo Lineal</h3>
          <p className={styles.text}>El modelo lineal simple tiene la forma:</p>
          <div className={styles.equation}>$$y = a_0 + a_1 x$$</div>
          <p className={styles.text}>
            Los parámetros $a_0$ (intercepto) y $a_1$ (pendiente) se calculan resolviendo el sistema de ecuaciones
            normales:
          </p>
          <div className={styles.equation}>$$X^T X \beta = X^T y$$</div>
        </Card>

        <Card>
          <h3 className={styles.cardTitle}>Modelo Cuadrático</h3>
          <p className={styles.text}>El modelo cuadrático extiende el lineal añadiendo un término cuadrático:</p>
          <div className={styles.equation}>$$y = a_0 + a_1 x + a_2 x^2$$</div>
          <p className={styles.text}>Este modelo puede capturar relaciones no lineales con curvatura.</p>
        </Card>

        <Card>
          <h3 className={styles.cardTitle}>Modelo Potencial</h3>
          <p className={styles.text}>El modelo potencial (o de ley de potencia) tiene la forma:</p>
          <div className={styles.equation}>$$y = a x^b$$</div>
          <p className={styles.text}>Para ajustar este modelo, aplicamos una transformación logarítmica:</p>
          <div className={styles.equation}>$$\ln(y) = \ln(a) + b \ln(x)$$</div>
          <p className={styles.text}>Esto convierte el problema en un ajuste lineal en el espacio log-log.</p>
        </Card>

        <Card>
          <h3 className={styles.cardTitle}>Coeficiente de Determinación (R²)</h3>
          <p className={styles.text}>
            El R² mide qué proporción de la variabilidad de los datos es explicada por el modelo:
          </p>
          <div className={styles.equation}>
            $$R^2 = 1 - \frac{"{SS_{res}}"}
            {"{SS_{tot}}"} = 1 - \frac{"{\\sum (y_i - \\hat{y}_i)^2}"}
            {"{\\sum (y_i - \\bar{y})^2}"}$$
          </div>
          <p className={styles.text}>
            Un R² cercano a 1 indica un buen ajuste. El R² ajustado penaliza la adición de parámetros innecesarios:
          </p>
          <div className={styles.equation}>
            $$R^2_{"{adj}"} = 1 - \frac{"{(1 - R^2)(n - 1)}"}
            {"{n - k - 1}"}$$
          </div>
          <p className={styles.text}>donde $n$ es el número de observaciones y $k$ es el número de parámetros.</p>
        </Card>
      </div>
    </div>
  )
}
