'use client'
import type { FC, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

type CurrentPageProviderProps = {
  href: string
  children: ReactNode
}

export const CurrentPageProvider: FC<CurrentPageProviderProps> = ({
  href,
  children,
}) => {
  const pathname = usePathname()
  const active = href === '/' ? pathname === href : pathname.startsWith(href)
  const decoration = 'rounded-full hover:bg-rose-100 border-rose-100 border-2 '
  return <div className={`${active && decoration}`}> {children} </div>
}
