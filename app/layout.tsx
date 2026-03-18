import type { Metadata } from 'next'
import { Cormorant_Garamond, Great_Vibes } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant'
});

const greatVibes = Great_Vibes({ 
  subsets: ["latin"],
  weight: ['400'],
  variable: '--font-script'
});

export const metadata: Metadata = {
  title: 'Mirza & Jinsha | Wedding Invitation',
  description: 'You are cordially invited to celebrate the wedding of Mirza & Jinsha - April 25 & 26, 2026 at Rainbow Convention Centre, Kerala',
  generator: 'v0.app',
  keywords: ['wedding', 'invitation', 'Mirza', 'Jinsha', 'Kerala', '2026'],
  openGraph: {
    title: 'Mirza & Jinsha Wedding Invitation',
    description: 'Join us to celebrate our special day - April 25 & 26, 2026',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport = {
  themeColor: '#f9f7f3',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${greatVibes.variable} font-serif antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
