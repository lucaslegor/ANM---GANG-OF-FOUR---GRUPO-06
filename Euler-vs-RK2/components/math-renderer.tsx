"use client"

import { useEffect } from "react"

export function MathRenderer() {
  useEffect(() => {
    const renderMath = () => {
      // @ts-ignore
      if (typeof window !== "undefined" && window.renderMathInElement) {
        // @ts-ignore
        window.renderMathInElement(document.body, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
          ],
          throwOnError: false,
        })
      }
    }

    // Initial render
    renderMath()

    // Re-render on route changes
    const observer = new MutationObserver(() => {
      renderMath()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [])

  return null
}
