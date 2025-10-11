import styles from "./hero.module.css"

interface HeroProps {
  title: string
  subtitle?: string
  cta?: {
    label: string
    href: string
  }
}

export function Hero({ title, subtitle, cta }: HeroProps) {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {cta && (
        <a href={cta.href} className={styles.cta}>
          {cta.label}
        </a>
      )}
    </section>
  )
}
