import { FlaskConical, Github, Mail } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="glass border-t"
      style={{
        borderColor: 'oklch(0.75 0.25 200 / 0.3)',
        boxShadow: '0 -5px 20px oklch(0.75 0.25 200 / 0.1)',
      }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <FlaskConical className="h-6 w-6 neon-glow transition-all group-hover:scale-110" 
                style={{ color: 'oklch(0.75 0.25 200)' }} 
              />
              <span className="text-lg font-semibold neon-glow"
                style={{ color: 'oklch(0.75 0.25 200)' }}
              >
                BioGrowth Analytics
              </span>
            </Link>
            <p className="text-sm" style={{ color: 'oklch(0.7 0.05 200)' }}>
              Simulación inteligente de crecimiento bacteriano mediante modelos matemáticos avanzados.
            </p>
            <div className="flex gap-3">
              <Link href="#" className="p-2 rounded-lg glass border transition-all hover:scale-110 cursor-pointer"
                style={{ borderColor: 'oklch(0.75 0.25 200 / 0.3)' }}
              >
                <Github className="h-4 w-4" style={{ color: 'oklch(0.75 0.25 200)' }} />
              </Link>
              <Link href="#" className="p-2 rounded-lg glass border transition-all hover:scale-110 cursor-pointer"
                style={{ borderColor: 'oklch(0.75 0.25 200 / 0.3)' }}
              >
                <Mail className="h-4 w-4" style={{ color: 'oklch(0.75 0.25 200)' }} />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'oklch(0.95 0.01 200)' }}>
              Navegación
            </h3>
            <ul className="space-y-2 text-sm">
              {['Dataset', 'Modelado', 'Simulador', 'Investigación'].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="transition-all hover:neon-glow"
                    style={{ color: 'oklch(0.7 0.05 200)' }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'oklch(0.95 0.01 200)' }}>
              Recursos
            </h3>
            <ul className="space-y-2 text-sm">
              {['Documentación', 'Publicaciones', 'API', 'GitHub'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="transition-all hover:neon-glow"
                    style={{ color: 'oklch(0.7 0.05 200)' }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'oklch(0.95 0.01 200)' }}>
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              {['Términos de Uso', 'Privacidad', 'Licencia'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="transition-all hover:neon-glow"
                    style={{ color: 'oklch(0.7 0.05 200)' }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: 'oklch(0.75 0.25 200 / 0.2)' }}
        >
          <p className="text-sm text-center md:text-left"
            style={{ color: 'oklch(0.6 0.05 200)' }}
          >
            © {new Date().getFullYear()} BioGrowth Analytics. Todos los derechos reservados.
          </p>
          <p className="text-sm text-center md:text-right"
            style={{ color: 'oklch(0.6 0.05 200)' }}
          >
            Proyecto desarrollado por el equipo{' '}
            <strong className="neon-glow" style={{ color: 'oklch(0.75 0.25 200)' }}>
              Gang of Four
            </strong>{' '}
            (UTN)
          </p>
        </div>
      </div>
    </footer>
  )
}
