import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Serenamente – Meditaciones guiadas para tu bienestar',
  description:
    'Encuentra paz, claridad y bienestar con nuestra biblioteca de meditaciones guiadas. Planes mensual y anual para acceso ilimitado.',
  keywords: ['meditación', 'mindfulness', 'bienestar', 'relajación', 'salud mental'],
  openGraph: {
    title: 'Serenamente – Meditaciones guiadas',
    description: 'Encuentra paz y bienestar con nuestra biblioteca de meditaciones guiadas.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
