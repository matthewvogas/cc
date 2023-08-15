import Link from 'next/link'
import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import { Sen } from 'next/font/google'
import { RegisterForm } from './registerFormReactHookForm'
import logo from 'public/assets/register/LogoSVG.svg'
import registerBg from 'public/assets/register/login.jpg'

const sen = Sen({ weight: '700', subsets: ['latin'] })
export default function RegisterPage() {
  return (
    <section className='relative flex h-screen w-screen items-center justify-center'>
      <Image
        priority
        className='absolute -z-20 h-full w-full object-cover object-center '
        src={registerBg}
        alt='background'
        fill
      />

      <div className='flex w-[500px] flex-col items-center justify-center gap-4  px-10 text-center text-white '>
        <div className={`flex flex-col gap-4 ${ptMono.className}`}>
          <Image priority className=' h-auto w-[400px]' src={logo} alt='' />
          <p className='mb-12 text-lg text-white'>create your account</p>
        </div>
        <RegisterForm />

        <div className='my-7 h-px w-full rounded-r-full bg-white opacity-50'></div>

        <p>
          already have an account?{' '}
          <Link href='/login' className='text-primary'>
            log in
          </Link>
        </p>
      </div>
    </section>
  )
}
