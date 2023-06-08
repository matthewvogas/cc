import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import logo from 'public/assets/register/codecoco.png'
import { Navigation } from './activeNavigation'

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
    href: '/campaigns',
    name: 'Campaigns',
  },
  {
    href: '/creators',
    name: 'Creators',
  },
]

// Show Arrays

export default function Sidebar() {
  return (
    <aside className='sticky inset-0 z-[51] h-screen w-72' aria-label='Sidebar'>
      <div className='h-screen w-72 overflow-y-auto border-r-2 bg-sidebarBackground px-3 py-4 '>
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
