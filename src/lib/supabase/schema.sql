-- Profiles table (extends Supabase auth.users)
create table if not exists public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  email       text not null,
  full_name   text,
  avatar_url  text,
  plan        text check (plan in ('monthly', 'annual')),
  plan_started_at  timestamptz,
  plan_expires_at  timestamptz,
  created_at  timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Trigger: auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Meditation audios table
create table if not exists public.meditation_audios (
  id               uuid default gen_random_uuid() primary key,
  title            text not null,
  description      text,
  duration_seconds integer not null,
  category         text not null,
  level            text check (level in ('beginner', 'intermediate', 'advanced')) default 'beginner',
  audio_url        text not null,
  cover_url        text,
  is_premium       boolean default true,
  created_at       timestamptz default now()
);

alter table public.meditation_audios enable row level security;

-- Free audios visible to all; premium only to active members
create policy "Free audios are public"
  on public.meditation_audios for select
  using (is_premium = false);

create policy "Premium audios for active members"
  on public.meditation_audios for select
  using (
    is_premium = true and
    exists (
      select 1 from public.profiles
      where id = auth.uid()
        and plan is not null
        and (plan_expires_at is null or plan_expires_at > now())
    )
  );

-- Sample data
insert into public.meditation_audios (title, description, duration_seconds, category, level, audio_url, is_premium) values
  ('Respiración consciente', 'Una guía suave para conectar con tu respiración y calmar la mente.', 600,  'Respiración',  'beginner',     'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3', false),
  ('Relajación profunda',    'Sumérgete en un estado de calma total con esta meditación guiada.',  1200, 'Relajación',   'beginner',     'https://assets.mixkit.co/music/preview/mixkit-valley-sunset-127.mp3', true),
  ('Atención plena',         'Desarrolla la presencia y la claridad mental con mindfulness.',       900,  'Mindfulness',  'intermediate', 'https://assets.mixkit.co/music/preview/mixkit-relaxing-in-nature-522.mp3', true),
  ('Sueño reparador',        'Prepara tu mente y cuerpo para un descanso profundo y restaurador.',  1800, 'Sueño',        'beginner',     'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3', true),
  ('Meditación de gratitud', 'Cultiva la gratitud y la paz interior en tu día a día.',              720,  'Gratitud',     'intermediate', 'https://assets.mixkit.co/music/preview/mixkit-spirit-in-the-forest-138.mp3', true),
  ('Reducción del estrés',   'Libera la tensión acumulada y encuentra tu centro.',                  1080, 'Estrés',       'intermediate', 'https://assets.mixkit.co/music/preview/mixkit-sleepy-cat-135.mp3', true),
  ('Meditación matutina',    'Comienza tu día con energía positiva y claridad mental.',             480,  'Energía',      'beginner',     'https://assets.mixkit.co/music/preview/mixkit-meditation-bell-491.mp3', true),
  ('Visualización creativa', 'Usa el poder de tu imaginación para alcanzar tus metas.',             1500, 'Visualización','advanced',     'https://assets.mixkit.co/music/preview/mixkit-ambient-piano-110.mp3', true);
