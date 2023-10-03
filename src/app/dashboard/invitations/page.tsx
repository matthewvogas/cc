import { getPendingInvitationsbyUserId } from '@/services/InviteServices'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import PortfolioTabs from './dashboardInvitations'
import { getServerSession } from 'next-auth'

export default async function Invites() {
  const session = await getServerSession(authOptions)
  const invites = await getPendingInvitationsbyUserId(session!.user!.id)

  return (
    <div>
      <PortfolioTabs invites={invites} session={session} />
    </div>
  )
}
