import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { authOptions } from './api/auth/[...nextauth]/route'
import { User } from './user'
import { LoginButton, LogoutButton } from './auth'
import { RegisterFlow } from './register/registerFlow'

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <main className='flex min-h-screen flex-col  p-24'>
      <LoginButton />
      <LogoutButton />
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client Call</h2>
      <User />
      <RegisterFlow />
    </main>
  )
}
