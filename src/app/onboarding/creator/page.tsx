import { getServerSession } from 'next-auth'
import Onboarding from './onboarding'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import db from '@/lib/db'

export default async function page() {
  const session = await getServerSession(authOptions)

  const access = await db.accessCampaign.findMany({
    where: {
      email: String(session!.user.email),
    },
  })

  return <Onboarding />
}
