export type Plan = 'monthly' | 'annual' | null

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  plan: Plan
  plan_started_at: string | null
  plan_expires_at: string | null
  created_at: string
}

export interface MeditationAudio {
  id: string
  title: string
  description: string | null
  duration_seconds: number
  category: string
  level: 'beginner' | 'intermediate' | 'advanced'
  audio_url: string
  cover_url: string | null
  is_premium: boolean
  created_at: string
}

export interface PricingPlan {
  id: string
  name: string
  price: number
  interval: 'month' | 'year'
  features: string[]
  highlighted: boolean
}
