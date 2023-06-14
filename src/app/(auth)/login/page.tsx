import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import registerBg from 'public/assets/register/login.jpg'
import logo from 'public/assets/register/LogoSVG.svg'
import { Sen } from 'next/font/google'
import Link from 'next/link'
import { LoginForm } from './loginForm'

const sen = Sen({ weight: '700', subsets: ['latin'] })
export default function LoginPage() {
  return (
    <section className='relative flex h-screen w-screen items-center justify-center'>
      <Image
        priority
        className='absolute -z-20 h-full w-full object-cover object-center '
        src={registerBg}
        alt='background'
        fill
      />

      <div className='flex w-[550px] flex-col items-center justify-center gap-4  p-10 text-center text-white '>
        <div className={`flex flex-col gap-4 ${ptMono.className}`}>
          <Image priority className=' h-auto w-[400px]' src={logo} alt='' />
          <p className='mb-12 text-lg text-white'>be a better influence</p>
        </div>
        <LoginForm />

        <div className='my-7 h-px w-full rounded-r-full bg-white opacity-50'></div>

        <div className='flex w-full justify-between px-4'>
          <Link href='/register' className='text-lg '>
            create a new account
          </Link>
          <Link href='/register' className='text-lg'>
            reset your password
          </Link>
        </div>
      </div>
    </section>
  )
}
