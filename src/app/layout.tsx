import { ClientProviders } from '@/providers/client-providers'
import '@/styles/main.css'
import localFont from 'next/font/local'
import { ReactNode } from 'react'

const basierCircle = localFont({
  src: [
    {
      path: '../../public/fonts/BasierCircle-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/BasierCircle-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../public/fonts/BasierCircle-SemiBold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../../public/fonts/BasierCircle-Bold.woff2',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-basier-circle'
})

export const metadata = {
  title: 'Apideck - Ecosystem Starter Kit',
  description: 'A starter kit demonstrating how to integrate Apideck Ecosystem using embed and API approaches',
  icons: {
    icon: '/img/logo.png'
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={basierCircle.variable}>
      <body className="min-h-screen h-full font-sans">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
