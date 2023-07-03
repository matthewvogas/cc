import Image from 'next/image'
import logo from 'public/assets/register/codecoco.svg'
import arrow from 'public/assets/register/arrowButtonIcon.svg'
import { ptMono } from '@/app/fonts'
import Link from 'next/link'

export default function Header() {
  return (
    <>
      <div className='mb-20 flex justify-between bg-white px-7 py-5'>
        <div className='flex items-center'>
          <Image className='h-auto w-[150px]' src={logo} alt='' />
        </div>
        <div className='flex gap-7 rounded-full bg-headerMenu px-7 py-3 text-sm'>
          {/* <button className='flex items-center gap-2'>Contact</button> */}
          {/* <button className='flex items-center gap-2'>How it Works</button> */}
          {/* <button className='flex items-center gap-2'>About</button> */}
          <Link href={'/login'} className='flex items-center gap-2'>
            Login
          </Link>
          {/* <Link href={'/terms'} className='flex items-center gap-2'>Terms and Conditions</Link> */}
        </div>
        <div
          className={`rounded-full bg-greenCTA px-7 py-3 ${ptMono.className} text-base`}>
          <Link href={'/signup'} className='flex items-center gap-2'>
            Get Started 🥥
          </Link>
        </div>
      </div>
    </>
  )
}
