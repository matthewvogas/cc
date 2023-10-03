import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import logo from 'public/assets/register/codecoco.png'
import { Navigation } from './activeNavigation'
import { SingOutButton, SingInButton } from '../auth/AuthButtons'

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
  {
    href: '/dashboard/creators',
    name: 'Creators',
  },
  {
    href: '/privacy',
    name: 'Privacy Policy',
  },
  {
    href: '/dashboard/invitations',
    name: 'Invitations',
  },
]

export default function Sidebar() {
  return (
    <aside className='sticky inset-0 z-[51] h-screen w-64' aria-label='Sidebar'>
      <div className='flex h-screen w-64 flex-col overflow-y-auto bg-sidebarBackground px-6 py-4  '>
        <div>
          <Image
            priority
            className={`pl-4 mb-6`}
            width={150}
            src={logo}
            alt='background'
          />
          <nav
            className={`flex flex-col gap-3 font-medium ${ptMono.className}`}>
            <Navigation navLinks={links} />
          </nav>
        </div>

        <div className='divider'></div>

        <div className=' flex w-full justify-center  items-center gap-4 p-2'>
          <SingInButton />
          <SingOutButton />
        </div>
      </div>
    </aside>
  )
}
