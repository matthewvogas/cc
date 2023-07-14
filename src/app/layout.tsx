import './globals.css'
import { inter } from '@/app/fonts'

export const metadata = {
  title: 'Codecoco',
  description: 'Codecoco Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className='bg-white' lang='en'>
      <body className={`${inter.className}`}>{children}</body>
    </html>
  )
}
