'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Play, Lock, Clock, Search, Filter, Crown } from 'lucide-react'
import AudioPlayer from '@/components/AudioPlayer'
import type { MeditationAudio, Profile } from '@/types'

interface Props {
  audios: MeditationAudio[]
  isMember: boolean
  profile: Profile | null
}

const ALL_CATEGORIES = 'Todas'
const LEVELS = ['Todos', 'beginner', 'intermediate', 'advanced']
const LEVEL_LABELS: Record<string, string> = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  return `${m} min`
}

export default function LibraryClient({ audios, isMember, profile }: Props) {
  const [playing, setPlaying] = useState<MeditationAudio | null>(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(ALL_CATEGORIES)
  const [level, setLevel] = useState('Todos')

  const categories = [ALL_CATEGORIES, ...Array.from(new Set(audios.map((a) => a.category)))]

  const filtered = audios.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      (a.description ?? '').toLowerCase().includes(search.toLowerCase())
    const matchCat = category === ALL_CATEGORIES || a.category === category
    const matchLevel = level === 'Todos' || a.level === level
    return matchSearch && matchCat && matchLevel
  })

  const canPlay = (audio: MeditationAudio) => !audio.is_premium || isMember

  return (
    <div className="min-h-screen bg-sand-50 pb-32">
      {/* Header */}
      <div className="bg-gradient-to-br from-lavender-50 via-sand-50 to-sage-50 pt-24 pb-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sage-800">
              Biblioteca
            </h1>
            {isMember && (
              <span className="inline-flex items-center gap-1.5 bg-sand-100 text-sand-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-sand-200">
                <Crown className="w-3.5 h-3.5" />
                {profile?.plan === 'annual' ? 'Plan Anual' : 'Plan Mensual'}
              </span>
            )}
          </div>
          <p className="text-sage-500 mb-8">
            {isMember
              ? `Acceso completo · ${audios.length} meditaciones disponibles`
              : 'Acceso gratuito limitado · Hazte miembro para desbloquear todo'}
          </p>

          {/* Upgrade banner */}
          {!isMember && (
            <div className="bg-gradient-to-r from-lavender-500 to-sage-500 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-white font-semibold">Desbloquea toda la biblioteca</p>
                <p className="text-lavender-100 text-sm">
                  Desde €6.99/mes — acceso ilimitado a {audios.filter((a) => a.is_premium).length} meditaciones premium
                </p>
              </div>
              <Link
                href="/pricing"
                className="flex-shrink-0 px-5 py-2.5 bg-white text-lavender-700 font-semibold rounded-full hover:bg-lavender-50 transition-colors text-sm shadow-md"
              >
                Ver planes
              </Link>
            </div>
          )}

          {/* Search & filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
              <input
                type="text"
                placeholder="Buscar meditaciones..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400 pointer-events-none" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="pl-9 pr-8 py-3 rounded-xl border border-sage-200 bg-white text-sage-700 text-sm focus:outline-none focus:ring-2 focus:ring-lavender-300 appearance-none cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="px-3 py-3 rounded-xl border border-sage-200 bg-white text-sage-700 text-sm focus:outline-none focus:ring-2 focus:ring-lavender-300 appearance-none cursor-pointer"
              >
                {LEVELS.map((l) => (
                  <option key={l} value={l}>{l === 'Todos' ? 'Nivel' : LEVEL_LABELS[l]}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Audio grid */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sage-400 text-lg mb-2">No se encontraron meditaciones</p>
            <button
              onClick={() => { setSearch(''); setCategory(ALL_CATEGORIES); setLevel('Todos') }}
              className="text-lavender-600 text-sm hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((audio) => {
              const playable = canPlay(audio)
              const isActive = playing?.id === audio.id
              return (
                <div
                  key={audio.id}
                  className={`card overflow-hidden group transition-all duration-200 ${
                    isActive ? 'ring-2 ring-lavender-400 shadow-lg' : ''
                  }`}
                >
                  {/* Cover */}
                  <div className={`h-36 relative flex items-center justify-center ${
                    playable
                      ? 'bg-gradient-to-br from-lavender-100 to-sage-100'
                      : 'bg-gradient-to-br from-sage-100 to-sage-200'
                  }`}>
                    <span className="text-5xl">{getCategoryEmoji(audio.category)}</span>

                    {/* Overlay on hover */}
                    <div className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}>
                      {playable ? (
                        <button
                          onClick={() => setPlaying(isActive ? null : audio)}
                          className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                        >
                          <Play className="w-6 h-6 text-lavender-600 ml-0.5" fill="currentColor" />
                        </button>
                      ) : (
                        <Link href="/pricing">
                          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                            <Lock className="w-6 h-6 text-sage-500" />
                          </div>
                        </Link>
                      )}
                    </div>

                    {/* Premium badge */}
                    {audio.is_premium && !isMember && (
                      <div className="absolute top-2 right-2 bg-sage-700/80 text-white text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Premium
                      </div>
                    )}

                    {/* Playing indicator */}
                    {isActive && (
                      <div className="absolute bottom-2 left-2 flex items-end gap-0.5 h-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="w-1 bg-lavender-500 rounded-full animate-bounce"
                            style={{ height: `${40 + i * 15}%`, animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-sage-800 text-sm leading-snug">{audio.title}</h3>
                    </div>
                    {audio.description && (
                      <p className="text-sage-400 text-xs mt-1 line-clamp-2 leading-relaxed">{audio.description}</p>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3 text-xs text-sage-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDuration(audio.duration_seconds)}
                        </span>
                        <span className="px-2 py-0.5 bg-sage-50 rounded-full capitalize">
                          {LEVEL_LABELS[audio.level] ?? audio.level}
                        </span>
                      </div>
                      <button
                        onClick={() => playable ? setPlaying(isActive ? null : audio) : undefined}
                        disabled={!playable}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          playable
                            ? 'bg-lavender-100 text-lavender-700 hover:bg-lavender-200'
                            : 'bg-sage-100 text-sage-400 cursor-not-allowed'
                        }`}
                      >
                        {!playable ? (
                          <Link href="/pricing">Desbloquear</Link>
                        ) : isActive ? 'Reproduciendo' : 'Reproducir'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Persistent Audio Player */}
      {playing && (
        <AudioPlayer audio={playing} onClose={() => setPlaying(null)} />
      )}
    </div>
  )
}

function getCategoryEmoji(category: string): string {
  const map: Record<string, string> = {
    'Respiración': '🌬️',
    'Relajación': '🌊',
    'Mindfulness': '🧘',
    'Sueño': '🌙',
    'Gratitud': '🙏',
    'Estrés': '💆',
    'Energía': '☀️',
    'Visualización': '✨',
  }
  return map[category] ?? '🎵'
}
