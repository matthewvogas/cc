import Image from 'next/image'
import { ptMono } from '@/app/fonts'
import logo from 'public/assets/register/codecoco.png'
import { Navigation } from '@/components/menus/activeNavigation'
import { SingOutButton, SingInButton } from '@/components/auth/AuthButtons'
import img from '/public/assets/creatorRegister/exampleImage.jpg'

// Fonts

// Arrays
const links = [
  {
    href: '/dashboard',
    name: 'dashboard',
  },
  {
    href: '/dashboard/campaigns',
    name: 'campaigns',
  },
  {
    href: '/dashboard/agencies',
    name: 'agencies',
  },
  {
    href: '/dashboard/invitations',
    name: 'invitations',
  },
  {
    href: '/dashboard/portfolio',
    name: 'portfolio',
  },
  {
    href: '/dashboard/settings',
    name: 'your account',
  },
  {
    href: '/privacy',
    name: 'policies',
  },
  {
    href: '/dashboard/socialData',
    name: 'my social data',
  },
]

// Show Arrays

export default function SidebarCreators() {
  return (
    <aside className='sticky inset-0 z-[51] h-screen w-64' aria-label='Sidebar'>
      <div className='flex h-screen w-64 flex-col overflow-y-auto bg-sidebarBackground px-6 py-4  '>
        <div>
          <div className='italic font-light text-center text-gray-400'>
            <Image
              priority
              className={`pl-4 ml-5 -mb-4`}
              width={150}
              src={logo}
              alt='background'
            />
            <span className=''>for creators</span>
          </div>
          <div className='flex ml-8 mt-10 mb-10 justify-center mask mask-circle mr-8 h-50 w-50'>
            <Image
              priority
              className={``}
              width={300}
              height={300}
              src={img}
              alt='background'
            />
          </div>

          <div className='divider'></div>
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
