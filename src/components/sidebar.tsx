'use client'
import Link from 'next/link'
import Image from 'next/image'
import { PT_Mono } from 'next/font/google'
import logo from 'public/assets/register/codecoco.png'
import { CurrentPageProvider } from './activeLink'

const ptMono = PT_Mono({
  weight: '400',
  subsets: ['latin'],
})

export default function Sidebar() {
  return (
    <section>
      <aside
        className='fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0 '
        aria-label='Sidebar'>
        <div className='h-full overflow-y-auto border-r-2 bg-sidebarBackground px-3 py-4 '>
          <Image
            priority
            className={`pl-4`}
            width={150}
            src={logo}
            alt='background'
          />
          <ul className={`space-y-2 font-medium ${ptMono.className}`}>
            <li>
              <CurrentPageProvider href='/dashboard'>
                <Link
                  href='/dashboard'
                  className='flex items-center rounded-full p-2 text-gray-900 hover:bg-rose-100 dark:hover:bg-gray-700'>
                  <span className={`ml-3 flex-1 whitespace-nowrap`}>
                    Dashboard
                  </span>
                </Link>
              </CurrentPageProvider>
            </li>
            <li>
              <CurrentPageProvider href='/clients'>
                <Link
                  href='/clients'
                  className='flex items-center rounded-full p-2 text-gray-900 hover:bg-rose-100 dark:hover:bg-gray-700'>
                  <span className={`ml-3 flex-1 whitespace-nowrap`}>
                    Clients
                  </span>
                </Link>
              </CurrentPageProvider>
            </li>
            <li>
              <CurrentPageProvider href='/campaigns'>
                <Link
                  href='/campaigns'
                  className='flex items-center rounded-full p-2 text-gray-900 hover:bg-rose-100 dark:hover:bg-gray-700'>
                  <span className={`ml-3 flex-1 whitespace-nowrap`}>
                    Campaigns
                  </span>
                </Link>
              </CurrentPageProvider>
            </li>
            <li>
              <CurrentPageProvider href='/creators'>
                <Link
                  href='/creators'
                  className='flex items-center rounded-full p-2 text-gray-900 hover:bg-rose-100 dark:hover:bg-gray-700'>
                  <span className={`ml-3 flex-1 whitespace-nowrap`}>
                    Creators
                  </span>
                </Link>
              </CurrentPageProvider>
            </li>
            {/* Report link - Cooming soon */}
            <li>
              <a
                href='#'
                className='flex items-center rounded-full p-2 text-gray-900 hover:bg-rose-50 dark:hover:bg-gray-700'>
                <span className={`ml-3 flex-1 whitespace-nowrap`}>Reports</span>
                <span className='ml-3 inline-flex items-center justify-center rounded-full bg-rose-100 px-2 text-sm font-medium text-gray-800  dark:text-gray-300'>
                  Cooming soon
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <div className='p-4 sm:ml-64'></div>
    </section>
  )
}
