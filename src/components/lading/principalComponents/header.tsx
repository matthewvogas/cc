import Image from 'next/image'
import logo from 'public/assets/register/codecoco.svg'
import arrow from 'public/assets/register/arrowButtonIcon.svg'
import { ptMono } from '@/app/fonts'
import Link from 'next/link'
import MobileMenu from './headerMenu'

type Props = {
  frome: string
}

export default function Header({ frome }: Props) {
  return (
    <>
      <div className={`relative z-10 ${frome == 'signup' ? ' text-white -mb-[96px]' : 'shadow-md mb-10 lg:mb-20'}   flex justify-between py-5 px-5 ${frome == 'signup' ? 'bg-transparent' : 'bg-[#F9F8F5]'}  lg:px-7 lg:py-3`}>
        <div className='flex items-center gap-4'>
          {frome == 'signup' ? (
            null
          ) : (
            <Link
              href={'/signup'}
              className='flex lg:hidden px-5 py-3 rounded-full items-center gap-2 font-normal text-base opacity-80 '>
              <span className=''>Get Started 🥥</span>
            </Link>
          )}
          <Image
            className='hidden lg:block h-auto mr-4 w-[120px] lg:w-[150px] md:w-[140px]'
            src={logo}
            alt=''
          />
          <div className='gap-7 hidden lg:flex'>
            <button className='flex items-center gap-2 text-base font-medium'>
              For Agencies
            </button>
            <button className='flex items-center gap-2 text-base font-medium'>
              For Creators
            </button>
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
            className={`${frome === 'signup'
              ? 'bg-[#D3F0E24D] flex px-5 py-3 rounded-full items-center gap-2 font-normal text-base lg:text-white text-black'
              : 'flex px-5 py-3 rounded-full items-center gap-2 font-normal text-base bg-[#D3F0E2]  lg:text-white text-black opacity-80'
              }`
            }
          >
            <span className='hidden lg:inline'>Login 🥥</span>
          </Link>
          <Link
            href="/signup"
            className={`${frome === 'signup'
              ? 'hidden'
              : 'flex px-5 py-3 rounded-full items-center gap-2 font-normal text-base  bg-[#D3F0E2] opacity-80'
              }`
            }
          >
            <span className="hidden lg:inline">Get Started 🥥</span>
            {/* <span className='text-lg text-black lg:hidden'>🥥 +</span> */}
          </Link>

        </div>

        <div className='z-10 flex lg:hidden'>
          <MobileMenu />
        </div>
      </div>
    </>
  )
}
