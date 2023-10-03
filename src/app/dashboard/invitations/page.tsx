import { getPendingInvitationsbyUserId } from '@/services/InviteServices'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import PortfolioTabs from './dashboardInvitations'
import { getServerSession } from 'next-auth'
import { ConnectionService } from '@/services/ConnectionService'
import { SocialConnectionService } from '@/services/SocialConnectionService'
import { UserService } from '@/services/UsersService'

export default async function Invites() {
  const session = await getServerSession(authOptions)
  const invites = await getPendingInvitationsbyUserId(session!.user!.id)

  const connections = await ConnectionService.findManyByUserId(
    String(session?.user.id),
  )

  const InstagramConnection = await SocialConnectionService.findInstagramToken(
    String(session?.user.id),
  )

  // esto retorna el token null, verificar si es null entonces mostrar el boton, si esta el token entonces mostrar que ya esta conectado

  const agencies = await UserService.findManyAgencies()

  return (
    <div>
      <PortfolioTabs
        invites={invites}
        session={session}
        agenciesConnections={connections}
        agency={agencies}
      />
    </div>
  )
}
