'use client'

import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import registerBg from 'public/assets/register/login.jpg'
import logo from 'public/assets/register/LogoSVG.svg'
import { Sen } from 'next/font/google'
import Link from 'next/link'
import { Tab } from '@headlessui/react'
import { LoginAgency } from './loginAgency'
import LoginCreator from './loginCreator'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function LoginPage() {
  return (
    <section className='relative flex-col flex h-screen w-screen items-center justify-center'>
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
          <Tab.Group>
            <Tab.List className='flex space-x-1 rounded-xl bg-red-900/20 p-1'>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-red-700',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-red-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow'
                      : 'text-red-100 hover:bg-white/[0.12] hover:text-white',
                  )
                }>
                Agency
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-red-700',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-red-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow'
                      : 'text-red-100 hover:bg-white/[0.12] hover:text-white',
                  )
                }>
                Creator
              </Tab>
            </Tab.List>
            <Tab.Panels className='py-16'>
              <Tab.Panel>
                <LoginAgency />
              </Tab.Panel>
              <Tab.Panel>
                <LoginCreator />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </section>
  )
}
