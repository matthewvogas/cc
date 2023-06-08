'use client'

import { useSession } from 'next-auth/react'

export default function AuthCheck() {
  const { data: session, status } = useSession()

  if (session) {
    return <p>XD</p>
  }

  return <div>No hay session</div>
}
