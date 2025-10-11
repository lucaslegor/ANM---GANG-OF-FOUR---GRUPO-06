export default function MetricsPanel({
  r2,
  r2Adj,
  n,
  k,
}: {
  r2: number
  r2Adj: number
  n: number
  k: number
}) {
  return (
    <div className="metrics">
      <div>
        <strong>R²</strong>
        {r2.toFixed(4)}
      </div>
      <div>
        <strong>R² adj</strong>
        {r2Adj.toFixed(4)}
      </div>
      <div>
        <strong>n</strong>
        {n}
      </div>
      <div>
        <strong>k</strong>
        {k}
      </div>
    </div>
  )
}
