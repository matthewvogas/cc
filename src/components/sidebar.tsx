import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import logo from 'public/assets/register/codecoco.png'
import { Navigation } from './navigation'

// Fonts

// Arrays
const links = [
  {
    href: '/',
    name: 'Dashboard',
  },
  {
    href: '/clients',
    name: 'Clients',
  },
  {
    href: '/creators',
    name: 'Creators',
  },
  {
    href: '/campaigns',
    name: 'Campaigns',
  },
]

// Show Arrays

export default function Sidebar() {
  return (
    <aside
      className='fixed h-screen w-72 -translate-x-full transition-transform sm:translate-x-0 '
      aria-label='Sidebar'>
      <div className='h-full overflow-y-auto border-r-2 bg-sidebarBackground px-3 py-4 '>
        <Image
          priority
          className={`pl-4`}
          width={150}
          src={logo}
          alt='background'
        />
        <nav className={`space-y-2 font-medium ${ptMono.className}`}>
          <Navigation navLinks={links} />
        </nav>
      </div>
    </aside>
  )
}
