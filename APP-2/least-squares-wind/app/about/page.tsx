import SectionTitle from "@/components/SectionTitle"

export default function AboutPage() {
  return (
    <section>
      <SectionTitle label="About This Project" />
      <div className="card p">
        <h3>Wind Power Analysis Tool</h3>
        <p style={{ marginBottom: "1rem" }}>
          This educational application demonstrates least squares regression analysis for wind power generation as a
          function of wind speed.
        </p>
        <p style={{ marginBottom: "1rem" }}>
          The tool supports three regression models: Linear, Quadratic, and Power (y = ax^b), with both server-side
          Python computation and client-side Pyodide fallback for offline use.
        </p>
        <p className="muted">
          Built with Next.js, React, Chart.js, and Python (NumPy/Pandas) for scientific computing.
        </p>
      </div>
    </section>
  )
}
