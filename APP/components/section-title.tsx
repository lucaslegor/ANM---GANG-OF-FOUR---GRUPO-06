import type React from "react"
import styles from "./section-title.module.css"

interface SectionTitleProps {
  children: React.ReactNode
}

export function SectionTitle({ children }: SectionTitleProps) {
  return <h2 className={styles.title}>{children}</h2>
}
