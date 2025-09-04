export default function Footer() {
  return (
    <footer className="bg-[#ea1f27] text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-2">Integrantes del Equipo</h3>
            <ul className="space-y-1 text-sm">
              <li>Devida Facundo</li>
              <li>Legorburu Lucas</li>
              <li>Pascucci Agostina</li>
              <li>Smith Justina</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">Información Académica</h3>
            <div className="text-sm space-y-1">
              <p>
                <strong>Materia:</strong> Analisis Numerico
              </p>
              <p>
                <strong>Universidad:</strong> Universidad Tegnologica Nacional 
              </p>
              <p>
                <strong>Año:</strong> 2025
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">Gang Of Four</h3>
            <p className="text-sm">Presentación educativa sobre cifras significativas y análisis de errores.</p>
          </div>
        </div>

        <div className="border-t border-red-400 mt-6 pt-4 text-center text-sm">
          <p>&copy; 2025 Gang Of Four. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
