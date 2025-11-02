export function Footer() {
  return (
    <footer className="bg-[#EA1F27] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Column 1: Team Members */}
          <div>
            <h3 className="text-xl font-bold mb-4">Integrantes del Equipo</h3>
            <ul className="space-y-2">
              <li>Devia Facundo</li>
              <li>Legorburu Lucas</li>
              <li>Pascucci Agostina</li>
              <li>Smith Justina</li>
            </ul>
          </div>

          {/* Column 2: Academic Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Información Académica</h3>
            <div className="space-y-2">
              <p>
                <strong>Materia:</strong> Análisis Numérico
              </p>
              <p>
                <strong>Cátedra:</strong> UTN - Universidad Tecnológica Nacional
              </p>
              <p>
                <strong>Año:</strong> 2025
              </p>
            </div>
          </div>

          {/* Column 3: Project Branding */}
          <div>
            <h3 className="text-xl font-bold mb-4">Gang Of Four</h3>
            <p className="text-sm leading-relaxed">Presentación educativa sobre el Método de Euler vs RK2.</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-6 text-center text-sm">
          <p>© 2025 Gang Of Four. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
