import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Onboarding from './onboarding'
export const dynamic = 'force-dynamic'

export default async function RegisterPage() {
  const session = await getServerSession(authOptions)

  return (
    <>
      <Onboarding session={session} />
    </>
  )
}
