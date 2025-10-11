import Hero from "@/components/Hero"
import SectionTitle from "@/components/SectionTitle"
import Card from "@/components/Card"
import Link from "next/link"

export default function Page() {
  return (
    <>
      <Hero
        title="Least Squares Regression: Wind Power Analysis"
        subtitle="Upload your CSV data, select regression models, and visualize the fit with comprehensive metrics and diagnostics."
        cta={{ label: "Start Analysis", href: "/dataset" }}
      />

      <SectionTitle label="Analysis Workflow" />
      <div className="grid3">
        <Card title="Dataset" description="Upload and preview your wind speed and power data.">
          <Link className="btn btn-primary" href="/dataset">
            Go to Dataset
          </Link>
        </Card>
        <Card title="Model Fitting" description="Fit Linear, Quadratic, and Power regression models.">
          <Link className="btn btn-primary" href="/fit">
            Go to Fitting
          </Link>
        </Card>
        <Card title="Diagnostics" description="Analyze residuals, histograms, and model assumptions.">
          <Link className="btn btn-primary" href="/diagnostics">
            Go to Diagnostics
          </Link>
        </Card>
      </div>
    </>
  )
}
