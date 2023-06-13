'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
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
        className={`rounded-full border border-gray-400 px-8 py-2 ${ptMono.className}`}
        onClick={() => signOut()}>
        log out
      </button>
    )
  }
  return <></>
}
