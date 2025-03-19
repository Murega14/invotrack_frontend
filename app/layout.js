// app/layout.js
import './globals.css'
import { Inter } from 'next/font/google'

export const metadata = {
  title: 'Invotrack',
  description: 'Make your transactions easier',
}
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
 

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}