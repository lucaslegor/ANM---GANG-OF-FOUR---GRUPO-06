import Link from "next/link"

type Props = { title: string; subtitle?: string; cta?: { label: string; href: string } }

export default function Hero({ title, subtitle, cta }: Props) {
  return (
    <section className="hero">
      <h1 className="hero-title">{title}</h1>
      {subtitle && <p className="hero-sub">{subtitle}</p>}
      {cta && (
        <Link href={cta.href} className="btn btn-primary hero-cta">
          {cta.label}
        </Link>
      )}
    </section>
  )
}
