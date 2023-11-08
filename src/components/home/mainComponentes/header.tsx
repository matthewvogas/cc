'use client'
import logo from 'public/assets/register/codecoco.svg'
import MobileMenu from './headerMenu'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  frome: string
}

export default function Header({ frome }: Props) {
  return (
    <>
      <div
        className={`relative z-10 ${
          frome == 'signup'
            ? ' text-white -mb-[96px]'
            : 'shadow-md mb-10 lg:mb-20'
        }   flex justify-between py-5 px-5 ${
          frome == 'signup' ? 'bg-transparent' : 'bg-[#F9F8F5]'
        }  lg:px-7 lg:py-3`}>
        <div className='flex items-center gap-4'>
          

          <Image
            className='hidden lg:block h-auto mr-4 w-[120px] lg:w-[150px] md:w-[140px]'
            src={logo}
            alt=''
          />
          <div className='gap-7 hidden lg:flex'>
            <Link
              className='flex items-center gap-2 text-base font-medium'
              href={'/'}>
              For Agencies
            </Link>
            <Link
              className='flex items-center gap-2 text-base font-medium'
              href={'/creator'}>
              For Creators
            </Link>
          </div>
        </div>

        <div className='hidden gap-7 rounded-full px-7 py-3 text-sm lg:flex'>
          <button className='flex items-center gap-2 text-base font-medium'>
            Features
          </button>
          <button className='flex items-center gap-2 text-base font-medium'>
            Resources
          </button>

          <Link
            href={'/login'}
            className={`${
              frome === 'signup'
                ? 'bg-[#D3F0E24D] flex px-5 py-3 rounded-full items-center gap-2 font-normal text-base lg:text-white text-black'
                : 'flex px-5 py-3 rounded-full items-center gap-2 font-normal text-base bg-[#D3F0E2] text-black opacity-80'
            }`}>
            <span className='hidden lg:inline'>Login 🥥</span>
          </Link>
          
          {frome == 'landing' && (
            <Link
              href={'/signup/agency'}
              className='flex px-5 py-3 rounded-full items-center gap-2 font-normal text-base  bg-[#D3F0E2] opacity-80'>
              <span className=''>Get Started 🥥</span>
            </Link>
          )}
          
          {frome == 'landingCreator' && (
            <Link
              href={'/signup/creator'}
              className='flex px-5 py-3 rounded-full items-center gap-2 font-normal text-base  bg-[#D3F0E2] opacity-80'>
              <span className=''>Get Started 🥥</span>
            </Link>
          )}
        </div>

        <div className='z-10 flex lg:hidden'>
          <MobileMenu />
        </div>
      </div>
    </>
  )
}
