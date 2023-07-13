import Image from 'next/image'
import logo from 'public/assets/register/codecoco.svg'
import arrow from 'public/assets/register/arrowButtonIcon.svg'
import { ptMono } from '@/app/fonts'
import Link from 'next/link'

export default function Header() {
  return (
    <>
      <div className='mb-10 lg:mb-20 flex justify-between py-5 px-5 bg-white lg:px-7 lg:py-5'>
        <div className='flex items-center'>
          <Image
            className='h-auto w-[120px] lg:w-[150px] md:w-[140px]'
            src={logo}
            alt=''
          />
        </div>

        <div className='hidden gap-7 rounded-full bg-headerMenu px-7 py-3 text-sm lg:flex'>
          {/* <button className='flex items-center gap-2'>Contact</button> */}
          {/* <button className='flex items-center gap-2'>How it Works</button> */}
          {/* <button className='flex items-center gap-2'>About</button> */}
          <Link href={'/login'} className='flex items-center gap-2 '>
            Login
          </Link>
          {/* <Link href={'/terms'} className='flex items-center gap-2'>Terms and Conditions</Link> */}
        </div>
        <div
          className={`rounded-full bg-greenCTA px-4 py-1 lg:px-7 lg:py-3 ${ptMono.className} text-base`}>
          <Link
            href={'/signup'}
            className='flex items-center gap-2 text-white hover:text-green-800'>
            <span className='hidden lg:inline'>Get Started 🥥</span>
            <span className='text-lg text-black lg:hidden'>🥥 +</span>
          </Link>
        </div>
      </div>
    </>
  )
}
