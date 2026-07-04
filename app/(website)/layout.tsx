import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LEAD Hydraulic Press Machinery | Industrial Press Manufacturer',
  description: 'LEAD manufactures high-quality hydraulic presses including H-frame, four-column, and door embossing machines. 25T to 4500T capacity. OEM/ODM available. ISO 9001 certified.',
  keywords: 'hydraulic press, hydraulic press machine, four column hydraulic press, H frame hydraulic press, door embossing machine, metal forming press, stamping press, hydraulic press manufacturer',
  openGraph: {
    title: 'LEAD Hydraulic Press Machinery',
    description: 'Premium hydraulic press manufacturer from China. 25T - 4500T capacity.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
