import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import '../globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'LEAD Hydraulic Press Machinery | Industrial Press Manufacturer',
    template: '%s | LEAD Hydraulic Press Machinery',
  },
  description:
    'Shandong LEAD Industrial Equipment Technology Co., Ltd. manufactures H-frame, four-column, single column (C-frame) and door embossing hydraulic presses from 5T to 4500T. ISO 9001 certified, serving 50+ countries. OEM/ODM available.',
  keywords: [
    'hydraulic press',
    'hydraulic press machine',
    'four column hydraulic press',
    'H frame hydraulic press',
    'single column hydraulic press',
    'C-frame press',
    'door embossing machine',
    'metal forming press',
    'stamping press',
    'deep drawing press',
    'hydraulic press manufacturer',
    'LEAD hydraulic press',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'LEAD Hydraulic Press Machinery',
    title: 'LEAD Hydraulic Press Machinery | Industrial Press Manufacturer',
    description: 'Premium hydraulic press manufacturer from China. 5T - 4500T capacity. ISO 9001 certified, serving 50+ countries.',
    images: [
      {
        url: '/images/hero-bg.webp',
        width: 1774,
        height: 675,
        alt: 'LEAD hydraulic presses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LEAD Hydraulic Press Machinery',
    description: 'Premium hydraulic press manufacturer from China. 5T - 4500T capacity.',
    images: ['/images/hero-bg.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
