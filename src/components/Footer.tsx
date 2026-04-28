import Link from 'next/link'
import { Leaf, Instagram, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-sage-900 text-sage-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lavender-400 to-sage-500 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-xl font-bold text-white">Serenamente</span>
            </Link>
            <p className="text-sage-400 text-sm leading-relaxed max-w-xs">
              Tu espacio de calma. Meditaciones guiadas para encontrar paz,
              claridad y bienestar en tu vida cotidiana.
            </p>
            <div className="flex gap-4 mt-5">
              <a href="#" className="w-8 h-8 rounded-full bg-sage-700 hover:bg-lavender-600 flex items-center justify-center transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-sage-700 hover:bg-lavender-600 flex items-center justify-center transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-sage-700 hover:bg-lavender-600 flex items-center justify-center transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Explorar</h4>
            <ul className="space-y-2">
              {[
                { label: 'Inicio', href: '/' },
                { label: 'Planes', href: '/pricing' },
                { label: 'Biblioteca', href: '/library' },
                { label: 'Mi cuenta', href: '/dashboard' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sage-400 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              {[
                { label: 'Privacidad', href: '#' },
                { label: 'Términos de uso', href: '#' },
                { label: 'Cookies', href: '#' },
                { label: 'Contacto', href: '#' },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sage-400 hover:text-white text-sm transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-sage-700 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sage-500 text-xs">
            © {new Date().getFullYear()} Serenamente. Todos los derechos reservados.
          </p>
          <p className="text-sage-500 text-xs">
            Hecho con amor para tu bienestar
          </p>
        </div>
      </div>
    </footer>
  )
}
