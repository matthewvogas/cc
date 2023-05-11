'use client'
import Link from 'next/link'
import Image from 'next/image'
import { PT_Mono } from 'next/font/google'
import logo from 'public/assets/register/codecoco.png'
import { CurrentPageProvider } from './activeLinkSidebar'

const ptMono = PT_Mono({
  weight: '400',
  subsets: ['latin'],
})

const link = [
  {
    href: '/dashboard',
    text: 'Dashboard',
  },
  {
    href: '/clients',
    text: 'Clients',
  },
  {
    href: '/creators',
    text: 'Creators',
  },
]

const links = link.map((link, index) => (
  <li key={index}>
    <CurrentPageProvider href={`${link.href}`}>
      <Link
        href={link.href}
        className='flex  items-center rounded-full p-2 text-gray-900 hover:bg-rose-100 '>
        <span className={`ml-3 flex-1 whitespace-nowrap`}>{link.text}</span>
      </Link>
    </CurrentPageProvider>
  </li>
))

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
            {links}

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
