'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import { Menu, X, Leaf } from 'lucide-react'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lavender-400 to-sage-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif text-xl font-bold text-sage-800">Serenamente</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/#features" className="text-sage-700 hover:text-lavender-600 transition-colors text-sm font-medium">
              Beneficios
            </Link>
            <Link href="/pricing" className="text-sage-700 hover:text-lavender-600 transition-colors text-sm font-medium">
              Planes
            </Link>
            {user ? (
              <>
                <Link href="/library" className="text-sage-700 hover:text-lavender-600 transition-colors text-sm font-medium">
                  Biblioteca
                </Link>
                <Link href="/dashboard" className="text-sage-700 hover:text-lavender-600 transition-colors text-sm font-medium">
                  Mi cuenta
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-sm font-medium text-sage-700 border border-sage-300 rounded-full hover:bg-sage-50 transition-colors"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sage-700 hover:text-lavender-600 transition-colors text-sm font-medium">
                  Iniciar sesión
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2 bg-gradient-to-r from-lavender-500 to-sage-500 text-white text-sm font-semibold rounded-full hover:opacity-90 transition-opacity shadow-md"
                >
                  Comenzar gratis
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-sage-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-md border-t border-sage-100 px-4 py-4 flex flex-col gap-3">
          <Link href="/#features" className="text-sage-700 py-2 text-sm font-medium" onClick={() => setMenuOpen(false)}>
            Beneficios
          </Link>
          <Link href="/pricing" className="text-sage-700 py-2 text-sm font-medium" onClick={() => setMenuOpen(false)}>
            Planes
          </Link>
          {user ? (
            <>
              <Link href="/library" className="text-sage-700 py-2 text-sm font-medium" onClick={() => setMenuOpen(false)}>
                Biblioteca
              </Link>
              <Link href="/dashboard" className="text-sage-700 py-2 text-sm font-medium" onClick={() => setMenuOpen(false)}>
                Mi cuenta
              </Link>
              <button onClick={handleSignOut} className="text-left text-sage-700 py-2 text-sm font-medium">
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sage-700 py-2 text-sm font-medium" onClick={() => setMenuOpen(false)}>
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="mt-1 text-center px-5 py-2.5 bg-gradient-to-r from-lavender-500 to-sage-500 text-white text-sm font-semibold rounded-full"
                onClick={() => setMenuOpen(false)}
              >
                Comenzar gratis
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
