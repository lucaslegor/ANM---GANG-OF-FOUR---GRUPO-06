"use client"
import SectionTitle from "@/components/SectionTitle"
import CSVUploader from "@/components/CSVUploader"
import { useAnalysis } from "@/context/AnalysisContext"

export default function DatasetPage() {
  const { dataSummary } = useAnalysis()

  return (
    <section>
      <SectionTitle label="Dataset Management" />
      <CSVUploader />
      {dataSummary && (
        <div className="stats">
          <div>
            <strong>n</strong> {dataSummary.n} data points
          </div>
          <div>
            <strong>Velocity</strong> min {dataSummary.x.min.toFixed(2)} · max {dataSummary.x.max.toFixed(2)} · mean{" "}
            {dataSummary.x.mean.toFixed(2)}
          </div>
          <div>
            <strong>Power</strong> min {dataSummary.y.min.toFixed(2)} · max {dataSummary.y.max.toFixed(2)} · mean{" "}
            {dataSummary.y.mean.toFixed(2)}
          </div>
        </div>
      )}
    </section>
  )
}
