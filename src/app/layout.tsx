import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export const metadata: Metadata = {
  title: 'D2D - Decentralized Deployment Platform',
  description: 'Deploy Solana programs to mainnet for just $5. Launching November 2, 2025.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://deployd2d.xyz',
    siteName: 'D2D - Decentralized Deployment',
    title: 'D2D - Decentralized Deployment Platform',
    description: 'Deploy Solana programs to mainnet for just $5/month. Fully automated deployment in ~15 seconds.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'D2D - Decentralized Deployment Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'D2D - Decentralized Deployment Platform',
    description: 'Deploy Solana programs to mainnet for just $5/month. Fully automated deployment in ~15 seconds.',
    creator: '@d2d_hq',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-transparent" suppressHydrationWarning>
      <body className="min-h-screen text-foreground font-mono transition-colors duration-300 bg-transparent" suppressHydrationWarning>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}

