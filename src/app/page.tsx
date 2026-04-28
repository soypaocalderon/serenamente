import Link from 'next/link'
import { Leaf, Moon, Sun, Heart, Shield, Headphones, Star, ChevronRight, Play } from 'lucide-react'

const features = [
  {
    icon: Headphones,
    title: 'Audios de alta calidad',
    desc: 'Meditaciones grabadas por instructores certificados con música relajante cuidadosamente seleccionada.',
  },
  {
    icon: Moon,
    title: 'Para dormir mejor',
    desc: 'Sesiones nocturnas diseñadas para calmar tu mente y prepararte para un descanso profundo y reparador.',
  },
  {
    icon: Sun,
    title: 'Energía matutina',
    desc: 'Comienza cada día con intención. Meditaciones cortas para activar tu energía y claridad mental.',
  },
  {
    icon: Heart,
    title: 'Reducción del estrés',
    desc: 'Técnicas probadas de mindfulness y respiración para liberar la tensión y encontrar tu centro.',
  },
  {
    icon: Leaf,
    title: 'Todos los niveles',
    desc: 'Desde principiantes hasta meditadores avanzados. Cada sesión está diseñada para tu nivel.',
  },
  {
    icon: Shield,
    title: 'Acceso ilimitado',
    desc: 'Con tu membresía accedes a toda la biblioteca. Nuevas meditaciones cada semana.',
  },
]

const testimonials = [
  {
    name: 'María G.',
    role: 'Miembro anual',
    text: 'Después de tres meses con Serenamente, duermo mucho mejor y manejo el estrés del trabajo de forma completamente diferente.',
    rating: 5,
  },
  {
    name: 'Carlos R.',
    role: 'Miembro mensual',
    text: 'La calidad de las meditaciones es increíble. Cada mañana empiezo mi día con 10 minutos de mindfulness y ha cambiado todo.',
    rating: 5,
  },
  {
    name: 'Ana L.',
    role: 'Miembro anual',
    text: 'Por fin encontré una app que habla mi idioma. Las meditaciones en español son naturales y muy bien producidas.',
    rating: 5,
  },
]

const categories = [
  { name: 'Respiración', emoji: '🌬️', count: '12 sesiones' },
  { name: 'Mindfulness', emoji: '🧘', count: '18 sesiones' },
  { name: 'Sueño', emoji: '🌙', count: '15 sesiones' },
  { name: 'Estrés', emoji: '💆', count: '10 sesiones' },
  { name: 'Gratitud', emoji: '🙏', count: '8 sesiones' },
  { name: 'Energía', emoji: '☀️', count: '9 sesiones' },
]

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-lavender-50 via-sand-50 to-sage-50 bg-pattern">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-lavender-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-sage-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-lavender-200 rounded-full px-4 py-2 text-sm text-lavender-700 font-medium mb-8 shadow-sm animate-fade-in">
            <Leaf className="w-4 h-4" />
            Tu espacio de calma
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-sage-800 leading-tight mb-6 animate-slide-up">
            Encuentra tu{' '}
            <span className="text-gradient">paz interior</span>
          </h1>

          <p className="text-sage-600 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Meditaciones guiadas en español para reducir el estrés, dormir mejor
            y vivir con más presencia. Para todos los niveles.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link href="/register" className="btn-primary text-base inline-flex items-center justify-center gap-2">
              Comenzar ahora — gratis
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/pricing" className="btn-secondary text-base inline-flex items-center justify-center gap-2">
              Ver planes
            </Link>
          </div>

          <p className="text-sage-400 text-sm mt-6">
            Sin tarjeta de crédito · Cancela cuando quieras
          </p>

          {/* Preview card */}
          <div className="mt-16 max-w-sm mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white p-5 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-lavender-400 to-sage-400 flex items-center justify-center shadow-md flex-shrink-0">
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Play className="w-4 h-4 text-lavender-600 ml-0.5" fill="currentColor" />
                </button>
              </div>
              <div className="text-left">
                <p className="text-sage-800 font-semibold text-sm">Respiración consciente</p>
                <p className="text-sage-400 text-xs mt-0.5">Gratis · 10 min · Principiante</p>
                <div className="mt-2 h-1 bg-sage-100 rounded-full">
                  <div className="h-1 bg-gradient-to-r from-lavender-400 to-sage-400 rounded-full w-2/5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-14 border-y border-sage-100">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '5,000+', label: 'Miembros activos' },
            { value: '80+', label: 'Meditaciones' },
            { value: '4.9', label: 'Valoración media' },
            { value: '6', label: 'Categorías' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-gradient font-serif">{s.value}</div>
              <div className="text-sage-500 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-sand-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Todo lo que necesitas para meditar</h2>
            <p className="section-subtitle">
              Una experiencia completa diseñada para que la meditación se convierta
              en parte natural de tu día.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card p-6 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lavender-100 to-sage-100 flex items-center justify-center mb-4 group-hover:from-lavender-200 group-hover:to-sage-200 transition-colors">
                  <f.icon className="w-6 h-6 text-lavender-600" />
                </div>
                <h3 className="font-semibold text-sage-800 text-lg mb-2">{f.title}</h3>
                <p className="text-sage-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Explora las categorías</h2>
            <p className="section-subtitle">
              Desde el alivio del estrés hasta el sueño profundo, tenemos lo que necesitas.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href="/library"
                className="card p-5 text-center group hover:border-lavender-200"
              >
                <div className="text-3xl mb-3">{cat.emoji}</div>
                <p className="font-semibold text-sage-800 text-sm">{cat.name}</p>
                <p className="text-sage-400 text-xs mt-1">{cat.count}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/library" className="btn-primary inline-flex items-center gap-2">
              Ver toda la biblioteca
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-lavender-50 to-sage-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Lo que dicen nuestros miembros</h2>
            <p className="section-subtitle">
              Miles de personas ya encontraron su calma con Serenamente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-sand-400 fill-sand-400" />
                  ))}
                </div>
                <p className="text-sage-600 text-sm leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-semibold text-sage-800 text-sm">{t.name}</p>
                  <p className="text-sage-400 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-lavender-600 to-sage-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-5">
            Empieza tu viaje hoy
          </h2>
          <p className="text-lavender-100 text-lg mb-10 leading-relaxed">
            Únete a más de 5,000 personas que ya transformaron su bienestar
            con meditaciones guiadas en español.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 bg-white text-lavender-700 font-bold rounded-full hover:bg-lavender-50 transition-colors shadow-lg text-base"
            >
              Comenzar gratis ahora
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-colors border border-white/30 text-base"
            >
              Ver precios
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
