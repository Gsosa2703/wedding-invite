import type { Metadata } from 'next'
import { Inter, Great_Vibes, Cormorant_Garamond, Allura } from 'next/font/google'
import './globals.css'
import SmoothScrollProvider from './components/SmoothScrollProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const allura = Allura({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-allura',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Alexander & Gabriela - Wedding Invitation',
  description: 'Acompáñanos en nuestro día especial',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${greatVibes.variable} ${cormorant.variable} ${allura.variable} font-cormorant`}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
} 