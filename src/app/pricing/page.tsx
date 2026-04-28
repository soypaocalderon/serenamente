'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Zap, Star } from 'lucide-react'

const commonFeatures = [
  'Acceso ilimitado a toda la biblioteca',
  'Más de 80 meditaciones guiadas',
  'Nuevas sesiones cada semana',
  'Todas las categorías (sueño, estrés, energía…)',
  'Todos los niveles: principiante a avanzado',
  'Reproductor de audio integrado',
  'Disponible en cualquier dispositivo',
  'Cancela cuando quieras',
]

const plans = [
  {
    id: 'monthly',
    name: 'Mensual',
    price: 9.99,
    interval: 'mes',
    priceNote: 'Facturado mensualmente',
    savings: null,
    highlighted: false,
    badge: null,
  },
  {
    id: 'annual',
    name: 'Anual',
    price: 6.99,
    interval: 'mes',
    priceNote: 'Facturado una vez al año (€83.88)',
    savings: 'Ahorra 30%',
    highlighted: true,
    badge: 'Más popular',
  },
]

const faqs = [
  {
    q: '¿Puedo cancelar en cualquier momento?',
    a: 'Sí. Puedes cancelar tu membresía cuando quieras desde tu panel de cuenta. No hay permanencias ni penalizaciones.',
  },
  {
    q: '¿Hay período de prueba gratuita?',
    a: 'Tienes acceso inmediato a nuestra sesión gratuita "Respiración consciente" sin necesidad de tarjeta de crédito. Puedes registrarte gratis.',
  },
  {
    q: '¿Qué diferencia hay entre el plan mensual y anual?',
    a: 'El contenido es idéntico. La diferencia es el precio: el plan anual equivale a pagar menos de 7€ al mes frente a los 9.99€ del mensual, ahorrando un 30%.',
  },
  {
    q: '¿Cómo se gestiona el pago?',
    a: 'Los pagos se procesan de forma segura. Para activar tu membresía, selecciona un plan y contacta con soporte o integra tu pasarela de pago preferida.',
  },
  {
    q: '¿Puedo acceder desde varios dispositivos?',
    a: 'Sí. Tu cuenta funciona en cualquier dispositivo con navegador web: móvil, tablet o computadora.',
  },
]

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-lavender-50 via-sand-50 to-sage-50 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/80 border border-lavender-200 rounded-full px-4 py-2 text-sm text-lavender-700 font-medium mb-6">
            <Zap className="w-4 h-4" />
            Sin contratos ni permanencias
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-sage-800 mb-4">
            Planes simples y transparentes
          </h1>
          <p className="text-sage-500 text-lg leading-relaxed">
            Acceso completo a toda la biblioteca de meditaciones.
            Elige el plan que mejor se adapte a ti.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-lavender-500 to-sage-600 text-white shadow-2xl scale-105'
                    : 'bg-white border border-sage-100 shadow-sm'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 bg-sand-400 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                      <Star className="w-3 h-3 fill-white" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h2 className={`text-2xl font-bold mb-1 font-serif ${plan.highlighted ? 'text-white' : 'text-sage-800'}`}>
                    {plan.name}
                  </h2>
                  {plan.savings && (
                    <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {plan.savings}
                    </span>
                  )}
                  <div className="flex items-baseline gap-1 mt-3">
                    <span className={`text-5xl font-bold ${plan.highlighted ? 'text-white' : 'text-sage-800'}`}>
                      €{plan.price}
                    </span>
                    <span className={plan.highlighted ? 'text-lavender-200' : 'text-sage-400'}>
                      /{plan.interval}
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${plan.highlighted ? 'text-lavender-200' : 'text-sage-400'}`}>
                    {plan.priceNote}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {commonFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.highlighted ? 'bg-white/20' : 'bg-lavender-100'
                      }`}>
                        <Check className={`w-3 h-3 ${plan.highlighted ? 'text-white' : 'text-lavender-600'}`} />
                      </div>
                      <span className={`text-sm ${plan.highlighted ? 'text-lavender-50' : 'text-sage-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/register"
                  className={`block text-center py-3.5 px-6 rounded-2xl font-semibold text-base transition-all duration-200 ${
                    plan.highlighted
                      ? 'bg-white text-lavender-700 hover:bg-lavender-50 shadow-lg'
                      : 'bg-gradient-to-r from-lavender-500 to-sage-500 text-white hover:opacity-90 shadow-md'
                  }`}
                >
                  Empezar con {plan.name.toLowerCase()}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-sage-400 text-sm mt-8">
            Todos los precios incluyen IVA · Pago seguro · Cancela cuando quieras
          </p>
        </div>
      </section>

      {/* Feature comparison */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-title mb-4">¿Qué incluye tu membresía?</h2>
          <p className="text-sage-500 mb-12">
            Ambos planes incluyen exactamente lo mismo. Sin contenido oculto ni niveles premium.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {[
              { emoji: '🎧', title: 'Biblioteca completa', desc: 'Más de 80 audios de meditación guiada en español' },
              { emoji: '🌙', title: 'Meditaciones para dormir', desc: '15 sesiones diseñadas para un descanso profundo' },
              { emoji: '☀️', title: 'Rutinas matutinas', desc: '9 sesiones para empezar el día con energía' },
              { emoji: '💆', title: 'Alivio del estrés', desc: '10 sesiones de técnicas de relajación profunda' },
              { emoji: '🧘', title: 'Mindfulness', desc: '18 sesiones de atención plena y presencia' },
              { emoji: '📱', title: 'Multidispositivo', desc: 'Accede desde móvil, tablet o computadora' },
              { emoji: '🔄', title: 'Contenido nuevo', desc: 'Nuevas meditaciones añadidas cada semana' },
              { emoji: '🎵', title: 'Música relajante', desc: 'Bandas sonoras seleccionadas por expertos' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl bg-sand-50 border border-sage-100">
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <h4 className="font-semibold text-sage-800 text-sm">{item.title}</h4>
                  <p className="text-sage-500 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-sand-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="section-title text-center mb-10">Preguntas frecuentes</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-sage-100 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-sage-800 text-sm pr-4">{faq.q}</span>
                  <span className={`text-lavender-500 text-xl font-light flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sage-500 text-sm leading-relaxed border-t border-sage-50">
                    <p className="mt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-lavender-500 to-sage-600 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            ¿Tienes más preguntas?
          </h2>
          <p className="text-lavender-100 mb-8">
            Regístrate gratis y accede a la sesión de demostración sin necesidad de tarjeta.
          </p>
          <Link href="/register" className="inline-block px-8 py-4 bg-white text-lavender-700 font-bold rounded-full hover:bg-lavender-50 transition-colors shadow-lg">
            Empezar ahora — gratis
          </Link>
        </div>
      </section>
    </div>
  )
}
