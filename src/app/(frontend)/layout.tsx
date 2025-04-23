import './styles.css'
import { ReactNode } from 'react'
import ClientProviders from '@/components/ClientProviders'

export const metadata = {
  title: 'LectureSync AI',
  description: 'The future of taking notes',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
