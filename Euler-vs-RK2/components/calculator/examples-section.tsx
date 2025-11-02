"use client"

import React from "react"

export function ExamplesSection() {
  return (
    <section className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-6 md:p-8 rounded-2xl border-2 border-emerald-500/30 backdrop-blur-sm animate-fade-in-up">
      <h3 className="text-2xl font-bold mb-4 text-emerald-300">Ejemplos</h3>
      <ul className="list-disc list-inside text-gray-300 space-y-1">
        <li>y' = 2xy, y(1) = 1, h = 0.1, hasta x = 1.3</li>
        <li>y' = x + y, y(0) = 1, h = 0.1, hasta x = 1.0</li>
      </ul>
      <p className="text-gray-400 mt-4 text-sm">Sección restaurada como placeholder para recuperar la navegación.</p>
    </section>
  )
}

