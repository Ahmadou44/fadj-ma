import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Fadj Ma - Marketplace Pharmacies',
  description: 'Trouvez vos médicaments et services de santé en ligne',
}

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
