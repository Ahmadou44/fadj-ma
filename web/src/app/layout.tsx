'use client'

import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-gray-50">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
