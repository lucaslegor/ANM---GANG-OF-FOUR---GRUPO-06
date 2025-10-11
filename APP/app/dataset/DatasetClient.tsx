import DatasetClient from "./page"
import fs from "fs/promises"
import path from "path"

export default async function Page() {
  const filePath = path.join(
    process.cwd(),
    "app",
    "dataset",
    "data",
    "ejercicio-2.csv"
  )

  const raw = await fs.readFile(filePath, "utf8")
  const lines = raw.split(/\r?\n/).filter(Boolean)
  const header = lines.shift()?.split(";").map((h) => h.trim()) ?? []

  const rows = lines.map((line) => {
    const cols = line.split(";")
    const obj: Record<string, any> = {}
    cols.forEach((c, i) => {
      const key = header[i] ?? `col${i}`
      // quitar posibles separadores de miles y convertir coma decimal a punto
      const cleaned = c.trim().replace(/\./g, "").replace(",", ".")
      const n = Number(cleaned)
      obj[key] = Number.isNaN(n) ? cleaned : n
    })
    return obj
  })

  const dataset = rows
    .map((r) => ({ velocidad: r.wind_speed_ms, potencia: r.power_kW }))
    .filter((d) => typeof d.velocidad === "number" && typeof d.potencia === "number")

  return <DatasetClient initialDataset={dataset} />
}