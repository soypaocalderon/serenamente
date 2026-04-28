'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, X, Loader2 } from 'lucide-react'
import type { MeditationAudio } from '@/types'

interface AudioPlayerProps {
  audio: MeditationAudio
  onClose: () => void
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function AudioPlayer({ audio, onClose }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const el = audioRef.current
    if (!el) return

    el.volume = volume

    const onLoadedMetadata = () => {
      setDuration(el.duration)
      setIsLoading(false)
    }
    const onTimeUpdate = () => {
      if (!isDragging) setCurrentTime(el.currentTime)
    }
    const onEnded = () => setIsPlaying(false)
    const onWaiting = () => setIsLoading(true)
    const onCanPlay = () => setIsLoading(false)

    el.addEventListener('loadedmetadata', onLoadedMetadata)
    el.addEventListener('timeupdate', onTimeUpdate)
    el.addEventListener('ended', onEnded)
    el.addEventListener('waiting', onWaiting)
    el.addEventListener('canplay', onCanPlay)

    return () => {
      el.removeEventListener('loadedmetadata', onLoadedMetadata)
      el.removeEventListener('timeupdate', onTimeUpdate)
      el.removeEventListener('ended', onEnded)
      el.removeEventListener('waiting', onWaiting)
      el.removeEventListener('canplay', onCanPlay)
    }
  }, [isDragging])

  const togglePlay = useCallback(async () => {
    const el = audioRef.current
    if (!el) return
    if (isPlaying) {
      el.pause()
      setIsPlaying(false)
    } else {
      await el.play()
      setIsPlaying(true)
    }
  }, [isPlaying])

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressRef.current
    const el = audioRef.current
    if (!bar || !el || !duration) return
    const rect = bar.getBoundingClientRect()
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
    const newTime = ratio * duration
    el.currentTime = newTime
    setCurrentTime(newTime)
  }, [duration])

  const skip = useCallback((seconds: number) => {
    const el = audioRef.current
    if (!el) return
    el.currentTime = Math.min(Math.max(el.currentTime + seconds, 0), duration)
  }, [duration])

  const toggleMute = useCallback(() => {
    const el = audioRef.current
    if (!el) return
    el.muted = !isMuted
    setIsMuted(!isMuted)
  }, [isMuted])

  const handleVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    if (audioRef.current) audioRef.current.volume = v
    if (v === 0) setIsMuted(true)
    else setIsMuted(false)
  }, [])

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <audio ref={audioRef} src={audio.audio_url} preload="metadata" />

      <div className="bg-white/95 backdrop-blur-lg border-t border-sage-100 shadow-2xl">
        {/* Progress bar */}
        <div
          ref={progressRef}
          className="h-1 bg-sage-100 cursor-pointer group"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-gradient-to-r from-lavender-500 to-sage-500 relative transition-all duration-100"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-lavender-500 rounded-full shadow -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Track info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lavender-400 to-sage-400 flex items-center justify-center flex-shrink-0 shadow-md">
              {isLoading ? (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              ) : (
                <span className="text-xl">🧘</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sage-800 text-sm truncate">{audio.title}</p>
              <p className="text-sage-400 text-xs capitalize">{audio.category} · {audio.level}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => skip(-10)}
              className="p-2 text-sage-500 hover:text-sage-700 hover:bg-sage-50 rounded-full transition-colors"
              title="Retroceder 10 s"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlay}
              disabled={isLoading}
              className="w-11 h-11 rounded-full bg-gradient-to-r from-lavender-500 to-sage-500 text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-md disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-5 h-5" fill="currentColor" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
              )}
            </button>

            <button
              onClick={() => skip(10)}
              className="p-2 text-sage-500 hover:text-sage-700 hover:bg-sage-50 rounded-full transition-colors"
              title="Adelantar 10 s"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Time */}
          <div className="hidden sm:flex items-center gap-1 text-xs text-sage-400 tabular-nums w-20 justify-center">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration || audio.duration_seconds)}</span>
          </div>

          {/* Volume */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-1.5 text-sage-400 hover:text-sage-600 transition-colors"
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolume}
              className="w-20 h-1 accent-lavender-500 cursor-pointer"
            />
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2 text-sage-400 hover:text-sage-600 hover:bg-sage-50 rounded-full transition-colors ml-auto sm:ml-0"
            aria-label="Cerrar reproductor"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
