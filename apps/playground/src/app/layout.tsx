import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MaxDraft Playground',
  description: 'Local testing environment for the MaxDraft editor',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-zinc-100 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
