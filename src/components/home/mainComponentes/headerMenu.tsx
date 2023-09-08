'use client'
import React, { useEffect, useRef, useState } from 'react'
import logo from 'public/assets/register/codecoco.svg'
import Image from 'next/image'
import Link from 'next/link'

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const menuRef = useRef<HTMLDivElement>(null)

  const closeMenu = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    if (isMenuOpen) {
      window.addEventListener('click', closeMenu)
    } else {
      window.removeEventListener('click', closeMenu)
    }
    return () => {
      window.removeEventListener('click', closeMenu)
    }
  }, [isMenuOpen])

  return (
    <div className='relative'>
      <button
        onClick={toggleMenu}
        className='font-medium flex items-center gap-3 text-base'>
        Menu <span className='text-4xl'>🥥</span>
      </button>
      {isMenuOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-80 z-50'>
          <div className='absolute right-0 top-0 h-full w-[80%] bg-[#F9F8F5] pl-8 pt-8'>
            <button
              className='absolute top-0 right-3 p-2 font-medium flex items-center gap-3 text-base'
              onClick={toggleMenu}>
              Close <span className='text-4xl'>🥥</span>
            </button>
            <div className='pt-12'>
              <Image className=' h-auto mb-8 w-[120px]' src={logo} alt='' />

              <div className='flex gap-2'>
                <Link
                  href={'/signup'}
                  className='px-5 py-3 rounded-full items-center gap-2 font-normal text-sm bg-[#D3F0E2] text-black opacity-80'>
                  <span className=''>Get Started 🥥</span>
                </Link>
                <Link
                  href={'/login'}
                  className='px-5 py-3 rounded-full items-center gap-2 font-normal text-sm bg-[#FACEBC] text-black'>
                  <span className=''>Login 🥥</span>
                </Link>
              </div>

              <div className='divider -ml-8'></div>

              <div className='flex flex-col gap-20'>
                <div className='flex flex-col gap-5'>
                  <Link
                    href={'/signup'}
                    className='items-center gap-2 text-base  text-black font-medium'>
                    <span className=''>For agencies</span>
                  </Link>
                  <Link
                    href={'/signup'}
                    className='items-center gap-2 text-base  text-black font-medium'>
                    <span className=''>For creators</span>
                  </Link>
                  <Link
                    href={'/signup'}
                    className='items-center gap-2 text-base  text-black font-medium'>
                    <span className=''>For agencies</span>
                  </Link>
                  <Link
                    href={'/signup'}
                    className='items-center gap-2 text-base  text-black font-medium'>
                    <span className=''>Features</span>
                  </Link>
                </div>
                <div className='flex flex-col items-start justify-start gap-3'>
                  <h5 className='mb-1 text-base font-medium ]'>Legal</h5>
                  <Link className='text-sm font-normal ]' href={'./terms'}>
                    Terms of service
                  </Link>
                  <Link className='text-sm font-normal ]' href={'./privacy'}>
                    Privacy policy
                  </Link>
                  <button className='text-sm font-normal '>Security</button>
                  <button className='text-sm font-normal '>
                    Talk to sales
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MobileMenu
