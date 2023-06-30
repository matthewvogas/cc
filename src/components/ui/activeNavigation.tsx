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
            className={`ml-3 flex flex-1 items-center  whitespace-nowrap rounded-full border-2 p-2 pl-6 text-gray-900 hover:bg-rose-100 ${
              isActive ? 'border-rose-100' : 'border-transparent'
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
