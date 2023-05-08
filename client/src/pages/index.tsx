import Image from 'next/image'
import { Inter } from 'next/font/google'
import RegisterFlow from '@/components/registerFlow'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return <main className={`${inter.className}`}>
    <RegisterFlow/>
  </main>
}
