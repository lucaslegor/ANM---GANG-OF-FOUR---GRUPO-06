"use client"

import type { ReactNode } from "react"
import styles from "./button.module.css"

interface ButtonProps {
  children: ReactNode
  variant?: "primary" | "outline" | "ghost"
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  className?: string
}

export function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
