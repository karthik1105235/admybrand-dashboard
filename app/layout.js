
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ADmyBRAND Analytics - AI-Powered Dashboard',
  description: 'Professional analytics dashboard with real-time insights, performance metrics, and dynamic data visualization for digital marketing agencies',
  keywords: 'analytics, dashboard, marketing, performance, metrics, data visualization',
  authors: [{ name: 'ADmyBRAND Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#111827',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
