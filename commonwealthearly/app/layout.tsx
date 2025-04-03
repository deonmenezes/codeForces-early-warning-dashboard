import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Early Warning System',
  description: 'Commonwealth Early Warning System Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
