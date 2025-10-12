"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileSpreadsheet } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DatasetPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [data, setData] = useState<any[]>([])
  const [columns, setColumns] = useState<string[]>([])
  const [xColumn, setXColumn] = useState<string>("")
  const [yColumn, setYColumn] = useState<string>("")

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0]
    if (!uploadedFile) return

    setFile(uploadedFile)

    const text = await uploadedFile.text()
    const lines = text.trim().split("\n")
    const headers = lines[0].split(";").map((h) => h.trim())

    const parsedData = lines.slice(1).map((line) => {
      const values = line.split(";")
      const row: any = {}
      headers.forEach((header, index) => {
        // Corrección: Reemplazar la coma por un punto antes de parsear a número
        const value = values[index].replace(",", ".")
        row[header] = Number.parseFloat(value) || values[index]
      })
      return row
    })

    setColumns(headers)
    setData(parsedData)
  }

  const handleContinue = () => {
    if (xColumn && yColumn && data.length > 0) {
      // Store data in localStorage for other pages to access
      localStorage.setItem("datasetData", JSON.stringify(data))
      localStorage.setItem("xColumn", xColumn)
      localStorage.setItem("yColumn", yColumn)
      router.push("/fit")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Carga de Datos</h1>
        <p className="text-muted-foreground">Sube un archivo CSV y selecciona las variables para el análisis</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Subir Archivo CSV</CardTitle>
            <CardDescription>Selecciona un archivo CSV con tus datos experimentales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {file ? (
                    <>
                      <FileSpreadsheet className="w-12 h-12 mb-4 text-primary" />
                      <p className="mb-2 text-sm font-semibold">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{data.length} filas cargadas</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click para subir</span> o arrastra y suelta
                      </p>
                      <p className="text-xs text-muted-foreground">CSV (MAX. 10MB)</p>
                    </>
                  )}
                </div>
                <input id="dropzone-file" type="file" className="hidden" accept=".csv" onChange={handleFileUpload} />
              </label>
            </div>
          </CardContent>
        </Card>

        {data.length > 0 && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Selección de Variables</CardTitle>
                <CardDescription>Elige la variable independiente (X) y la variable dependiente (Y)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="x-column">Variable Independiente (X)</Label>
                    <Select value={xColumn} onValueChange={setXColumn}>
                      <SelectTrigger id="x-column">
                        <SelectValue placeholder="Selecciona X" />
                      </SelectTrigger>
                      <SelectContent>
                        {columns.map((col) => (
                          <SelectItem key={col} value={col}>
                            {col}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="y-column">Variable Dependiente (Y)</Label>
                    <Select value={yColumn} onValueChange={setYColumn}>
                      <SelectTrigger id="y-column">
                        <SelectValue placeholder="Selecciona Y" />
                      </SelectTrigger>
                      <SelectContent>
                        {columns.map((col) => (
                          <SelectItem key={col} value={col}>
                            {col}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vista Previa de Datos</CardTitle>
                <CardDescription>Primeras 10 filas del conjunto de datos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        {columns.map((col) => (
                          <th key={col} className="text-left p-2 font-semibold">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.slice(0, 10).map((row, idx) => (
                        <tr key={idx} className="border-b">
                          {columns.map((col) => (
                            <td key={col} className="p-2 text-muted-foreground">
                              {row[col]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button size="lg" onClick={handleContinue} disabled={!xColumn || !yColumn}>
                Continuar al Ajuste
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
