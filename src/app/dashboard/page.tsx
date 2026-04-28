import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Crown, Calendar, Headphones, ChevronRight, Settings, LogOut } from 'lucide-react'

export const dynamic = 'force-dynamic'

function formatDate(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function DashboardPage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?next=/dashboard')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { count: totalAudios } = await supabase
    .from('meditation_audios')
    .select('*', { count: 'exact', head: true })

  const isMember = !!(
    profile?.plan &&
    (!profile.plan_expires_at || new Date(profile.plan_expires_at) > new Date())
  )

  const planLabel = profile?.plan === 'annual' ? 'Plan Anual' : profile?.plan === 'monthly' ? 'Plan Mensual' : null

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl font-bold text-sage-800 mb-1">
                Hola, {profile?.full_name?.split(' ')[0] ?? 'meditador'} 👋
              </h1>
              <p className="text-sage-500">{user.email}</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-lavender-400 to-sage-400 flex items-center justify-center text-white font-bold text-xl shadow-md flex-shrink-0">
              {(profile?.full_name ?? user.email ?? 'U')[0].toUpperCase()}
            </div>
          </div>
        </div>

        {/* Membership card */}
        <div className={`rounded-3xl p-6 mb-8 ${
          isMember
            ? 'bg-gradient-to-r from-lavender-500 to-sage-600 text-white'
            : 'bg-white border border-sage-100 shadow-sm'
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Crown className={`w-5 h-5 ${isMember ? 'text-sand-300' : 'text-sage-400'}`} />
                <span className={`text-sm font-semibold ${isMember ? 'text-lavender-100' : 'text-sage-500'}`}>
                  Membresía
                </span>
              </div>
              <h2 className={`text-2xl font-bold font-serif mb-1 ${isMember ? 'text-white' : 'text-sage-800'}`}>
                {isMember ? planLabel : 'Sin membresía activa'}
              </h2>
              {isMember ? (
                <div className="flex items-center gap-1 text-lavender-100 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Activo desde {formatDate(profile?.plan_started_at ?? null)}
                    {profile?.plan_expires_at && ` · Renueva ${formatDate(profile.plan_expires_at)}`}
                  </span>
                </div>
              ) : (
                <p className="text-sage-500 text-sm">Acceso limitado a meditaciones gratuitas</p>
              )}
            </div>
            {!isMember && (
              <Link
                href="/pricing"
                className="flex-shrink-0 px-5 py-2.5 bg-gradient-to-r from-lavender-500 to-sage-500 text-white font-semibold rounded-full text-sm hover:opacity-90 transition-opacity shadow-md"
              >
                Activar
              </Link>
            )}
          </div>

          {isMember && (
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="bg-white/15 rounded-2xl p-4">
                <div className="text-white text-2xl font-bold">{totalAudios ?? 0}</div>
                <div className="text-lavender-200 text-xs mt-0.5">Meditaciones disponibles</div>
              </div>
              <div className="bg-white/15 rounded-2xl p-4">
                <div className="text-white text-2xl font-bold">Ilimitado</div>
                <div className="text-lavender-200 text-xs mt-0.5">Acceso a la biblioteca</div>
              </div>
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link href="/library" className="card p-5 flex items-center gap-4 group hover:border-lavender-200">
            <div className="w-11 h-11 rounded-xl bg-lavender-100 flex items-center justify-center group-hover:bg-lavender-200 transition-colors">
              <Headphones className="w-5 h-5 text-lavender-600" />
            </div>
            <div>
              <p className="font-semibold text-sage-800 text-sm">Ir a la biblioteca</p>
              <p className="text-sage-400 text-xs">Explorar meditaciones</p>
            </div>
            <ChevronRight className="w-4 h-4 text-sage-300 ml-auto group-hover:text-lavender-400 transition-colors" />
          </Link>

          <Link href="/pricing" className="card p-5 flex items-center gap-4 group hover:border-lavender-200">
            <div className="w-11 h-11 rounded-xl bg-sand-100 flex items-center justify-center group-hover:bg-sand-200 transition-colors">
              <Crown className="w-5 h-5 text-sand-600" />
            </div>
            <div>
              <p className="font-semibold text-sage-800 text-sm">
                {isMember ? 'Gestionar plan' : 'Ver planes'}
              </p>
              <p className="text-sage-400 text-xs">
                {isMember ? `Plan ${planLabel}` : 'Desde €6.99/mes'}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-sage-300 ml-auto group-hover:text-lavender-400 transition-colors" />
          </Link>
        </div>

        {/* Account details */}
        <div className="card divide-y divide-sage-50">
          <div className="px-5 py-4">
            <h3 className="font-semibold text-sage-700 text-sm uppercase tracking-wide">Cuenta</h3>
          </div>

          <div className="px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-700">Nombre</p>
              <p className="text-sage-500 text-sm">{profile?.full_name ?? '—'}</p>
            </div>
            <Settings className="w-4 h-4 text-sage-300" />
          </div>

          <div className="px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-700">Correo electrónico</p>
              <p className="text-sage-500 text-sm">{user.email}</p>
            </div>
          </div>

          <div className="px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-700">Miembro desde</p>
              <p className="text-sage-500 text-sm">{formatDate(profile?.created_at ?? null)}</p>
            </div>
          </div>

          <div className="px-5 py-4">
            <form action="/auth/signout" method="post">
              <button
                formAction="/auth/signout"
                className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
