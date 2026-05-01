import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Navbar from '@/components/layout/Navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Astha Jain — Web Developer & Designer',
  description:
    'Full Stack Developer based in Dubai. Building modern web applications with Next.js, React, and Node.js.',
  openGraph: {
    title: 'Astha Jain — Web Developer & Designer',
    description: 'Full Stack Developer based in Dubai.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Astha Jain — Web Developer & Designer',
    description: 'Full Stack Developer based in Dubai.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
