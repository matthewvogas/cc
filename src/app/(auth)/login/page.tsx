'use client'

import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import registerBg from 'public/assets/register/login.jpg'
import logo from 'public/assets/register/LogoSVG.svg'
import { Sen } from 'next/font/google'
import Link from 'next/link'
import { Tab } from '@headlessui/react'
import { Login } from './login'
import LoginCreator from './loginCreator'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function LoginPage() {
  return (
    <section className='bg-black bg-opacity-40 relative flex-col flex h-screen w-screen items-center justify-center'>
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
          <p className='mb-5 text-lg text-white'>be a better influence</p>
        </div>

        <div className='w-full max-w-md px-2 sm:px-0'>
          <Login />
        </div>
      </div>
    </section>
  )
}
