import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LibraryClient from './LibraryClient'

export const dynamic = 'force-dynamic'

export default async function LibraryPage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login?next=/library')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const isMember = !!(
    profile?.plan &&
    (!profile.plan_expires_at || new Date(profile.plan_expires_at) > new Date())
  )

  const { data: audios } = await supabase
    .from('meditation_audios')
    .select('*')
    .order('created_at', { ascending: true })

  return (
    <LibraryClient
      audios={audios ?? []}
      isMember={isMember}
      profile={profile}
    />
  )
}
