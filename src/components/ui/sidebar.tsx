import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import logo from 'public/assets/register/codecoco.png'
import { Navigation } from './activeNavigation'
import { SingOutButton, SingInButton } from '../auth/AuthButtons'

// Fonts

// Arrays
const links = [
  {
    href: '/dashboard',
    name: 'Dashboard',
  },
  {
    href: '/dashboard/clients',
    name: 'Clients',
  },
  {
    href: '/dashboard/campaigns',
    name: 'Campaigns',
  },
  // {
  //   href: '/dashboard/creators',
  //   name: 'Creators',
  // },
]

// Show Arrays

export default function Sidebar() {
  return (
    <aside className='sticky inset-0 z-[51] h-screen w-64' aria-label='Sidebar'>
      <div className='flex h-screen w-64 flex-col overflow-y-auto bg-sidebarBackground px-3 py-4  '>
        <div>
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

        <div className='divider'></div>

        <div className=' flex w-full items-center gap-4 p-2'>
          <SingInButton />
          <SingOutButton />
        </div>
      </div>
    </aside>
  )
}
