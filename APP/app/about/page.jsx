import { SectionTitle } from "@/components/section-title"
import { Card } from "@/components/card"
import { Button } from "@/components/button"
import styles from "./about.module.css"
import { ArrowLeft, Bot, Sparkles } from "lucide-react"
export default function AboutPage() {
  return (
    <div className={styles.page}>
      <SectionTitle> 
        <Button href="/" variant="ghost" size="icon" className="mr-2">
          <ArrowLeft />
        </Button>
        Acerca de este proyecto
      </SectionTitle>

      <div className={styles.spacer} />
      {/*AI Information Card */}
      <div className={styles.container}>
        <Card className={styles.aiCard}>
          <div className={styles.aiHeader}>
            <Bot className={styles.aiIcon} />
            <h3 className={styles.cardTitle}>Inteligencias Arificiales Utilizadas</h3>
            <div className={styles.text}>
              <p className={styles.text}>
                Este proyecto fue desarrollado con la asistencia de las siguientes inteligencias artificiales:
              </p>
            </div>
          </div>
        </Card>
      </div>


      <div className={styles.container}>
        <Card>
          <h3 className={styles.cardTitle}>Gang Of Four</h3>
          <p className={styles.text}>
            Este proyecto es una aplicación web interactiva para el análisis de regresión por mínimos cuadrados,
            enfocada en la relación entre la velocidad del viento y la potencia eólica generada.
          </p>
          <p className={styles.text}>
            La aplicación permite cargar datos, ajustar múltiples modelos (lineal, cuadrático y potencial), visualizar
            resultados y realizar diagnósticos de los residuos.
          </p>
        </Card>

        <Card>
          <h3 className={styles.cardTitle}>Tecnologías utilizadas</h3>
          <ul className={styles.techList}>
            <li>Next.js 15 (App Router)</li>
            <li>React 19</li>
            <li>TypeScript</li>
            <li>PapaParse (procesamiento CSV)</li>
            <li>MathJax (renderizado de ecuaciones)</li>
            <li>CSS Modules</li>
          </ul>
        </Card>

        <Card>
          <h3 className={styles.cardTitle}>Equipo</h3>
          <p className={styles.text}>
            Desarrollado por el equipo Gang Of Four como parte de un proyecto educativo sobre métodos numéricos y
            análisis de datos.
          </p>
        </Card>
      </div>
    </div>
  )
}
