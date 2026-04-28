'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Leaf, Eye, EyeOff, Loader2, Check } from 'lucide-react'

const benefits = [
  'Acceso a más de 80 meditaciones guiadas',
  'Nuevas sesiones cada semana',
  'Para todos los niveles',
  'Cancela cuando quieras',
]

export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(
        error.message.includes('already registered')
          ? 'Este correo ya está registrado. ¿Quieres iniciar sesión?'
          : error.message
      )
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-50 px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-sage-600" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-sage-800 mb-3">
            ¡Casi listo!
          </h1>
          <p className="text-sage-500 mb-8 leading-relaxed">
            Te enviamos un correo de confirmación a{' '}
            <strong className="text-sage-700">{email}</strong>.
            Revisa tu bandeja de entrada (o spam) y haz clic en el enlace para activar tu cuenta.
          </p>
          <Link href="/login" className="btn-primary inline-block">
            Ir al inicio de sesión
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-sage-500 to-lavender-600 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="relative px-12">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-serif text-4xl font-bold text-white mb-4">
            Comienza tu práctica
          </h2>
          <p className="text-sage-100 text-lg mb-8 leading-relaxed">
            Únete a miles de personas que ya encontraron<br />
            paz y bienestar con Serenamente.
          </p>
          <ul className="space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-white">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-sm">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-sand-50 px-6 py-16">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lavender-400 to-sage-500 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif text-xl font-bold text-sage-800">Serenamente</span>
          </Link>

          <h1 className="font-serif text-3xl font-bold text-sage-800 mb-2">Crear cuenta</h1>
          <p className="text-sage-500 mb-8">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-lavender-600 font-medium hover:underline">
              Iniciar sesión
            </Link>
          </p>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-sage-700 mb-1.5">
                Nombre completo
              </label>
              <input
                id="name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Tu nombre"
                required
                autoComplete="name"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-sage-700 mb-1.5">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                autoComplete="email"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-sage-700 mb-1.5">
                Contraseña
                <span className="text-sage-400 font-normal ml-1">(mínimo 6 caracteres)</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Crea una contraseña segura"
                  required
                  autoComplete="new-password"
                  className="input-field pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sage-400 hover:text-sage-600"
                  aria-label="Mostrar/ocultar contraseña"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
                {error.includes('registrado') && (
                  <>
                    {' '}
                    <Link href="/login" className="font-medium underline">
                      Iniciar sesión
                    </Link>
                  </>
                )}
              </div>
            )}

            <p className="text-xs text-sage-400 leading-relaxed">
              Al registrarte aceptas nuestros{' '}
              <a href="#" className="underline hover:text-sage-600">Términos de uso</a> y{' '}
              <a href="#" className="underline hover:text-sage-600">Política de privacidad</a>.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3.5 text-base flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creando tu cuenta...
                </>
              ) : (
                'Crear cuenta gratis'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
