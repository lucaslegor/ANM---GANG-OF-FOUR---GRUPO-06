export default function SectionTitle({ label }: { label: string }) {
  return (
    <div className="section-title">
      <h2>{label}</h2>
      <div className="divider" />
    </div>
  )
}
