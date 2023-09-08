'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { ptMono } from '@/app/fonts'

export function SingInButton() {
  const { data: session, status } = useSession()

  // console.log(session, status)

  if (status === 'loading') {
    return <>...</>
  }
  if (status === 'authenticated') {
    // console.log(session, status)
    return <></>
  }
  return <button onClick={() => signIn()}>Sign In</button>
}

export function SingOutButton() {
  const { data: session, status } = useSession()
  if (status === 'authenticated') {
    return (
      <button
        className={`rounded-full border w-full border-gray-300 px-8 py-2 hover:bg-[#bdbdbd] hover:bg-opacity-10 ${ptMono.className}`}
        onClick={() => signOut()}>
        log out
      </button>
    )
  }
  return <></>
}
