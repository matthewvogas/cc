import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/lib/providers'
import Sidebar from '@/components/sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html data-theme='cupcake' className='bg-white' lang='en'>
      <Providers>
        <body className={`${inter.className}`}>
          <main className='flex flex-row'>{children}</main>
        </body>
      </Providers>
    </html>
  )
}
