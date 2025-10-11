import type React from "react"
export default function Card({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children?: React.ReactNode
}) {
  return (
    <div className="card p">
      <h3>{title}</h3>
      {description && <p className="muted">{description}</p>}
      {children && <div style={{ marginTop: "1rem" }}>{children}</div>}
    </div>
  )
}
