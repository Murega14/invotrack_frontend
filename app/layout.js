// app/layout.js
import './globals.css'
import { Dancing_Script } from 'next/font/google';

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-dancing-script',
});

export const metadata = {
  title: 'Invotrack',
  description: 'Make your transactions easier',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dancingScript.variable}>
      <body>{children}</body>
    </html>
  )
}