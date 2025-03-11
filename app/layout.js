// app/layout.js
import './globals.css'

export const metadata = {
  title: 'Invotrack',
  description: 'Make your transactions easier',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}