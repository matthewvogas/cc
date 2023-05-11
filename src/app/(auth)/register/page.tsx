import Image from 'next/image'
import registerBg from 'public/assets/register/register-bg.jpg'
import { Sen } from 'next/font/google'
import Link from 'next/link'
import { RegisterForm } from './registerForm'

const sen = Sen({ weight: '700', subsets: ['latin'] })
export default function RegisterPage() {
  return (
    <section className='relative flex h-screen items-center justify-center'>
      <Image
        priority
        className='absolute -z-20 h-full w-full object-cover object-center brightness-50'
        src={registerBg}
        alt='background'
        fill
      />

      <div className='flex w-[500px] flex-col items-center justify-center gap-4  p-10 text-center text-white '>
        <div className='flex flex-col gap-4'>
          <h1 className={` ${sen.className} text-7xl font-bold text-primary`}>
            codecoco
          </h1>
          <p className='text-lg text-white'>create your account</p>
        </div>
        <RegisterForm />

        <div className='divider' />

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
