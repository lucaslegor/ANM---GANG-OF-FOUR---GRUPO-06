import type React from "react"
export default function Button({
  children,
  variant = "primary",
  ...props
}: {
  children: React.ReactNode
  variant?: "primary" | "outline" | "ghost"
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const className = `btn ${variant === "primary" ? "btn-primary" : variant === "outline" ? "btn-outline" : "btn-ghost"}`
  return (
    <button {...props} className={className}>
      {children}
    </button>
  )
}
