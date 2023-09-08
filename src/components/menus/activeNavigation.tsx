'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

type navLink = {
  href: string
  name: string
}

export function Navigation({ navLinks }: { navLinks: navLink[] }) {
  const pathname = usePathname()

  return (
    <>
      {navLinks.map(link => {
        const isActive =
          link.href === '/dashboard'
            ? pathname === link.href
            : pathname.startsWith(link.href)

        return (
          <Link
            className={`ml-3 flex flex-1 items-center  whitespace-nowrap rounded-full border p-3 pl-8 text-gray-900 hover:bg-beigeSelected hover:bg-opacity-80 ${
              isActive ? 'border-[#FACEBC]' : 'border-transparent'
            }`}
            href={link.href}
            key={link.name}>
            {link.name}
          </Link>
        )
      })}
    </>
  )
}
