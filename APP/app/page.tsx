import { Hero } from "@/components/hero"
import { SectionTitle } from "@/components/section-title"
import { Card } from "@/components/card"
import styles from "./page.module.css"

export default function HomePage() {
  return (
    <div className={styles.page}>
      <Hero
        title="Ajuste por Mínimos Cuadrados: Potencia Eólica vs Velocidad"
        subtitle="Técnica estadística y de análisis numérico que se utiliza para encontrar la función continua que mejor se ajusta a un conjunto de datos, minimizando la suma de los cuadrados de las diferencias (residuos) entre los valores reales y los puntos generados por la función"
        cta={{ label: "Comenzar análisis", href: "/dataset" }}
      />

      <SectionTitle>Características del Análisis</SectionTitle>

      <div className={styles.features}>
        <Card>
          <h3 className={styles.featureTitle}>📊 Dataset</h3>
          <p className={styles.featureText}>
            Carga tus datos CSV con columnas de velocidad y potencia. Visualiza estadísticas básicas y previsualiza tus
            datos antes del análisis.
          </p>
        </Card>

        <Card>
          <h3 className={styles.featureTitle}>📈 Modelos & Ajuste</h3>
          <p className={styles.featureText}>
            Selecciona entre modelos lineal, cuadrático y potencial. Visualiza ecuaciones ajustadas, parámetros y
            métricas de bondad de ajuste (R², R² ajustado).
          </p>
        </Card>

        <Card>
          <h3 className={styles.featureTitle}>🔍 Diagnóstico</h3>
          <p className={styles.featureText}>
            Analiza residuos, verifica supuestos del modelo y detecta valores atípicos con gráficos de residuos e
            histogramas.
          </p>
        </Card>
      </div>
    </div>
  )
}
