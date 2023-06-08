'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export function SingInButton() {
  const { data: session, status } = useSession()

  // console.log(session, status)

  if (status === 'loading') {
    return <>...</>
  }
  if (status === 'authenticated') {
    // console.log(session, status)
    return (
      <li>
        <Link href={`/dashboard`}>
          <Image
            className='rounded-full'
            src={session.user?.image ?? '/mememan.webp'}
            alt={session.user?.name ?? 'Your Name'}
            width={32}
            height={32}
          />
        </Link>
      </li>
    )
  }
  return (
    <li>
      <button onClick={() => signIn()}>Sign In</button>
    </li>
  )
}

export function SingOutButton() {
  const { data: session, status } = useSession()
  if (status === 'authenticated') {
    return (
      <li>
        <button onClick={() => signOut()}>Sign out</button>
      </li>
    )
  }
  return <></>
}
