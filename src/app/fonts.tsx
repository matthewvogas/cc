import { Inter, Roboto_Mono, PT_Mono, Lato } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
})

export const ptMono = PT_Mono({
  weight: '400',
  subsets: ['latin'],
})

export const lato = Lato({
  weight: '400',
  subsets: ['latin'],
  style: 'italic',
})
