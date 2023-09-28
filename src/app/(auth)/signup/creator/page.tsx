import Link from 'next/link'
import { ptMono } from '@/app/fonts'
import Image from 'next/image'
import { Sen } from 'next/font/google'
import logo from 'public/assets/register/LogoSVG.svg'
import registerBg from 'public/assets/register/login-creator.jpg'
import { RegisterForm } from './registerFormReactHookForm'
import Header from '@/components/home/mainComponentes/header'

const sen = Sen({ weight: '700', subsets: ['latin'] })
export default function RegisterPage() {
  return (
    <>
      <Image
        priority
        className='absolute -z-50 h-full w-full object-cover object-center '
        src={registerBg}
        alt='background'
        fill
      />

      <Header frome={'signup'} />

      <section className='relative z-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-30'>
        <div className='flex w-[500px] flex-col items-center justify-center  pt-28 lg:pt-0 px-10 text-center text-white '>
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
    </>
  )
}
