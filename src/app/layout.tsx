import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'D2D - Decentralized Deployment Platform',
  description: 'Deploy Solana programs to mainnet for just $5. Launching November 2, 2025.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-transparent" suppressHydrationWarning>
      <body className="min-h-screen text-foreground font-mono transition-colors duration-300 bg-transparent" suppressHydrationWarning>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}

