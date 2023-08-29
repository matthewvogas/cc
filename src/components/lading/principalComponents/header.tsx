import Image from 'next/image'
import logo from 'public/assets/register/codecoco.svg'
import arrow from 'public/assets/register/arrowButtonIcon.svg'
import { ptMono } from '@/app/fonts'
import Link from 'next/link'

export default function Header() {
  return (
    <>
      <div className='mb-10 lg:mb-20 flex justify-between py-5 px-5 bg-[#F9F8F5] lg:px-7 lg:py-3'>
        <div className='flex items-center gap-4'>
          <Image
            className='h-auto mr-4 w-[120px] lg:w-[150px] md:w-[140px]'
            src={logo}
            alt=''
          />
          <button className='flex items-center gap-2 text-base font-medium'>
            For Agencies
          </button>
          <button className='flex items-center gap-2 text-base font-medium'>
            For Creators
          </button>
        </div>

        <div className='hidden gap-7 rounded-full px-7 py-3 text-sm lg:flex'>
          <button className='flex items-center gap-2 text-base font-medium'>
            Features
          </button>
          <button className='flex items-center gap-2 text-base font-medium'>
            Resources
          </button>

          <Link
            href={'/signup'}
            className='flex px-5 py-3 rounded-full items-center gap-2 font-normal text-base bg-[#FACEBC] text-black hover:text-black'>
            <span className='hidden lg:inline'>Login 🥥</span>
          </Link>
          <Link
            href={'/signup'}
            className='flex px-5 py-3 rounded-full items-center gap-2 font-normal text-base bg-[#D3F0E2] text-black opacity-80 hover:text-black'>
            <span className='hidden lg:inline'>Get Started 🥥</span>
            <span className='text-lg text-black lg:hidden'>🥥 +</span>
          </Link>
        </div>
      </div>
    </>
  )
}
